import {Player} from "../interfaces/players.tsx";

export default function BowlersDisplay({bowlers}: { bowlers: Player[] }) {
	return <div className="overflow-auto border-black text-black">{bowlers.map(
		player => (
			<div
				className="border-y-1 p-[1.5rem] first:border-t-0 last:border-b-0">{player.name}</div>
		))}</div>
}