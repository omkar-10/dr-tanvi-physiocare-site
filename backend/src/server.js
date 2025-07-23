import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://drtanviphysio.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/blogs", blogRoutes);

// Global error handler for rate limiting and others
app.use((err, req, res, next) => {
  if (err.message === "rate-limit") {
    return res.status(429).send(`
      <html>
        <head>
          <title>Too Many Requests</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              padding: 50px;
              text-align: center;
              color: #333;
            }
            .box {
              max-width: 500px;
              margin: auto;
              padding: 30px;
              border: 1px solid #ddd;
              border-radius: 10px;
              background: white;
              box-shadow: 0 0 10px rgba(0,0,0,0.05);
            }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>🚫 Too Many Requests</h1>
            <p>You have reached the maximum number of appointment attempts.</p>
            <p>Please try again after one hour.</p>
          </div>
        </body>
      </html>
    `);
  }

  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on PORT: ${PORT}`);
  });
});
