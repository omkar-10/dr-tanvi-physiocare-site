import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Image,
  FileText,
  Tag,
  Bookmark,
  Loader2,
} from "lucide-react";
import api from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png"; // Import your logo

const AddBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (
        previewImage &&
        typeof previewImage === "string" &&
        previewImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    setCoverImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !coverImage || !category) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("content", content);
    formData.append("category", category);
    formData.append(
      "tags",
      JSON.stringify(tags.split(",").map((tag) => tag.trim()))
    );

    try {
      setLoading(true);
      await api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog published successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error(error.response?.data?.message || "Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navbar Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo} alt="Clinic Logo" className="h-10 w-auto mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Add New Blog</h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-white shadow-lg"
        >
          <div className="card-body">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Create New Blog Post
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blog Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="form-control"
              >
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Blog Title*
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a compelling title..."
                  required
                />
              </motion.div>

              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="form-control"
              >
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Cover Image*
                  </span>
                </label>
                <div className="flex flex-col items-start gap-4">
                  <label className="btn btn-outline">
                    <Image className="w-5 h-5 mr-2" />
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </label>
                  {previewImage ? (
                    <div className="mt-2 w-full">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-80 w-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center w-full">
                      <Image className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-gray-500 mt-2">No image selected</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="form-control"
              >
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Content*
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-64 focus:ring-2 focus:ring-blue-200"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog content here..."
                  required
                />
              </motion.div>

              {/* Category and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="form-control"
                >
                  <label className="label">
                    <span className="label-text text-lg font-medium">
                      Category*
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-200"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Health, Wellness"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="form-control"
                >
                  <label className="label">
                    <span className="label-text text-lg font-medium">Tags</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-blue-200"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. pain, exercise, rehab"
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Separate tags with commas
                    </span>
                  </label>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    "Publish Blog"
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AddBlog;
