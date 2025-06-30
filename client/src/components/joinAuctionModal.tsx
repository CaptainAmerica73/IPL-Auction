import { ChangeEvent, FormEvent, useState } from "react";
import { joinAuction } from "../services/joinAuction";
import { toast } from "react-toastify";

export default function JoinAuctionModal({
  auctionId,
  auctionPrivacy,
  closeModal,
}: {
  auctionId: string;
  auctionPrivacy: "private" | "public";
  closeModal: () => void;
}) {
  const [formData, setFormData] = useState({
    teamName: "",
    imageURL: "",
    ...(auctionPrivacy === "private" ? { password: "" } : {}),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinAuction({ ...formData, auctionPrivacy, auctionId })
      .then((response) => {
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success("Successfully joined the auction!");
        }
        closeModal();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="backdrop-fade" onClick={() => closeModal()}>
      <div className="modal-fade" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-[.7rem] right-[1.5rem] text-[clamp(1rem,2.5vw,2.5rem)] text-white cursor-pointer"
          onClick={() => closeModal()}
        >
          &times;
        </button>
        <h2 className="text-[clamp(1rem,2.5vw,2.5rem)] my-[3rem]">
          Join Auction
        </h2>
        <form
          className="flex flex-col gap-y-[2rem] w-[20rem]"
          onSubmit={handleSubmit}
        >
          <div className="relative h-[5vh] w-full my-[.5rem]">
            <input
              name="teamName"
              id="teamName"
              className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
              type="text"
              onChange={handleChange}
              value={formData.teamName}
              minLength={6}
              required
              placeholder=""
            />
            <label
              htmlFor="teamName"
              className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
            >
              Team Name
            </label>
          </div>
          <div className="relative h-[5vh] w-full my-[.5rem]">
            <input
              name="imageURL"
              id="imageURL"
              className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
              type="text"
              onChange={handleChange}
              value={formData.imageURL}
              placeholder=""
            />
            <label
              htmlFor="imageURL"
              className="absolute -top-1 left-0 text-sm -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg"
            >
              ImageURL
            </label>
          </div>
          {auctionPrivacy === "private" && (
            <div className="relative h-[5vh] w-full my-[.5rem]">
              <input
                name="password"
                id="password"
                className="peer border-b-2 border-white bg-transparent outline-none h-full w-full"
                type="password"
                onChange={handleChange}
                value={formData.password}
                required
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
          <button
            className="bg-cyan-700 rounded-xl text-[clamp(0.8rem,1.3vw,1.3rem)] py-[clamp(.5rem,.5vw,.8rem)] px-[clamp(1rem,1.7vw,2.2rem)] hover:not-disabled:text-black hover:not-disabled:bg-cyan-600 transition-all mx-auto mb-[3rem] disabled:cursor-not-allowed disabled:brightness-50 cursor-pointer"
            type="submit"
            disabled={
              formData.teamName.length < 6 ||
              (auctionPrivacy === "private" && formData.password!.length < 6)
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
