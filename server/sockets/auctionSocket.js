import { Auction } from "../models/auctions.js";

export const auctionSocket = (io, socket) => {
  socket.on("createAuction", async (auctionData) => {
    const { id, ...rest } = auctionData;

    try {
      const newAuction = new Auction(rest);
      await newAuction.save();
      const { _id, ...newRest } = newAuction.toObject();
      io.emit("auctionCreated", { id: _id, ...newRest });
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
