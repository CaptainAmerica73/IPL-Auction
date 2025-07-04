import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../store/store";
import { addAuction } from "../slices/auctionslice";
import { PrivateAuction, PublicAuction } from "../interfaces/auctions";
import getSocket from "./getSocket";

export default function AuctionListeners() {
  const socket = getSocket();
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    const handleAuctionCreated = (
      auctionData: PrivateAuction | PublicAuction
    ) => {
      dispatch(addAuction(auctionData));
      console.log("Auction added to Redux store");
    };

    socket.on("someOtherCreatedAuction", handleAuctionCreated);

    // socket.on("someOtherJoinedAuction", () => {});

    return () => {
      socket.off("someOtherCreatedAuction", handleAuctionCreated);
    };
  }, [dispatch, socket]);

  return null;
}
