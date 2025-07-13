import {Outlet, Route, Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Login from "../pages/loginPage";
import {ToastContainer} from "react-toastify";
import Navbar from "./navbar";
import Home from "../pages/homePage";
import AuctionHome from "../pages/auctionsPage.tsx";
import SignUp from "../pages/signupPage";
import useAuth from "../hooks/useAuth.ts";
import useSocket from "../hooks/useSocket.ts";
import useAuctionListeners from "../hooks/useAuctionListeners.ts";
import AuctionPlayNavbar from "./auctionPlayNavbar.tsx";
import AuctionPlayPage from "../pages/auctionPlayPage.tsx";
import AuctionPlayPlayers from "../pages/auctionPlayPlayers.tsx";

const NormalLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

const AuctionPlayLayout = () => {
    return (
        <>
            <AuctionPlayNavbar/>
            <div className="w-screen min-h-screen flex justify-center items-center bg-[#19398a]">
                <Outlet/>
            </div>
        </>
    );
};

export default function AppRouter() {
    const isAuthenticated = useAuth();
    useSocket(isAuthenticated);
    useAuctionListeners();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NormalLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="auctions" element={<AuctionHome/>}/>
                    <Route path="auth/login" element={<Login/>}/>
                    <Route path="auth/signup" element={<SignUp/>}/>
                </Route>
                <Route path="/auction/:id" element={<AuctionPlayLayout/>}>
                    <Route index element={<AuctionPlayPage/>}/>
                    <Route path="players" element={<AuctionPlayPlayers/>}/>
                </Route>
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
