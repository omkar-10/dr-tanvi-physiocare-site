import Blog from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";

// Create Blog Post (Admin only)
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    let coverImage = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "tanvi-blogs",
      });
      coverImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const blog = await Blog.create({ title, content, author, coverImage });

    res.status(201).json({ message: "Blog created", blog });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Blogs (Public)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Blog by Slug (Public)
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Blog (Admin)
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    if (req.file) {
      if (blog.coverImage?.public_id) {
        await cloudinary.uploader.destroy(blog.coverImage.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "tanvi-blogs",
      });
      blog.coverImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await blog.save();
    res.status(200).json({ message: "Blog updated", blog });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Blog (Admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.coverImage?.public_id) {
      await cloudinary.uploader.destroy(blog.coverImage.public_id);
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
