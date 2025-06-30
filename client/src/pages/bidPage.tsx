// import { useDispatch, useSelector } from "react-redux";
// import { DispatchType, RootState } from "../../store/store";
// import { useEffect } from "react";
// import { fetchPlayers } from "../../slices/playerslice";
// import { socket } from "../../socket";

// export default function Bid() {
//   const { players, isLoading } = useSelector(
//     (state: RootState) => state.players
//   );

//   const dispatch = useDispatch<DispatchType>();
//   useEffect(() => {
//     scrollTo(0, 0);
//     dispatch(fetchPlayers());
//   }, [dispatch]);

//   useEffect(() => {
//     socket.on("bidUpdate", (data) => {
//       console.log(data);
//     });
//     return () => {
//       socket.off("bidUpdate");
//     };
//   }, []);

//   const handleBid = (data) => {
//     console.log(data);

//     socket.emit("newBid", {
//       playerId: data.id,
//       playerName: data.name,
//       amount: 10000,
//       biddedBy: "Anand",
//     });
//   };

//   return (
//     <>
//       <div className="bg-[#19398a] min-h-[100vh] grid md:grid-cols-3 px-[2rem] py-[6.5rem_2rem] gap-[3rem] auto-rows-fr place-content-center">
//         {isLoading && (
//           <div className="self-center place-self-center col-span-3 text-[clamp(2rem,5vw,4rem)]">
//             Loading...
//           </div>
//         )}
//         {players.map((player) => {
//           return (
//             <div
//               key={player.name}
//               className="flex flex-col items-center justify-between p-[2rem] transition-all font-poppins bg-[#0000001f] rounded-2xl hover:shadow-[10px_10px_15px_1px] shadow-[#000000b5] text-[clamp(1.5rem,2vw,2rem)]"
//             >
//               <div className="font-bold">{player.name}</div>
//               <img
//                 className={`${
//                   player.image.includes("default-headshot")
//                     ? "w-[13rem] h-[16rem]"
//                     : "w-[17rem] h-[17rem]"
//                 }`}
//                 src={player.image}
//                 alt={player.name}
//               />
//               <div>
//                 {player.dob ? player.dob.toString().split("T")[0] : "N/A"}
//               </div>
//               <button
//                 onClick={() => handleBid(player)}
//                 className="bg-[#b61d1d] p-[.5rem_2rem] rounded-2xl cursor-pointer transition-all hover:bg-[#741515]"
//               >
//                 Bid
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
