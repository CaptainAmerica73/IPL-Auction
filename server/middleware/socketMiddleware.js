import { verifyToken } from "../controllers/jwtToken.js";

export const socketMiddleware = (socket, next) => {
  const token = socket.handshake.headers.cookie.split("; ")[1].split("=")[1];

  if (!token) {
    return next(new Error("Unauthorized"));
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return next(new Error("Unauthorized"));
  }
  socket.user = decoded;
  next();
};
