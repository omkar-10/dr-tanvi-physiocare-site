import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js"; // Multer middleware for image upload

const router = express.Router();

// 📖 Public Routes
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// ✍️ Admin Routes (protected)
router.post("/", protect, upload.single("coverImage"), createBlog);
router.patch("/:slug", protect, upload.single("coverImage"), updateBlog);
router.delete("/:slug", protect, deleteBlog);

export default router;
