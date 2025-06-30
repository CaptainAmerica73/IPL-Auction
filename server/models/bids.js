import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
    playerName: {
      type: String,
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    biddedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Bid = mongoose.model("Bids", bidSchema);
