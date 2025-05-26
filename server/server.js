import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import bidRouter from "./routes/bids.js";
import playerRouter from "./routes/players.js";
import { setupSocket } from "./sockets/bids.js";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/bids", bidRouter);
app.use("/players", playerRouter);

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Connection Error"));

server.listen(3000, () => console.log("Server is listening to port 3000"));

setupSocket(io);
