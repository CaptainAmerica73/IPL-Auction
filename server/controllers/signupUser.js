import { User } from "../models/users.js";
import { generateToken } from "./jwtToken.js";

export const signupUser = async (req, res) => {
  const { userName, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ userName, email, password, role });
    await newUser.save();

    const data = {
      id: newUser._id,
      userName: newUser.userName,
      role: newUser.role,
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

    return res.status(201).json({
      message: "Signup successful",
      user: data,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while Signing up" });
  }
};
