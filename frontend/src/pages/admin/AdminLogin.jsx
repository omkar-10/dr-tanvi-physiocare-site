import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import api from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/admin/login", { email, password });
      toast.success("Login successful");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Logo and Welcome Section */}
          <div className="flex flex-col items-center pt-8 pb-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-4"
            >
              <img
                src={logo}
                alt="Clinic Logo"
                className="w-24 h-24 object-contain"
              />
            </motion.div>
            <h1 className="text-xl font-semibold text-gray-700">
              Welcome, Dr. Tanvi Dhavale
            </h1>
          </div>

          <div className="px-8 pb-8">
            {/* Email Field - Fixed Alignment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field - Fixed Alignment */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-sm text-gray-600">
              Secure access to clinic administration panel
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
