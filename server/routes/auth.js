import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/users";

dotenv.config();
const router = express.Router();
const jwt_secret = process.env.JWT_SECRET_KEY;

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ error: "Email not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(400).json({ error: "Invalid Credentials" });
    const token = jwt.sign({ userId: user._id }, jwt_secret, {
      expiresIn: "4h",
    });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
});
