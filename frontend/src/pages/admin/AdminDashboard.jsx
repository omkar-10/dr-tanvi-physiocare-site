import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  FileText,
  PlusCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import api from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png"; // Import your logo

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
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
              <h1 className="text-xl font-bold text-gray-800">Clinic Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="btn btn-ghost hover:bg-red-50 text-red-600"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <LayoutDashboard className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <CalendarDays className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="card-title text-gray-700">
                    Total Appointments
                  </h2>
                  {loading ? (
                    <div className="skeleton h-8 w-16"></div>
                  ) : (
                    <p className="text-4xl font-bold text-blue-800">
                      {stats.totalAppointments}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card bg-gradient-to-br from-green-100 to-green-50 shadow-lg"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="card-title text-gray-700">Total Blogs</h2>
                  {loading ? (
                    <div className="skeleton h-8 w-16"></div>
                  ) : (
                    <p className="text-4xl font-bold text-green-800">
                      {stats.totalBlogs}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/admin/appointments"
              className="card bg-white shadow-lg hover:shadow-xl border border-blue-200 hover:border-blue-300 transition-all"
            >
              <div className="card-body items-center text-center">
                <CalendarDays className="w-10 h-10 text-blue-600 mb-3" />
                <h2 className="card-title text-blue-700">
                  Manage Appointments
                </h2>
                <p className="text-gray-500">
                  View and manage patient appointments
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/admin/blogs"
              className="card bg-white shadow-lg hover:shadow-xl border border-green-200 hover:border-green-300 transition-all"
            >
              <div className="card-body items-center text-center">
                <FileText className="w-10 h-10 text-green-600 mb-3" />
                <h2 className="card-title text-green-700">Manage Blogs</h2>
                <p className="text-gray-500">Edit and organize blog content</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/admin/blogs/new"
              className="card bg-white shadow-lg hover:shadow-xl border border-purple-200 hover:border-purple-300 transition-all"
            >
              <div className="card-body items-center text-center">
                <PlusCircle className="w-10 h-10 text-purple-600 mb-3" />
                <h2 className="card-title text-purple-700">Add New Blog</h2>
                <p className="text-gray-500">
                  Create fresh content for your audience
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
