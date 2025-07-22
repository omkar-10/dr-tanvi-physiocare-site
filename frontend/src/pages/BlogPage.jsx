import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, Tag, Search, X } from "lucide-react";
import api from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import striptags from "striptags";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/blogs");
        setBlogs(res.data.blogs.reverse());
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();

    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt &&
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.content &&
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get search suggestions
  const searchSuggestions = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  // Pagination logic
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Color variants for categories
  const categoryColors = {
    default:
      "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 border-blue-200",
    wellness:
      "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800 border-emerald-200",
    treatment:
      "bg-gradient-to-br from-purple-100 to-purple-50 text-purple-800 border-purple-200",
    exercise:
      "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800 border-amber-200",
    pain: "bg-gradient-to-br from-rose-100 to-rose-50 text-rose-800 border-rose-200",
    recovery:
      "bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-800 border-indigo-200",
  };

  // Color variants for tags
  const tagColors = [
    "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 border-blue-200",
    "bg-gradient-to-br from-green-100 to-green-50 text-green-800 border-green-200",
    "bg-gradient-to-br from-purple-100 to-purple-50 text-purple-800 border-purple-200",
    "bg-gradient-to-br from-pink-100 to-pink-50 text-pink-800 border-pink-200",
    "bg-gradient-to-br from-orange-100 to-orange-50 text-orange-800 border-orange-200",
    "bg-gradient-to-br from-teal-100 to-teal-50 text-teal-800 border-teal-200",
  ];

  const getCategoryColor = (category) => {
    const lowerCaseCategory = category?.toLowerCase();
    return categoryColors[lowerCaseCategory] || categoryColors.default;
  };

  const getTagColor = (index) => {
    return tagColors[index % tagColors.length];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Header - Modern Version */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Expert Insights
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Discover the latest in physiotherapy, pain management, and wellness
            from Dr. Tanvi
          </p>

          <div className="relative max-w-2xl mx-auto" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 10 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                  style={{
                    left: 0,
                    right: 0,
                    width: "100%", // Ensure full width alignment
                  }}
                >
                  <ul className="divide-y divide-gray-100">
                    {searchSuggestions.map((blog) => (
                      <li
                        key={blog._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <Link
                          to={`/blogs/${blog.slug}`}
                          className="block px-4 py-3"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {/* Thumbnail image */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                              <img
                                src={
                                  blog?.coverImage?.url ||
                                  "https://via.placeholder.com/600x400?text=No+Image"
                                }
                                alt={blog.title || "Blog Cover"}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Text content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 truncate">
                                {blog.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                {blog.excerpt ||
                                  striptags(blog.content).slice(0, 80)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Featured Blog */}
      {blogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Article
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <div className="md:flex">
              {/* Fixed height container for the image */}
              <div className="md:w-1/2 relative h-80 md:h-auto">
                <motion.img
                  src={
                    blogs[0]?.coverImage?.url ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={blogs[0].title || "Blog Cover"}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(blogs[0].createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(blogs[0].content.length / 1000)} min read
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {blogs[0].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {blogs[0].excerpt ||
                    striptags(blogs[0].content).slice(0, 200) + "..."}
                </p>
                <Link
                  to={`/blogs/${blogs[0].slug}`}
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  Read Featured Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Grid Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Latest Articles
          {searchQuery && (
            <span className="text-base font-normal text-gray-500 ml-2">
              ({filteredBlogs.length} results)
            </span>
          )}
        </h2>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(blogsPerPage)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear search
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Blog Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {currentBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  variants={item}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100"
                >
                  <div className="relative overflow-hidden h-60">
                    <motion.img
                      src={
                        blog?.coverImage?.url ||
                        "https://via.placeholder.com/600x400?text=No+Image"
                      }
                      alt={blog.title || "Blog Cover"}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.ceil(blog.content.length / 1000)} min read
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt ||
                        striptags(blog.content).slice(0, 150) + "..."}
                    </p>

                    {blog.category && (
                      <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                          blog.category
                        )} border shadow-sm`}
                      >
                        {blog.category}
                      </motion.span>
                    )}

                    {blog.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(blog.tags)
                          ? blog.tags
                          : JSON.parse(blog.tags)
                        )
                          .slice(0, 3)
                          .map((tag, index) => (
                            <motion.span
                              key={tag}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.1 * index + 0.3 }}
                              whileHover={{ scale: 1.05 }}
                              className={`px-3 py-1 text-xs rounded-full ${getTagColor(
                                index
                              )} border flex items-center gap-1 shadow-sm`}
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </motion.span>
                          ))}
                      </div>
                    )}

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group transition-colors"
                    >
                      Read more
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-16 gap-2"
            >
              {currentPage > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 flex items-center gap-1 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Previous
                </motion.button>
              )}

              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${
                    currentPage === i + 1
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}

              {currentPage < totalPages && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 flex items-center gap-1 shadow-sm"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;
