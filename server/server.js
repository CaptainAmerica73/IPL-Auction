import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import bidRouter from "./routes/bids.js";
import playerRouter from "./routes/players.js";
import auctionRouter from "./routes/auctions.js";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import { bidSocket } from "./sockets/bidSocket.js";
import { auctionSocket } from "./sockets/auctionSocket.js";
import { playerSocket } from "./sockets/playerSocket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/bids", bidRouter);
app.use("/players", playerRouter);
app.use("/auctions", auctionRouter);
app.use("/auth", authRouter);

mongoose
<<<<<<< HEAD
  .connect(process.env.MONGO_URI)
=======
  .connect(
    process.env.MONGO_URI
  )
>>>>>>> 433261d2f354e17b39866c7fde569f6828820008
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Connection Error"));

server.listen(process.env.PORT, () =>
  console.log(`Server is listening to port ${process.env.PORT}`)
);

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  bidSocket(io, socket);
  playerSocket(io, socket);
  auctionSocket(io, socket);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
