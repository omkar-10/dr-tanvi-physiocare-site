import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Image, FileText, Tag, Loader2 } from "lucide-react";
import api from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";

const EditBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        const blog = res.data;

        setTitle(blog.title);
        setContent(blog.content);
        setCategory(blog.category);
        setTags(blog.tags?.join(", "));
        setExistingImageUrl(blog.coverImage?.url || null);
      } catch (err) {
        console.error("Error fetching blog:", err.response || err.message);
        toast.error(err.response?.data?.message || "Failed to load blog");
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      return toast.error("Please select an image file");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image must be less than 5MB");
    }

    setCoverImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      setLoading(true);
      await api.patch(`/blogs/${slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
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
              <h1 className="text-xl font-bold text-gray-800">Edit Blog</h1>
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
              Update Blog Post
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blog Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Blog Title*
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Cover Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Cover Image
                  </span>
                </label>
                <label className="btn btn-outline">
                  <Image className="w-5 h-5 mr-2" />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <div className="mt-4">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="New Preview"
                      className="max-h-80 w-full object-cover rounded-lg"
                    />
                  ) : existingImageUrl ? (
                    <img
                      src={existingImageUrl}
                      alt="Current"
                      className="max-h-80 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="p-4 border border-dashed text-center text-gray-500">
                      No image selected
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Content*
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-64"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Category and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-medium">
                      Category*
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-medium">Tags</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. pain, health"
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Separate tags with commas
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Blog"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default EditBlog;
