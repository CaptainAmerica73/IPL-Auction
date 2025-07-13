import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {PrivateAuction, PublicAuction} from "../interfaces/auctions";

export default function AuctionPlayPage() {
    const auction: PublicAuction | PrivateAuction | null = useSelector(
        (state: RootState) => state.currentAuction.auction
    );

    return (
        <div className="">
            {auction?.auctionName}
        </div>
    );
}
