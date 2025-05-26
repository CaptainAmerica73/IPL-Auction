import { Bid } from "../models/bids.js";
import { Player } from "../models/players.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("newBid", async (bidData) => {
      try {
        const newBid = new Bid(bidData);
        await newBid.save();
        io.emit("bidUpdate", newBid);
      } catch (err) {
        console.error("Error saving bid:", err);
      }
    });

    socket.on("addPlayer", async (playerData) => {
      try {
        const newPlayer = new Player(playerData);
        await newPlayer.save();
      } catch (err) {
        console.error("Error saving Player Data:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
