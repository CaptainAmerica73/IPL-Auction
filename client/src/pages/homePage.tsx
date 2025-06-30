import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      navigate("/", { replace: true });
    }
  }, [location.state?.message, navigate]);

  return (
    <>
      <div className="min-h-[100vh] w-[100vw] flex flex-col">
        <div className="relative flex justify-center items-center bg-[url(/images/bg_stadium.jpg)] bg-cover bg-center h-[100vh] overflow-hidden">
          <div className="absolute inset-0 bg-[#19398aa2]"></div>
          <div
            className="home-bg-logo absolute top-0 left-0 h-full w-full "
            style={{ transform: `translateY(${scroll * -1.5}px)` }}
          ></div>
          <div
            className="home-bg-pattern absolute top-0 left-0 h-full w-full "
            style={{ transform: `translateY(${scroll * -0.5}px)` }}
          ></div>
          <div className="absolute bottom-1/28 text-white text-[clamp(1rem,2vw,2rem)] flex flex-col gap-2 justify-center items-center">
            <div>Scroll Down</div>
            <div className={scroll < 200 ? "animate-bounce" : "animate-none"}>
              &#x2B9F;
            </div>
          </div>
        </div>
        <div className="flex w-screen bg-[#19398a] text-white">
          <div className="grid min-[920px]:grid-cols-2 auto-rows-fr items-center p-[2rem] gap-[2rem] w-screen">
            <div className="flex flex-col min-[920px]:col-start-1 justify-center p-[1rem] text-pretty rounded-3xl bg-slate-500/20">
              <div className="text-[clamp(2rem,3vw,3rem)] pb-[1rem] text-center font-oswald font-bold">
                Why Join Us?
              </div>
              <ul className="font-poppins text-[clamp(0.9rem,1.3vw,1.3rem)]/[2.5rem]">
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Real-Time Bidding - Engage in live auctions with cricket
                    enthusiasts.
                  </p>
                </li>
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Build Your Dream Team - Buy & sell players strategically.
                  </p>
                </li>
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Secure & Transparent - Fair play, real-time updates, and
                    smooth transactions.
                  </p>
                </li>
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Player Stats & Insights - Analyze player performance before
                    placing your bid.
                  </p>
                </li>
              </ul>
            </div>
            <img src="/images/home1.png" alt="home1" />
            <img src="/images/home2.webp" alt="home2" />
            <div className="flex flex-col min-[920px]:col-start-2 row-start-2 h-max justify-center p-[1rem] text-pretty rounded-3xl bg-slate-500/20">
              <div className="text-[clamp(2rem,3vw,3rem)] pb-[1rem] text-center font-oswald font-bold">
                How It Works?
              </div>
              <ul className="font-poppins text-[clamp(0.9rem,1.3vw,1.3rem)]/[2.5rem]">
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Register & Login - Create your account and join the auction.
                  </p>
                </li>
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Start Bidding - Compete with others to secure top players.
                  </p>
                </li>
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Manage Your Squad - Keep track of your players and budget.
                  </p>
                </li>
                <li className="flex">
                  <p className="material-symbols-outlined align-middle !text-[2rem] mt-1 mr-3">
                    task_alt
                  </p>
                  <p className="">
                    Win & Dominate - Create the best team and challenge
                    competitors!
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
