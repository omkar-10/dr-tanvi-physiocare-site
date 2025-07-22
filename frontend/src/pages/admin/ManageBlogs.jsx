import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Edit3,
  Trash2,
  ArrowLeft,
  Loader2,
  Tag,
  CalendarDays,
} from "lucide-react";
import api from "../../utils/axiosInstance.js";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.png"; // Import your logo

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs");
      setBlogs(res.data.blogs.reverse());
    } catch (err) {
      toast.error("Failed to fetch blogs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      setDeleting(slug);
      await api.delete(`/blogs/${slug}`);
      toast.success("Blog deleted successfully");
      setBlogs((prev) => prev.filter((blog) => blog.slug !== slug));
    } catch (err) {
      toast.error("Error deleting blog");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navbar Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo} alt="Clinic Logo" className="h-10 w-auto mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Manage Blogs</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="btn btn-ghost hover:bg-blue-50 text-blue-600"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <Bookmark className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="card bg-white shadow-lg">
            <div className="card-body items-center text-center">
              <Bookmark className="w-12 h-12 text-gray-400" />
              <h2 className="card-title text-gray-700">No Blogs Found</h2>
              <p className="text-gray-500">You haven't created any blogs yet</p>
              <Link to="/admin/blogs/new" className="btn btn-primary mt-4">
                Create New Blog
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <figure className="relative">
                    <img
                      src={blog.coverImage?.url || "/placeholder-blog.jpg"}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-primary">
                        {blog.category}
                      </span>
                    </div>
                  </figure>
                  <div className="card-body">
                    <div className="flex items-start justify-between">
                      <h2 className="card-title text-lg">{blog.title}</h2>
                      <div className="flex space-x-1">
                        <Link
                          to={`/admin/blogs/edit/${blog.slug}`}
                          className="btn btn-ghost btn-sm text-blue-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.slug)}
                          className="btn btn-ghost btn-sm text-red-600"
                          disabled={deleting === blog.slug}
                        >
                          {deleting === blog.slug ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge badge-outline badge-sm flex items-center"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>

                    <p className="text-gray-600 line-clamp-3 mt-2">
                      {blog.content.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageBlogs;
