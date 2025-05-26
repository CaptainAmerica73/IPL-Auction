import { readFileSync } from "fs";
import mongoose from "mongoose";
import { Player } from "./models/players.js";

const data = JSON.parse(readFileSync("../ipl_players.json", "utf-8"));

mongoose
  .connect(
    "mongodb+srv://vijayasankar:anandevs@cluster0.h00ab.mongodb.net/ipl-auction?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Connection Error"));

const update = async () => {
  data.forEach((player) => {
    const dob = new Date(Date.parse(player.dob) + 6.5 * 60 * 60 * 1000);
    const newPlayer = new Player({ ...player, dob: dob, squad: "" });
    newPlayer.save();
  });
};

update();
