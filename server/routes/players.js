import express from "express";
import { Player } from "../models/players.js";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const totalPlayers = await Player.countDocuments();
    const data = await Player.find().lean();
    const players = data.map(({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }));
    res.json({ players, totalPlayers });
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
