export const auctionSocket = (io, socket) => {
  socket.on("auctionCreated", async (auction) => {
    socket.broadcast.emit("someOtherCreatedAuction", auction);
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
