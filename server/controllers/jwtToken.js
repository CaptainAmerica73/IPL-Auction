import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};
