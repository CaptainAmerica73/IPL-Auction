import { verifyToken } from "../controllers/jwtToken.js";
import { User } from "../models/users.js";

export const authProtect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const decoded = verifyToken(token);

    const userExists = await User.findById(decoded._id)
      .select("-password")
      .lean();
    if (!userExists) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = {
      _id: userExists._id,
      userName: userExists.userName,
      role: userExists.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
