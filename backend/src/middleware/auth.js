import jwt from "jsonwebtoken";

// Cookie-based admin authentication
export const protect = (req, res, next) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: check role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Not an admin" });
    }

    req.admin = decoded; // attach to request for use in route
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
