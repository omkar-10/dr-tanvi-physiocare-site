import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Check,
  X,
  ChevronLeft,
  Loader2,
  Filter,
  MoreVertical,
  Clock,
  ChevronDown,
} from "lucide-react";
import api from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedReasons, setExpandedReasons] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const statusOptions = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((appt) => appt.status === statusFilter)
      );
    }
  }, [appointments, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/appointments/all");
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Could not load appointments");
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/admin/appointments/${id}/status`, {
        status: newStatus,
      });
      toast.success(`Status updated to ${newStatus}`);
      fetchAppointments();
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirm) return;

    try {
      setDeletingId(id);
      await api.delete(`/admin/appointments/${id}`);
      toast.success("Appointment deleted successfully");
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      toast.error("Failed to delete appointment");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleReasonExpansion = (id) => {
    setExpandedReasons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const statusConfig = {
    Pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <Clock className="w-4 h-4" />,
      dot: "🟡",
    },
    Confirmed: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Check className="w-4 h-4" />,
      dot: "🔵",
    },
    Completed: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <Check className="w-4 h-4" />,
      dot: "🟢",
    },
    Cancelled: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <X className="w-4 h-4" />,
      dot: "🔴",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navbar Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logo} alt="Clinic Logo" className="h-10 w-auto mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Appointments</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="btn btn-ghost hover:bg-blue-50 text-blue-600"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
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
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Appointments
              </h1>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline flex items-center gap-2 hover:bg-white hover:shadow-md"
              >
                <Filter className="w-4 h-4" />
                <span>Filter: {statusFilter}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200"
                  >
                    <div className="py-1">
                      {statusOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setStatusFilter(option);
                            setShowFilters(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                            statusFilter === option
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <X className="w-6 h-6" />
              <span>{error}</span>
            </div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-white shadow-lg max-w-2xl mx-auto"
          >
            <div className="card-body items-center text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mb-4" />
              <h2 className="card-title text-gray-700 text-2xl">
                No {statusFilter === "All" ? "" : statusFilter} Appointments
                Found
              </h2>
              <p className="text-gray-500 mb-6">
                {statusFilter === "All"
                  ? "There are currently no appointments scheduled"
                  : `No ${statusFilter.toLowerCase()} appointments found`}
              </p>
              <button
                onClick={() => setStatusFilter("All")}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAppointments.map((appointment) => {
                const isFinal =
                  appointment.status === "Completed" ||
                  appointment.status === "Cancelled";
                const status = statusConfig[appointment.status] || {
                  color: "bg-gray-100 text-gray-800 border-gray-200",
                  icon: null,
                  dot: "⚪",
                };

                return (
                  <motion.div
                    key={appointment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="card bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
                  >
                    <div className="card-body p-6">
                      {/* Status and Actions */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`badge ${status.color} gap-2 border`}>
                          <span className="text-lg">{status.dot}</span>
                          {status.icon}
                          {appointment.status}
                        </div>
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-xs m-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-40 border border-gray-200"
                          >
                            <li>
                              <Link
                                to={`/admin/appointments/edit/${appointment._id}`}
                                className="text-gray-700 hover:bg-gray-50"
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(appointment._id)}
                                className="text-red-600 hover:bg-red-50"
                                disabled={deletingId === appointment._id}
                              >
                                {deletingId === appointment._id ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Deleting...
                                  </span>
                                ) : (
                                  "Delete"
                                )}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Patient Details */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-full">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.email}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {appointment.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-gray-700">
                              Reason:
                            </p>
                            <button
                              onClick={() =>
                                toggleReasonExpansion(appointment._id)
                              }
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {expandedReasons[appointment._id]
                                ? "Show less"
                                : "Read more"}
                            </button>
                          </div>
                          <p
                            className={`text-gray-600 text-sm break-words ${
                              expandedReasons[appointment._id]
                                ? ""
                                : "line-clamp-2"
                            }`}
                          >
                            {appointment.reason}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              Follow-Up:
                            </span>
                            <span
                              className={`badge badge-sm ${
                                appointment.isFollowUp
                                  ? "badge-success"
                                  : "badge-neutral"
                              }`}
                            >
                              {appointment.isFollowUp ? "Yes" : "No"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {appointment.slot}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {!isFinal && (
                        <div className="card-actions justify-end mt-6">
                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                updateStatus(appointment._id, "Confirmed")
                              }
                              className={`btn btn-sm ${
                                appointment.status === "Confirmed"
                                  ? "btn-disabled"
                                  : "btn-primary shadow-md"
                              }`}
                              disabled={appointment.status === "Confirmed"}
                            >
                              Confirm
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                updateStatus(appointment._id, "Completed")
                              }
                              className="btn btn-sm btn-success shadow-md"
                            >
                              Complete
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                updateStatus(appointment._id, "Cancelled")
                              }
                              className="btn btn-sm btn-error shadow-md"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAppointments;
