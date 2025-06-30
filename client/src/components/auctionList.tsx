import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Auction } from "../interfaces/auctions";
import { fetchAuctions } from "../slices/auctionslice";
import { RootState, DispatchType } from "../store/store";
import JoinAuctionModal from "./joinAuctionModal";

export default function AuctionList() {
  const auctions = useSelector((state: RootState) => state.auctions.auctions);
  const dispatch = useDispatch<DispatchType>();

  const [toggleJoinAuctionModal, setToggleJoinAuctionModal] = useState({
    isOpened: false,
    auctionId: "",
    auctionPrivacy: "private" as "private" | "public",
  });

  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] px-[2rem]">
      {toggleJoinAuctionModal.isOpened && (
        <JoinAuctionModal
          auctionId={toggleJoinAuctionModal.auctionPrivacy}
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
      {auctions.map((auction: Auction) => (
        <div
          key={auction.id}
          className="rounded-xl flex flex-col justify-center items-center gap-[1rem] p-[2rem] cursor-pointer bg-black/20 hover:bg-black/30 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] text-center"
        >
          <p className="text-[clamp(1rem,1.8vw,1.8rem)] tracking-wider font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-full">
            {auction.auctionName}
          </p>
          <p className="text-[clamp(0.8rem,1.5vw,1.6rem)]">
            {auction.totalTeams} teams | {auction.wallet}
          </p>
          <p className="text-[clamp(0.8rem,1.5vw,1.6rem)]">{auction.privacy}</p>
          <button
            onClick={() =>
              setToggleJoinAuctionModal({
                isOpened: true,
                auctionId: auction.id,
                auctionPrivacy: auction.privacy,
              })
            }
            className="text-[clamp(0.8rem,1.5vw,1.6rem)] bg-cyan-700 hover:text-black hover:bg-cyan-600 transition-all rounded-xl py-[clamp(.4rem,.5vw,.6rem)] px-[clamp(.8rem,1.5vw,2rem)] cursor-pointer"
          >
            Join &#129170;
          </button>
        </div>
      ))}
    </div>
  );
}
