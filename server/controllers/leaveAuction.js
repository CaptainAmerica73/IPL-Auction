import {Auction} from "../models/auctions.js";
import {User} from "../models/users.js";

export const leaveAuction = async (req, res) => {
    const auctionId = req.params.id;
    const userId = req.user._id;
    try {
        const auction = await Auction.findById(auctionId);
        if (!auction) return res.status(400).json({message: "Auction not found"});

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({message: "User not found"});

        user.auction = null;
        await user.save();

        const teamIndex = auction.teams.findIndex((team) => team.owner.equals(userId));
        if (teamIndex === -1) return res.status(400).json({message: "Team not found"});

        const teamName = auction.teams[teamIndex].teamName;
        auction.teams.splice(teamIndex, 1);
        auction.currentTeams -= 1;
        await auction.save();

        return res.status(201).json({
            data: {
                auctionId,
                teamName
            }, message: "Left Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}