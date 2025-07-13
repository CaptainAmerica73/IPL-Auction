import {useDispatch, useSelector} from "react-redux";
import {DispatchType, RootState} from "../store/store.tsx";
import {useEffect, useMemo, useState} from "react";
import {fetchPlayers} from "../slices/playerSlice.tsx";
import BattersDisplay from "../components/battersDisplay.tsx";
import BowlersDisplay from "../components/bowlersDisplay.tsx";
import WicketKeepersDisplay from "../components/wicketkeepersDisplay.tsx";
import AllRoundersDisplay from "../components/allroundersDisplay.tsx";

export default function AuctionPlayPlayers() {
	const [playerType, setPlayerType] = useState<string>("Batters")
	const players = useSelector((state: RootState) => state.players.players)
	const dispatch = useDispatch<DispatchType>();
	const batters = useMemo(
		() => players.filter(player => player.specialization === "Batter"),
		[players])

	const bowlers = useMemo(
		() => players.filter(player => player.specialization === "Bowler"),
		[players])

	const wicketKeepers = useMemo(
		() => players.filter(player => player.specialization === "Wicketkeeper Batter"),
		[players])

	const allRounders = useMemo(
		() => players.filter(player => player.specialization === "All Rounder"),
		[players])

	useEffect(() => {
		dispatch(fetchPlayers());
	}, [dispatch]);

	return <div
		className="grid grid-cols-[25%_1fr] mt-[5rem] h-[45vw] w-[80vw] bg-white border-[.5rem] border-yellow-600 rounded-[1rem]">
		<div
			className="border-r-4 border-black flex flex-col justify-start items-center">
			<div
				onClick={() => setPlayerType("Batters")}
				className={`${playerType === "Batters" ?
					"bg-cyan-500 hover:bg-cyan-300" :
					"hover:bg-slate-300/30"} transition-all text-black cursor-pointer text-center p-[.5rem_1rem] w-full text-[clamp(1rem,2vw,2rem)] border-b-2 font-semibold`}>
				Batters
			</div>
			<div
				onClick={() => setPlayerType("Bowlers")}
				className={`${playerType === "Bowlers" ?
					"bg-cyan-500 hover:bg-cyan-300" :
					"hover:bg-slate-300/30"} transition-all text-black cursor-pointer text-center p-[.5rem_1rem] w-full text-[clamp(1rem,2vw,2rem)] border-y-2 font-semibold`}>
				Bowlers
			</div>
			<div
				onClick={() => setPlayerType("Wicket Keepers")}
				className={`${playerType === "Wicket Keepers" ?
					"bg-cyan-500 hover:bg-cyan-300" :
					"hover:bg-slate-300/30"} transition-all text-black cursor-pointer text-center p-[.5rem_1rem] w-full text-[clamp(1rem,2vw,2rem)] border-y-2 font-semibold`}>
				Wicket Keepers
			</div>
			<div
				onClick={() => setPlayerType("All Rounders")}
				className={`${playerType === "All Rounders" ?
					"bg-cyan-500 hover:bg-cyan-300" :
					"hover:bg-slate-300/30"} transition-all text-black cursor-pointer text-center p-[.5rem_1rem] w-full text-[clamp(1rem,2vw,2rem)] border-t-2 border-b-4 font-semibold`}>
				All Rounders
			</div>
		</div>
		{playerType === "Batters" && <BattersDisplay batters={batters}/>}
		{playerType === "Bowlers" && <BowlersDisplay bowlers={bowlers}/>}
		{playerType === "Wicket Keepers" && <WicketKeepersDisplay wicketKeepers={wicketKeepers}/>}
		{playerType === "All Rounders" && <AllRoundersDisplay allRounders={allRounders}/>}
	</div>
}