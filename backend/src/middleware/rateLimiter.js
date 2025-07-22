import rateLimit from "express-rate-limit";

export const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit per IP
  message: "rate-limit", // we will catch this and show custom page
  standardHeaders: true,
  legacyHeaders: false,
});
