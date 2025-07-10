import { useDispatch } from "react-redux";
import { DispatchType } from "../store/store";
import { useEffect, useState } from "react";
import CreateAuctionModal from "../components/createAuctionModal";
import { PrivateAuction, PublicAuction } from "../interfaces/auctions";
import getSocket from "../services/getSocket";
import { addAuction } from "../slices/auctionslice";
import AuctionList from "../components/auctionList";

export default function AuctionHome() {
  const [toggleCreateAuctionModal, setToggleCreateAuctionModal] =
    useState(false);
  const dispatch = useDispatch<DispatchType>();

  const socket = getSocket();

  useEffect(() => {
    const handleNewAuction = (auction: PublicAuction | PrivateAuction) => {
      dispatch(addAuction(auction));
    };
    socket.on("auctionCreated", handleNewAuction);
    return () => {
      socket.off("auctionCreated", handleNewAuction);
    };
  }, [dispatch, socket]);

  return (
    <div className="w-screen min-h-screen flex justify-center bg-[#19398a]">
      {toggleCreateAuctionModal && (
        <CreateAuctionModal setToggle={setToggleCreateAuctionModal} />
      )}
      <div className="min-h-[80vh] w-[80%] mx-auto my-[15vh] bg-slate-900/30 rounded-4xl flex flex-col p-[3rem]">
        <div className="flex justify-between px-[6rem] mb-[2rem] items-center">
          <p className="text-[clamp(1rem,2.5vw,2.5rem)] font-semibold">
            Auctions
          </p>
          <button
            onClick={() => setToggleCreateAuctionModal(true)}
            className="text-[clamp(0.8rem,1.5vw,1.6rem)] font-medium cursor-pointer bg-cyan-700 hover:text-black hover:bg-cyan-600 transition-all rounded-xl py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)]"
          >
            New +
          </button>
        </div>
        <AuctionList />
      </div>
    </div>
  );
}
