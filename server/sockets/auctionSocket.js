import { Auction } from "../models/auctions.js";
import { Player } from "../models/players.js";

export const auctionSocket = (io, socket) => {
  socket.on("createAuction", async (auctionData) => {
    try {
      const players = await Player.find({}, { _id: 1 }).lean();
      const newAuction = new Auction({
        ...auctionData,
        players: players.map((player) => ({
          playerId: player._id,
        })),
        createdBy: socket.user._id,
      });
      await newAuction.save();
      const data = newAuction.toObject();
      console.log(data._id);

      io.emit("auctionCreated", data);
    } catch (error) {
      io.emit("auctionCreationError", "Failed to create auction");
    }
  });

  socket.on("joinAuction", (auctionId) => {
    socket.join(auctionId);
    socket.emit("joinedAuction", auctionId);
    socket.to(auctionId).emit("someOtherJoinedAuction", auctionId);
  });

  socket.on("leaveAuction", (auctionId) => {
    socket.leave(auctionId);
  });
};
