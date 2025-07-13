import {User} from "../models/users.js";
import {generateToken} from "./jwtToken.js";
import {Auction} from "../models/auctions.js";

export const loginUser = async (req, res) => {
    const {userName, password} = req.body;
    try {
        const userExists = await User.findOne({userName}).select("+password");
        if (!userExists || !userExists.comparePassword(password)) {
            return res.status(404).json({message: "Invalid Credentials"});
        }

        let teamName = null;
        if (userExists.auction) {
            const auction = await Auction.findById(userExists.auction);
            if (auction) {
                const team = auction.teams.find(team => team.owner.equals(userExists._id));
                if (team) teamName = team.teamName;
            }
        }

        const data = {
            _id: userExists._id,
            userName: userExists.userName,
            role: userExists.role,
        };
        const token = generateToken(data);
        if (!token) {
            return res.status(500).json({message: "Error generating token"});
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                ...data,
                auction: userExists.auction,
                teamName,
            },
        });
    } catch (error) {
        return res.status(500).json({message: "Error while Logging in"});
    }
};
