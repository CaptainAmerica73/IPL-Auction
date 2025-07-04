import { Route, Routes } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import Login from "../pages/loginPage";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar";
import Home from "../pages/homePage";
import AuctionHome from "../pages/auctionPage";
import SignUp from "../pages/signupPage";
import useAuth from "../services/useAuth";
import useSocket from "../services/useSocket";

export default function AppRouter() {
  const isAuthenticated = useAuth();
  useSocket(isAuthenticated);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auctions" element={<AuctionHome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}
