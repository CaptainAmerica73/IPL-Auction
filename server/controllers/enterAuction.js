import {Auction} from "../models/auctions.js";

export const enterAuction = async (req, res) => {
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