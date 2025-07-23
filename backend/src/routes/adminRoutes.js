// routes/adminRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllAppointments,
  updateAppointmentStatus,
  getAdminStats,
} from "../controllers/appointmentController.js";
import {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";

const router = express.Router();

// Public route
router.post("/login", loginAdmin);

// Logout route - clears cookie
router.post("/logout", logoutAdmin);

// Route to check admin authentication
router.get("/profile", protect, getAdminProfile);

// Protected admin routes
router.get("/appointments/all", protect, getAllAppointments);
router.patch("/appointments/:id/status", protect, updateAppointmentStatus);
router.get("/dashboard", protect, getAdminStats);
router.delete("/appointments/:id", protect, deleteAppointment);

export default router;
