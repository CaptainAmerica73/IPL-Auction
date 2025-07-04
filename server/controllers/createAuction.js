import { Player } from "../models/players.js";
import { Auction } from "../models/auctions.js";

export const createAuction = async (req, res) => {
  const auctionData = req.body;
  const user = req.user._id;

  try {
    const players = await Player.find({}, { _id: 1 }).lean();
    const newAuction = new Auction({
      ...auctionData,
      players: players.map((player) => ({
        playerId: player._id,
      })),
      createdBy: user,
    });
    await newAuction.save();
    const data = newAuction.toObject();

    console.log(data);

    res.status(201).json({
      message: "Auction Creation Successful",
      data: {
        _id: newAuction._id,
        auctionName: newAuction.auctionName,
        teams: newAuction.teams,
        players: newAuction.players,
        currentTeams: newAuction.currentTeams,
        totalTeams: newAuction.totalTeams,
        wallet: newAuction.wallet,
        status: newAuction.status,
        createdBy: newAuction.createdBy,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error while Creating Auction" });
  }
};
