import express from "express";
import {Auction} from "../models/auctions.js";
import {joinAuction} from "../controllers/joinAuction.js";
import {authProtect} from "../middleware/authProtect.js";
import {authRoles} from "../middleware/authRoles.js";
import {createAuction} from "../controllers/createAuction.js";
import {enterAuction} from "../controllers/enterAuction.js";
import {leaveAuction} from "../controllers/leaveAuction.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const auctions = await Auction.find({}).sort({createdAt: -1});
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch auctions"});
    }
});

router.get("/:id", async (req, res) => {
    const auctionId = req.params.id;
    try {
        const auction = await Auction.findById(auctionId);
        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch auction"});
    }
})

router.post(
    "/joinAuction",
    authProtect,
    authRoles("admin", "user"),
    joinAuction
);

router.post("/createAuction", authProtect, authRoles("admin"), createAuction);

router.post(
    "/enterAuction/:id",
    authProtect,
    authRoles("admin", "user"),
    enterAuction
);

router.post("/leaveAuction/:id", authProtect, authRoles("admin", "user"), leaveAuction)

export default router;
