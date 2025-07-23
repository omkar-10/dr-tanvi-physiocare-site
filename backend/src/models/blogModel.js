// models/blogModel.js
import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      public_id: String,
      url: String,
    },
    author: {
      type: String,
      default: "Dr. Tanvi",
    },
    tags: {
      type: [String], // array of strings
      default: [],
    },
    category: {
      type: String,
      default: "General", // can be something like 'Physiotherapy', etc.
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title
blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
