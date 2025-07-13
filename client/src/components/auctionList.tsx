import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {enteredAuction, fetchAuctions, leftAuction} from "../slices/auctionSlice.tsx";
import {RootState, DispatchType} from "../store/store";
import JoinAuctionModal from "./joinAuctionModal";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {enterAuction} from "../services/enterAuction";
import getSocket from "../services/getSocket";
import {leaveAuction} from "../services/leaveAuction.ts";
import {removeAuctionFromUser} from "../slices/authSlice.tsx";

export default function AuctionList() {
    const auctions = useSelector((state: RootState) => state.auctions.auctions);
    const dispatch = useDispatch<DispatchType>();
    const currentUser = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [toggleJoinAuctionModal, setToggleJoinAuctionModal] = useState({
        isOpened: false,
        auctionId: "",
        auctionPrivacy: "private" as "private" | "public",
    });

    useEffect(() => {
        if (!currentUser || !currentUser._id) {
            toast.error("Unauthorized access");
            navigate("/");
        }
        dispatch(fetchAuctions());
    }, [currentUser, dispatch, navigate]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] px-[2rem]">
            {toggleJoinAuctionModal.isOpened && (
                <JoinAuctionModal
                    auctionId={toggleJoinAuctionModal.auctionId}
                    auctionPrivacy={toggleJoinAuctionModal.auctionPrivacy}
                    closeModal={() =>
                        setToggleJoinAuctionModal({
                            isOpened: false,
                            auctionId: "",
                            auctionPrivacy: "private",
                        })
                    }
                />
            )}
            {auctions.map((auction) => (
                <div
                    key={auction._id}
                    className="rounded-xl flex flex-col justify-center items-center gap-[1rem] p-[2rem] cursor-pointer bg-black/20 hover:bg-black/30 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] text-center"
                >
                    <p className="text-[clamp(1rem,1.8vw,1.8rem)] tracking-wider font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">
                        {auction.auctionName}
                    </p>
                    <p className="text-[clamp(0.8rem,1.5vw,1.6rem)]">
                        {auction.totalTeams} teams | {auction.wallet}
                    </p>
                    <p className="text-[clamp(0.8rem,1.5vw,1.6rem)]">{auction.privacy}</p>
                    {auction._id === currentUser.auction ? (
                        <div className="flex gap-[.5rem]">
                            <button
                                className="text-[clamp(0.8rem,1.5vw,1.6rem)] bg-red-700 hover:text-black hover:bg-red-600 transition-all rounded-xl py-[clamp(.4rem,.5vw,.6rem)] px-[clamp(.8rem,1.5vw,2rem)] cursor-pointer"
                                onClick={() => {
                                    leaveAuction(auction._id).then((res) => {
                                        console.log(res);
                                        if (res.error) {
                                            toast.error(res.error);
                                            return;
                                        }
                                        dispatch(
                                            leftAuction(res.data)
                                        );
                                        dispatch(removeAuctionFromUser());
                                        getSocket().emit("leftAuction", res.data);
                                        toast.success(res.message || "Successfully left the auction!");
                                    });
                                }}
                            >
                                Leave &#129170;
                            </button>
                            <button
                                className="text-[clamp(0.8rem,1.5vw,1.6rem)] bg-cyan-700 hover:text-black hover:bg-cyan-600 transition-all rounded-xl py-[clamp(.4rem,.5vw,.6rem)] px-[clamp(.8rem,1.5vw,2rem)] cursor-pointer"
                                onClick={() => {
                                    enterAuction(auction._id).then((res) => {
                                        if (res.error) {
                                            toast.error(res.error);
                                            return;
                                        }
                                        dispatch(
                                            enteredAuction({
                                                auctionId: res.data.auctionId,
                                                teamName: res.data.teamName,
                                                active: res.data.active,
                                            })
                                        );
                                        getSocket().emit("enteredAuction", res.data);
                                        navigate(`/auction/${res.data.auctionId}`);
                                    });
                                }}
                            >
                                Enter &#129170;
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                if (!currentUser) {
                                    toast.error("Not authorized to join auction");
                                    return;
                                }
                                setToggleJoinAuctionModal({
                                    isOpened: true,
                                    auctionId: auction._id,
                                    auctionPrivacy: auction.privacy,
                                });
                            }}
                            className="text-[clamp(0.8rem,1.5vw,1.6rem)] bg-cyan-700 hover:text-black hover:bg-cyan-600 transition-all rounded-xl py-[clamp(.4rem,.5vw,.6rem)] px-[clamp(.8rem,1.5vw,2rem)] cursor-pointer"
                        >
                            Join &#129170;
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
