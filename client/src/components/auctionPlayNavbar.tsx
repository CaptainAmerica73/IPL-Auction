import { Link } from "react-router-dom";

export default function AuctionPlayNavbar() {
  return (
    <div className="w-[100vw] h-[4.5rem] bg-slate-900/40 fixed top-0 z-10 flex justify-around font-poppins text-[clamp(.8rem,1.6vw,1.8rem)] text-white">
      <div className="nav h-full flex items-center">
        <Link
          to="/"
          className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
        >
          Bids
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
    </div>
  );
}
