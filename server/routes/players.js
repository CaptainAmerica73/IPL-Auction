import express from "express";
import { Player } from "../models/players.js";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const totalPlayers = await Player.countDocuments();
    const data = await Player.find().lean();
    res.status(200).json({ players: data, totalPlayers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
