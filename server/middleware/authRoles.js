export const authRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "User does not have access" });
    }

    next();
  };
};
