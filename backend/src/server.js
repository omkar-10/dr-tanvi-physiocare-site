import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Working");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
