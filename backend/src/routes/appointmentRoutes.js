import express from "express";
import {
  bookAppointment,
  getAvailableSlots,
} from "../controllers/appointmentController.js";
import { appointmentLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public: Book a new appointment
router.post("/book", appointmentLimiter, bookAppointment);

// Public: Get available slots
router.get("/available-slots", getAvailableSlots);

export default router;
