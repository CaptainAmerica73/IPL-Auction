export const auctionSocket = (io, socket) => {
    socket.on("auctionCreated", async (auction) => {
        socket.broadcast.emit("someOtherCreatedAuction", auction);
    });

    socket.on("joinedAuction", (data) => {
        socket.join(data.auctionId);
        socket.broadcast.emit("someOtherJoinedAuction", data);
    });

    socket.on("enteredAuction", (data) => {
        socket.to(data.auctionId).emit("someOtherEnteredAuction", data);
    });

    socket.on("leaveAuction", (auctionId) => {
        socket.leave(auctionId);
    });
};
