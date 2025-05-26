import express from "express";
import { Bid } from "../models/bids.js";

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const totalBids = await Bid.countDocuments();
    const bids = await Bid.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);
    res.json({ bids, totalPages: Math.ceil(totalBids / 10) });
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
