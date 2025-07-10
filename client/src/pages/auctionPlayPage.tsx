import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {RootState} from "../store/store";
import {PrivateAuction, PublicAuction} from "../interfaces/auctions";

export default function AuctionPlayPage() {
    const {id} = useParams();
    const auction: PublicAuction | PrivateAuction = useSelector(
        (state: RootState) =>
            state.auctions.auctions.find((auction) => auction._id === id) as
                | PublicAuction
                | PrivateAuction
    );
    console.log(auction)
    return (
        <div className="w-screen min-h-screen flex justify-center bg-[#19398a]">
            {auction.teams.map((team) => (
                <div className="size-24">
                    <div>{team.teamName}</div>
                    <img className="size-14" src={team.imageURL} alt={team.teamName}/>
                </div>
            ))}
        </div>
    );
}
