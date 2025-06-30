import express from "express";
import { loginUser } from "../controllers/loginUser.js";
import { signupUser } from "../controllers/signupUser.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

export default router;
