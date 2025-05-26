import express from "express";
import Auction from "../models/auctions.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch auctions" });
  }
});
