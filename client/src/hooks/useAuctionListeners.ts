import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {DispatchType} from "../store/store.tsx";
import {addAuction, addTeamToAuction, enteredAuction} from "../slices/auctionslice.tsx";
import {PrivateAuction, PublicAuction} from "../interfaces/auctions.tsx";
import getSocket from "../services/getSocket.ts";
import {Team} from "../interfaces/teams.tsx";

export default function useAuctionListeners() {
    const socket = getSocket();
    const dispatch = useDispatch<DispatchType>();

    useEffect(() => {
        const handleAuctionCreated = (
            auctionData: PrivateAuction | PublicAuction
        ) => {
            dispatch(addAuction(auctionData));
        };

        const handleAuctionJoined = (data: Omit<Team, "players"> & { auctionId: string }) => {
            dispatch(addTeamToAuction(data));
        }

        const handleAuctionEntered = (data: { auctionId: string; teamName: string; active: boolean }) => {
            dispatch(enteredAuction(data));
        }

        socket.on("someOtherCreatedAuction", handleAuctionCreated);

        socket.on("someOtherJoinedAuction", handleAuctionJoined);

        socket.on("someOtherEnteredAuction", handleAuctionEntered);

        return () => {
            socket.off("someOtherCreatedAuction", handleAuctionCreated);
            socket.off("someOtherJoinedAuction", handleAuctionJoined);
            console.log("Auction Listeners are unmounted")
        };
    }, [dispatch, socket]);
}
