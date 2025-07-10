import express from "express";
import {Auction} from "../models/auctions.js";
import {joinAuction} from "../controllers/joinAuction.js";
import {authProtect} from "../middleware/authProtect.js";
import {authRoles} from "../middleware/authRoles.js";
import {createAuction} from "../controllers/createAuction.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const auctions = await Auction.find({}).sort({createdAt: -1});
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch auctions"});
    }
});

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
    async (req, res) => {
        const {id} = req.params;
        const userId = req.user._id;
        const auction = await Auction.findById(id);

        if (!auction) return res.status(400).json({message: "Auction not found"});
        const team = auction.teams.find((team) => team.owner.equals(userId));
        if (!team) return res.status(400).json({message: "Team not found"})
        team.active = true;
        const data = {auctionId: id, teamName: team.teamName, active: true};
        await auction.save();
        return res
            .status(201)
            .json({data: data, message: "Entered Successfully"});
    }
);

export default router;
