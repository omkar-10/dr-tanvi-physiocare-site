import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/admin/login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send as HttpOnly cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on production HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      admin: {
        _id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Admin
export const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Check Admin Profile (auth check)
export const getAdminProfile = (req, res) => {
  // req.admin is set by the protect middleware
  res.status(200).json({
    _id: req.admin._id,
    email: req.admin.email,
  });
};
