import { readFileSync } from "fs";
import mongoose from "mongoose";
import { Player } from "./models/players.js";
import dotenv from "dotenv";

dotenv.config();
const data = JSON.parse(readFileSync("../ipl_players.json", "utf-8"));

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log(e.message | "MongoDB Connection Error"));

const update = async () => {
  data.forEach((player) => {
    const dob = new Date(Date.parse(player.dob) + 6.5 * 60 * 60 * 1000);
    const newPlayer = new Player({ ...player, dob: dob, squad: "" });
    newPlayer.save();
  });
};

update()
  .then(() => console.log("Data updated successfully"))
  .catch((e) => console.log(e.message | "Error updating players data"));