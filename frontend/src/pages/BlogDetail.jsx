// src/pages/BlogDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import api from "../utils/axiosInstance";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error(
          "Error fetching blog:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Blog Not Found</h2>
        <a
          href="/blogs"
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <div className="mb-8">
        <a
          href="/blogs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Articles
        </a>
      </div>

      {/* Blog Title & Meta */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{blog.title}</h1>
        <p className="text-sm text-gray-500 flex items-center gap-3">
          <CalendarDays className="w-4 h-4" />
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <Clock className="w-4 h-4 ml-4" />
          {Math.ceil(blog.content.length / 1000)} min read
        </p>
      </header>

      {/* Cover Image */}
      <div className="aspect-video rounded-lg overflow-hidden shadow mb-10">
        <img
          src={blog.coverImage?.url || "/fallback.jpg"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <article
        className="prose prose-lg max-w-none prose-blue"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Scroll to top */}
      <div className="fixed bottom-6 right-6">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5 rotate-90" />
        </motion.button>
      </div>
    </div>
  );
};

export default BlogDetail;
