import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [title, setTitle] = useState("");
  useEffect(() => {
    window.addEventListener("load", animateTitle);
    return () => window.removeEventListener("load", animateTitle);
  }, []);

  const animateTitle = () => {
    const titleName = "IPL AUCTION";
    for (let i = 0; i < titleName.length; i++) {
      setTimeout(() => {
        setTitle((item) => item.concat(titleName[i]));
      }, i * 100);
    }
  };

  return (
    <div className="w-[100vw] h-[4.5rem] bg-slate-900/40 fixed top-0 z-10 flex justify-around font-poppins text-[clamp(.8rem,1.6vw,1.8rem)] text-white">
      <div className="flex items-center">
        <img src="images/nav_logo.png" alt="IPL logo" className="h-[3rem]" />
      </div>
      <div
        className={`text-[2rem] h-full w-[12rem] flex items-center font-extrabold tracking-widest font-oswald`}
      >
        <p
          className={`leading-none ${
            title.length === 11 ? "" : "border-r-[.2rem]"
          }`}
        >
          {title}
        </p>
      </div>
      <div className="nav h-full flex items-center">
        <Link
          to="/"
          className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
        >
          Home
        </Link>
        <Link
          to="/teams"
          className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
        >
          Teams
        </Link>
        <Link
          to="/auctions"
          className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
        >
          Auctions
        </Link>
        <Link
          to="/about"
          className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
        >
          Contact Us
        </Link>
      </div>
      <div className="flex items-center self-center rounded-xl text-[clamp(0.8rem,1.5vw,1.6rem)] bg-cyan-600 cursor-pointer transition-all h-fit py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)] inset-shadow-gray-800 hover:inset-shadow-[2px_2px_20px_0]">
        Signup
      </div>
    </div>
  );
}
