import { Bid } from "../models/bids.js";
import { Player } from "../models/players.js";

export const bidSocket = (io, socket) => {
  socket.on("newBid", async (bidData) => {
    try {
      const newBid = new Bid(bidData);
      await newBid.save();
      io.emit("bidUpdate", newBid);
    } catch (err) {
      console.error("Error saving bid:", err);
    }
  });

  socket.on("deleteBid", async (bidId) => {
    try {
      await Bid.findByIdAndDelete(bidId);
      io.emit("bidUpdate", bidId);
    } catch (err) {
      console.error("Error deleting bid:", err);
    }
  });
};
