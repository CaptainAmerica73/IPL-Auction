import random
import time
import requests
from bs4 import BeautifulSoup
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

driver_path = "./chromedriver.exe" 

BASE_URL = "https://www.iplt20.com/teams"

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36",
]

HEADERS = {
    "User-Agent": random.choice(USER_AGENTS)
}

def get_player_stats(link):
    service = Service(driver_path)
    driver = webdriver.Chrome(service=service)
    driver.get(link)
    try:
        stats_container = WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.TAG_NAME, "table"))
        )
    except:
        print("table not found")
        return {}

    stats_data = {"Batting & Fielding":[],"Bowling":[]}

    for i,stat in enumerate(stats_container):
        section_title = "Batting & Fielding" if i==0 else "Bowling"
        try:
            head = stat.find_element(By.TAG_NAME, "thead").find_element(By.TAG_NAME,"tr").find_elements(By.TAG_NAME,"th")
            body = stat.find_element(By.TAG_NAME, "tbody").find_elements(By.TAG_NAME,"tr")
            for j in body:
                items = j.find_elements(By.TAG_NAME,"td")
                stat_object={}
                for k in range(len(items)):
                    if items[k].text.strip() == "No stats":
                        break
                    stat_object[head[k].text.strip()]=items[k].text.strip()
                if stat_object:
                    stats_data[section_title].append(stat_object)
        except NoSuchElementException:
            print(f"{section_title} table does not have a thead/tbody")
            continue
    driver.quit()
    return stats_data



def get_team_links():
    url = BASE_URL
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code != 200:
        print("Failed to fetch team links")
        return []
    
    soup = BeautifulSoup(response.text, "html.parser")
    players = []
    for team in soup.find_all("li", class_=lambda c: c and c.startswith("TL")):
        a_tag = team.find("a")
        if a_tag and "href" in a_tag.attrs:
            # team_name = a_tag["data-team_name"]
            # team_url = BASE_URL + a_tag["href"] if not a_tag["href"].startswith("http") else a_tag["href"]
            # teams[team_name] = team_url
            players.extend(get_players_from_team(a_tag["data-team_name"],a_tag["href"]))

    return players

def get_players_from_team(team_name, team_url):
    response = requests.get(team_url, headers=HEADERS)
    if response.status_code != 200:
        print(f"Failed to fetch {team_name} players")
        return []

    soup = BeautifulSoup(response.text,"html.parser")
    players = soup.find_all("li", class_="dys-box-color")
    player_data = []
    for player in players:
        a_tag = player.find("a")
        name=a_tag["data-player_name"].strip()
        div_img_tag=a_tag.find("div",class_="ih-p-img")
        # img_tag=div_img_tag.find("img")
        if a_tag and "href" in a_tag.attrs:
            # img_url = img_tag["data-src"]
            # profile=a_tag["href"] if a_tag.has_attr("href") else ""
            # player_data.append({"name": name, "image": img_url,"profile":profile})
            player_data.append(get_player_profile(a_tag["href"]))
        else:
            player_data.append({"name":name,
                                "nationality":"",
                                "image":div_img_tag.find("img")["src"],
                                "specialization":div_img_tag.find("span").text.strip(),
                                "debut":"",
                                "DOB":"",
                                "stats":{"Batting & Fielding":[],"Bowling":[]}
                                })
        # player_data.append(get_player_profile(name.strip(),a_tag["href"] if a_tag.has_attr("href") else ""))
    
    return player_data

def get_player_profile(link): 
    response = requests.get(link, headers=HEADERS)
    if response.status_code != 200 or link == "":
        print("Failed to fetch player")
        return {}

    soup = BeautifulSoup(response.text, "html.parser")
    div_img = soup.find("div", class_="membr-details-img")
    if div_img:
        player_name=div_img.find("div")
        name_tag=player_name.find("h1")
        nation_tag=player_name.find("span")
        overview=soup.find("div",class_="player-overview-detail")
        grid=overview.find("div",class_="grid-container").find_all("div",class_="grid-items")
        stats_data=get_player_stats(link)
        player_data={"name":name_tag.text.strip(),
                    "nationality":nation_tag.text.strip(),
                    "image":div_img.find("img")["src"],
                    "specialization":grid[1].find("p").text.strip() if grid else "",
                    "debut":grid[0].find("p").text.strip() if grid else "",
                    "DOB":grid[2].find("p").text.strip() if grid[2].find("p").text.strip() != "N/A" else "" if grid else "",
                    "stats":stats_data
                    }
        return player_data
    else:
        print("Failed to fetch")

def main():
    # all_players = get_team_links()

    # for team, link in teams.items():
    #     print(f"Scraping {team} players...")
    #     all_players.extend(get_players_from_team(team, link))
    no=[2975,20603,20589,22082,1115,3869,1020,157,22077,22376,3760,5711,488,94,3763,958,10789,22007,86,22228]
    for i in no:
        player = get_player_profile(f"https://www.iplt20.com/teams/sunrisers-hyderabad/squad-details/{i}")
        with open("ipl_players.json", "a") as f:
            json.dump(player, f, indent=4)
            f.write(',')

        print(f"{player["name"]} data saved to ipl_players.json")

if __name__ == "__main__":
    main()

