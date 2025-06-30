import express from "express";
import { Bid } from "../models/bids.js";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const totalBids = await Bid.countDocuments();
    const bids = await Bid.find().sort({ createdAt: -1 });
    res.json({ bids, totalBids });
  } catch (e) {
    res.json({ error: e.message });
  }
});

// router.post("/addbid", async (req, res) => {
//   const newBid = new Bid(req.body);
//   newBid.save();
//   res.json({ newBid });
// });

export default router;
