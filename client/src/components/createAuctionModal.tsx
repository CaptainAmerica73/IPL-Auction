import { FormEvent, useState } from "react";
import { Auction, PrivateAuction, PublicAuction } from "../interfaces/auctions";
import getSocket from "../services/getSocket";
import { toCrore } from "../utilities/croreConversion";
import { toast } from "react-toastify";
import { createAuction } from "../services/createAuction";
import { useDispatch } from "react-redux";
import { DispatchType } from "../store/store";
import { addAuction } from "../slices/auctionslice";

export default function CreateAuctionModal({
  setToggle,
}: {
  setToggle: (prev: boolean) => void;
}) {
  const [auction, setAuction] = useState<
    Partial<PrivateAuction | PublicAuction>
  >({
    auctionName: "",
    totalTeams: 0,
    wallet: "0Cr",
    privacy: "public",
  });
  const dispatch = useDispatch<DispatchType>();

  const handleChange = (o: Partial<Auction>) => {
    setAuction((prev) => ({ ...prev, ...o }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createAuction(auction)
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
            throw new Error(response.error);
          }
          toast.success(response.message || "Auction created successfully!");
          dispatch(addAuction(response.data));
          getSocket().emit("auctionCreated", response.data);
        })
        .catch((error) => {
          toast.error(
            error.message || "Failed to create auction. Please try again."
          );
        });
    } catch (error) {
      console.log(error);
    } finally {
      setToggle(false);
    }
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
          {auction.privacy == "private" && (
            <div className="relative h-[5vh] w-full my-[.5rem]">
              <input
                name="password"
                id="password"
                className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
                type="password"
                onChange={(e) =>
                  setAuction((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={auction.password}
                minLength={6}
                required={auction.privacy == "private"}
                placeholder=""
              />
              <label
                htmlFor="password"
                className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
              >
                Password
              </label>
            </div>
          )}
          <div className="flex justify-around">
            <div className="flex gap-[.5rem]">
              <input
                type="radio"
                id="public"
                name="privacy"
                onChange={() => {
                  const data = auction as Omit<PrivateAuction, "password">;
                  setAuction({
                    ...data,
                    privacy: "public",
                  } as PublicAuction);
                }}
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
                onChange={() => {
                  setAuction(
                    (prev) =>
                      ({
                        ...prev,
                        privacy: "private",
                        password: "",
                      } as PrivateAuction)
                  );
                }}
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
              auction.totalTeams! < 4 ||
              auction.auctionName!.length < 6 ||
              parseInt(auction.wallet!.slice(0, auction.wallet!.length - 2)) <
                50
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
