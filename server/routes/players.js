import express from "express";
import { Player } from "../models/players.js";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const totalPlayers = await Player.countDocuments();
    const data = await Player.find()
      .skip((page - 1) * 10)
      .limit(10)
      .lean();
    const players = data.map(({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }));
    res.json({ players, totalPages: Math.ceil(totalPlayers / 10) });
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
