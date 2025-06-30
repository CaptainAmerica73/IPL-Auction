import { Auction } from "../models/auctions.js";

export const joinAuction = async (req, res) => {
  const { teamName, imageURL, auctionId, password } = req.body;
  const userId = req.user.id;
  try {
    if (!auctionId) {
      return res.status(400).json({ message: "Auction ID is required" });
    }

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.status !== "idle") {
      return res.status(400).json({
        message: "Auction is either ongoing or ended",
      });
    }

    if (auction.teams.length >= auction.totalTeams) {
      return res.status(400).json({
        message: `Maximum number of teams (${auction.totalTeams}) reached for this auction`,
      });
    }

    const existingTeam = auction.teams.find(
      (team) => team.teamName.toLowerCase() === teamName.toLowerCase()
    );
    if (existingTeam) {
      return res.status(400).json({
        message: "Team name already exists",
      });
    }

    const isParticipant = auction.teams.find(
      (team) => team.owner.toString() === userId
    );
    if (isParticipant) {
      return res
        .status(400)
        .json({ message: "You are already participating in this auction" });
    }

    if (auction.privacy === "private") {
      if (!password) {
        return res
          .status(400)
          .json({ message: "Password is required for private auctions" });
      }

      const isPasswordValid = auction.comparePassword(password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid password for private auction" });
      }
    }

    auction.teams.push({
      owner: userId,
      imageURL: imageURL,
      teamName: teamName,
    });
    await auction.save();

    return res.status(200).json({
      message: "Successfully joined the auction",
      auctionId: auction._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
