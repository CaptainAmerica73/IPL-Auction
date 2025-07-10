import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {enteredAuction, fetchAuctions} from "../slices/auctionslice";
import {RootState, DispatchType} from "../store/store";
import JoinAuctionModal from "./joinAuctionModal";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {enterAuction} from "../services/enterAuction";
import getSocket from "../services/getSocket";

export default function AuctionList() {
    const auctions = useSelector((state: RootState) => state.auctions.auctions);
    const dispatch = useDispatch<DispatchType>();
    const currentUser = useSelector((state: RootState) => state.auth._id);
    const navigate = useNavigate();

    const isJoined = (auctionId: string) => {
        const auction = auctions.find((auction) => auction._id == auctionId);
        if (auction) {
            return auction.teams.some((team) => team.owner == currentUser);
        }
    };

    const [toggleJoinAuctionModal, setToggleJoinAuctionModal] = useState({
        isOpened: false,
        auctionId: "",
        auctionPrivacy: "private" as "private" | "public",
    });

    useEffect(() => {
        if (!currentUser) {
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
                    {isJoined(auction._id) ? (
                        <button
                            className="text-[clamp(0.8rem,1.5vw,1.6rem)] bg-cyan-700 hover:text-black hover:bg-cyan-600 transition-all rounded-xl py-[clamp(.4rem,.5vw,.6rem)] px-[clamp(.8rem,1.5vw,2rem)] cursor-pointer"
                            onClick={() => {
                                enterAuction(auction._id).then((res) => {
                                    console.log(res);

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
