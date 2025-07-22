// src/AdminProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./utils/axiosInstance.js"; // adjust path if needed
import toast from "react-hot-toast";

const AdminProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/admin/profile", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error in AdminProtectedRoute: ", error);
        toast.error("Unauthorized! Please login.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default AdminProtectedRoute;
