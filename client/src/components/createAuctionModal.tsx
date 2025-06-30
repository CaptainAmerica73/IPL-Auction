import { FormEvent, useState } from "react";
import { Auction } from "../interfaces/auctions";
import { clientSocket } from "../socket";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toCrore } from "../utilities/croreConversion";

export default function CreateAuctionModal({
  setToggle,
}: {
  setToggle: (prev: boolean) => void;
}) {
  const currentUser = useSelector((state: RootState) => state.auth.id);
  const [auction, setAuction] = useState<Auction>({
    id: "",
    auctionName: "",
    teams: [],
    players: [],
    totalTeams: 0,
    wallet: "0Cr",
    privacy: "private",
    status: "idle",
    createdBy: currentUser,
  });

  const handleChange = (o: Partial<Auction>) => {
    setAuction((prev) => ({ ...prev, ...o }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clientSocket.emit("createAuction", auction);
    setToggle(false);
  };

  return (
    <div className="backdrop-fade" onClick={() => setToggle(false)}>
      <div className="modal-fade" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-[.7rem] right-[1.5rem] text-[clamp(1rem,2.5vw,2.5rem)] text-white cursor-pointer"
          onClick={() => setToggle(false)}
        >
          &times;
        </button>
        <h2 className="text-[clamp(1rem,2.5vw,2.5rem)] my-[3rem]">
          Create Auction
        </h2>
        <form
          className="flex flex-col gap-y-[2rem] w-[20rem]"
          onSubmit={handleSubmit}
        >
          <div className="relative h-[5vh] w-full my-[.5rem]">
            <input
              name="auctionName"
              id="auctionname"
              className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
              type="text"
              onChange={(e) => handleChange({ auctionName: e.target.value })}
              value={auction.auctionName}
              minLength={6}
              required
              placeholder=""
            />
            <label
              htmlFor="auctionname"
              className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
            >
              Auction Name
            </label>
          </div>
          <div className="relative h-[5vh] w-full my-[.5rem]">
            <input
              name="totalTeams"
              id="totalTeams"
              className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
              type="number"
              inputMode="numeric"
              onChange={(e) =>
                handleChange({ totalTeams: parseInt(e.target.value) || 0 })
              }
              value={auction.totalTeams == 0 ? "" : auction.totalTeams}
              min={2}
              max={10}
              required
              placeholder=""
            />
            <label
              htmlFor="totalTeams"
              className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
            >
              Total Teams
            </label>
          </div>
          <div className="relative h-[5vh] w-full my-[.5rem]">
            <input
              name="wallet"
              id="wallet"
              className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
              type="text"
              inputMode="decimal"
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d.]/g, "") || "0";
                const cleaned = toCrore(value);
                handleChange({ wallet: cleaned + "Cr" });
                setTimeout(() => {
                  e.target.setSelectionRange(cleaned.length, cleaned.length);
                }, 0);
              }}
              value={auction.wallet == "0Cr" ? "" : auction.wallet}
              min={50}
              required
              placeholder=""
            />
            <label
              htmlFor="wallet"
              className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
            >
              Wallet
            </label>
          </div>
          <div className="flex justify-around">
            <div className="flex gap-[.5rem]">
              <input
                type="radio"
                id="public"
                name="privacy"
                onChange={() => handleChange({ privacy: "public" })}
                checked={auction.privacy == "public"}
                className="scale-125 accent-[#19398a]"
              />
              <label htmlFor="public" className="cursor-pointer text-lg">
                Public
              </label>
            </div>
            <div className="flex gap-[.5rem]">
              <input
                type="radio"
                id="private"
                name="privacy"
                onChange={() => handleChange({ privacy: "private" })}
                checked={auction.privacy == "private"}
                className="scale-125 accent-[#19398a]"
              />
              <label htmlFor="private" className="cursor-pointer text-lg">
                Private
              </label>
            </div>
          </div>
          <button
            className="bg-cyan-700 rounded-xl text-[clamp(0.8rem,1.3vw,1.3rem)] py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)] hover:not-disabled:text-black hover:not-disabled:bg-cyan-600 transition-all mx-auto mb-[3rem] disabled:cursor-not-allowed disabled:brightness-50 cursor-pointer"
            type="submit"
            disabled={
              auction.totalTeams < 4 ||
              auction.auctionName.length < 6 ||
              parseInt(auction.wallet.slice(0, auction.wallet.length - 2)) < 50
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
