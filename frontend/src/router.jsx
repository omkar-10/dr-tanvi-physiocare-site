import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

// Public Pages
import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import ThankYou from "./pages/ThankYou";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import ServicesPage from "./pages/ServicesPage";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";

// Admin Layout + Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AddBlog from "./pages/admin/AddBlog"; // ✅ IMPORT NEW PAGE

// Admin Auth Protection
import AdminProtectedRoute from "./AdminProtectedRoute";
import ManageBlogs from "./pages/admin/ManageBlogs";
import EditBlog from "./pages/admin/EditBlog";
import ConditionsPage from "./pages/ConditionsPage";

export const router = createBrowserRouter([
  // Public Website Routes
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "book", element: <BookAppointment /> },
      { path: "blogs", element: <BlogPage /> },
      { path: "blogs/:slug", element: <BlogDetail /> },
      { path: "services", element: <ServicesPage /> },
      { path: "conditions", element: <ConditionsPage /> },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "thank-you", element: <ThankYou /> },
    ],
  },

  // Admin Login (Unprotected)
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // Protected Admin Routes with Layout
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      // Redirect /admin to /admin/dashboard
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },

      // Admin Subpages
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "appointments", element: <AdminAppointments /> },
      { path: "blogs", element: <ManageBlogs /> },
      { path: "blogs/new", element: <AddBlog /> }, // ✅ ADD THIS LINE
      { path: "blogs/edit/:slug", element: <EditBlog /> },
    ],
  },
]);
