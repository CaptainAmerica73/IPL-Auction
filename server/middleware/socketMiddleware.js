import {verifyToken} from "../controllers/jwtToken.js";
import {User} from "../models/users.js";

export const socketMiddleware = async (socket, next) => {
    const token = socket.request.headers.cookie.split("; ")[1].split("=")[1];

    if (!token) {
        return next(new Error("Unauthorized"));
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return next(new Error("Unauthorized"));
    }
    socket.user = decoded;
    const user = await User.findById(decoded._id)
    if (user.auction) socket.join(user.auction);
    console.log(socket.rooms)
    next();
};
