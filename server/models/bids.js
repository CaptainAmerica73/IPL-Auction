import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      index: true,
    },
    playerName: { type: String, required: true },
    amount: { type: Number, required: true },
    biddedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Bid = mongoose.model("Bid", bidSchema);
