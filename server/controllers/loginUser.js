import { User } from "../models/users.js";
import { generateToken } from "./jwtToken.js";

export const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userExists = await User.findOne({ userName });
    if (!userExists || !userExists.comparePassword(password)) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const data = {
      _id: userExists._id,
      userName: userExists.userName,
      role: userExists.role,
    };
    const token = generateToken(data);
    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: { ...data, auctions: userExists.auctions },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while Logging in" });
  }
};
