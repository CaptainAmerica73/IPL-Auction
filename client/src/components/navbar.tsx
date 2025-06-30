import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DispatchType, RootState } from "../store/store";
import { axiosInstance } from "../services/axiosInstance";
import { AxiosError } from "axios";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const [title, setTitle] = useState("");
  const currentUser = useSelector((state: RootState) => state.auth.userName);
  const dispatch = useDispatch<DispatchType>();
  const navigate = useNavigate();
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

  const signup = async () => {
    navigate("/auth/signup");
  };

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(logout());
        navigate("/", {
          state: { message: "Logout successful" },
        });
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError ? error.message : "Logout failed"
      );
    }
  };

  return (
    <div className="w-[100vw] h-[4.5rem] bg-slate-900/40 fixed top-0 z-10 flex justify-around font-poppins text-[clamp(.8rem,1.6vw,1.8rem)] text-white">
      <div className="flex items-center">
        <img src="/images/nav_logo.png" alt="IPL logo" className="h-[3rem]" />
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
      <button
        onClick={currentUser ? logoutUser : signup}
        className="flex items-center self-center rounded-xl text-[clamp(0.8rem,1.5vw,1.6rem)] bg-cyan-700 cursor-pointer transition-all h-fit py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)] hover:text-black hover:bg-cyan-600"
      >
        {currentUser ? "Logout" : "Signup"}
      </button>
    </div>
  );
}
