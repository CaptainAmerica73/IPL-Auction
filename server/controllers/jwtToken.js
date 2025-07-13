import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    try {
        return jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "3d",
        });
    } catch (error) {
        return null;
    }
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};
