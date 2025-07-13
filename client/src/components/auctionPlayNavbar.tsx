import {
	Link, useParams
} from "react-router-dom";
import {
	useDispatch, useSelector
} from "react-redux";
import {
	DispatchType, RootState
} from "../store/store.tsx";
import {
	PrivateAuction, PublicAuction
} from "../interfaces/auctions.tsx";
import {
	Team
} from "../interfaces/teams.tsx";
import {
	useEffect, useMemo
} from "react";
import {
	fetchAuctionById
} from "../slices/currentAuctionSlice.tsx";

export default function AuctionPlayNavbar() {
	const {id} = useParams();

	const auction: PublicAuction | PrivateAuction | null = useSelector(
		(state: RootState) => state.currentAuction.auction)
	const currentUser = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch<DispatchType>();

	const team: Team | null = useMemo(() => {
		return auction?.teams.find(team => team.teamName === currentUser.teamName) ?? null;
	}, [auction, currentUser.teamName])

	useEffect(() => {
		if (id !== undefined) {
			dispatch(fetchAuctionById(id));
		}
	}, [dispatch, id]);

	return (<>
		<div
			className="w-[100vw] h-[4.5rem] bg-slate-900/40 fixed top-0 z-10 flex items-center justify-between px-[2rem] font-poppins text-[clamp(.8rem,1.6vw,1.8rem)] text-white">
			{team && <div
				className="flex items-center justify-around w-[30%]">
				<p className="text-[clamp(.8rem,1.6vw,1.8rem)]">{currentUser.teamName}</p>
				<img
					className="size-[6rem] object-contain"
					src={team.imageURL}
					alt={team.teamName}/>
			</div>}
			<div
				className="nav h-full flex items-center">
				<Link
					to="./bids"
					className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
				>
					Bids
				</Link>
				<Link
					to="./teams"
					className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
				>
					Teams
				</Link>
				<Link
					to="./"
					className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3"
				>
					Auction
				</Link>
				<Link
					to="./players"
					className="flex relative justify-center items-center h-full px-[clamp(1rem,1.7vw,2.2rem)] hover:before:w-1/3 cursor-pointer whitespace-nowrap before:w-0 before:absolute before:rounded-2xl before:transition-all before:ease-in-out before:duration-300 before:h-[.2rem] before:bg-white before:bottom-3">
					Players
				</Link>
			</div>
		</div>
	</>);
}
