export const playerSocket = (io, socket) => {
  socket.on("addPlayer", async (playerData) => {
    try {
      const newPlayer = new Player(playerData);
      await newPlayer.save();
    } catch (err) {
      console.error("Error saving Player Data:", err);
    }
  });
};
