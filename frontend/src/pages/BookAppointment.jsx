import { useState, useEffect } from "react";
import api from "../utils/axiosInstance.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  ClipboardList,
  ChevronDown,
  Loader2,
  CheckCircle,
  ChevronUp,
} from "lucide-react";

const allSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
];

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: null,
    slot: "",
    reason: "",
    isFollowUp: false,
  });

  const [availableSlots, setAvailableSlots] = useState(allSlots);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSlotDropdown, setShowSlotDropdown] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!form.date) {
        setAvailableSlots(allSlots);
        return;
      }

      try {
        const dateStr = form.date.toLocaleDateString("en-CA");
        const res = await api.get(
          `/appointments/available-slots?date=${dateStr}`
        );
        setAvailableSlots(
          Array.isArray(res.data.availableSlots) ? res.data.availableSlots : []
        );
      } catch (err) {
        console.error(
          "Error fetching slots",
          err.response?.data || err.message
        );
        toast.error(
          err.response?.data?.message || "Could not fetch available slots."
        );
        setAvailableSlots([]);
        // console.error("Error fetching slots", err);
        // toast.error("Could not fetch available slots.");
        // setAvailableSlots([]);
      }
    };

    fetchSlots();
  }, [form.date]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSlotSelect = (slot) => {
    setForm({ ...form, slot });
    setShowSlotDropdown(false);
  };

  const isPastTimeSlot = () => {
    if (!form.date || !form.slot) return false;

    const selectedDate = new Date(form.date);
    const today = new Date();

    if (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    ) {
      const slotStart = form.slot.split(" - ")[0]; // "4:00 PM"
      const slotDateTime = new Date(
        selectedDate.toDateString() + " " + slotStart
      );
      const now = new Date();
      if (slotDateTime < now) {
        return true;
      }
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.date ||
      !form.slot ||
      !form.reason.trim()
    ) {
      return toast.error(
        "Please fill all required fields including the reason for appointment"
      );
    }

    if (isPastTimeSlot()) {
      return toast.error(
        "Selected time slot has already passed. Please choose a future slot."
      );
    }

    try {
      setLoading(true);
      await api.post("/appointments/book", {
        ...form,
        date: form.date.toLocaleDateString("en-CA"),
      });

      setSuccess(true);
      toast.success("Appointment booked successfully!");

      setTimeout(() => {
        setForm({
          name: "",
          phone: "",
          email: "",
          date: null,
          slot: "",
          reason: "",
          isFollowUp: false,
        });
        setSuccess(false);
      }, 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again later.";

      if (msg.includes("You already have an active appointment")) {
        toast.error(
          "You already have a pending appointment. Please call us to reschedule or cancel."
        );
      } else if (msg.includes("only be booked up to 7 days in advance")) {
        toast.error("Appointments can only be booked up to 7 days in advance.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4 py-8 md:py-12"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Book Your Appointment
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Schedule your personalized physiotherapy session with Dr. Tanvi
        </p>
      </motion.div>

      <motion.form
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
      >
        {/* Name */}
        <motion.div variants={item} className="space-y-2">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              required
            />
            <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div variants={item} className="space-y-2">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-500" />
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+91 9876543210"
              required
            />
            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={item} className="space-y-2">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
              required
            />
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Date */}
        <motion.div variants={item} className="space-y-2">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Select Date *
          </label>
          <div className="relative">
            <DatePicker
              selected={form.date}
              onChange={(date) => setForm({ ...form, date })}
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose a date"
              required
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Slot Dropdown */}
        <motion.div variants={item} className="space-y-2">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Select Time Slot *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSlotDropdown(!showSlotDropdown)}
              className={`input input-bordered w-full pl-10 pr-10 py-3 rounded-lg text-left flex items-center justify-between ${
                !form.slot ? "text-gray-400" : "text-gray-800"
              }`}
            >
              {form.slot || "Select a time slot"}
              {showSlotDropdown ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            <Clock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

            <AnimatePresence>
              {showSlotDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto">
                    {allSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotSelect(slot)}
                        disabled={!availableSlots.includes(slot)}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                          form.slot === slot ? "bg-blue-100" : ""
                        } ${
                          !availableSlots.includes(slot)
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{slot}</span>
                          {!availableSlots.includes(slot) && (
                            <span className="text-xs text-gray-400">
                              Booked
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Reason */}
        <motion.div variants={item} className="space-y-2">
          <label className="block font-medium text-gray-700 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-500" />
            Reason for Appointment *
          </label>
          <div className="relative">
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="textarea textarea-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Briefly describe your concern or symptoms"
              required
            ></textarea>
            <ClipboardList className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Follow-up */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <input
            type="checkbox"
            name="isFollowUp"
            checked={form.isFollowUp}
            onChange={handleChange}
            className="checkbox checkbox-primary checkbox-sm"
            id="followUpCheckbox"
          />
          <label
            htmlFor="followUpCheckbox"
            className="cursor-pointer text-gray-700"
          >
            This is a follow-up appointment
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={item} className="pt-2">
          <motion.button
            type="submit"
            className="btn btn-primary w-full mt-2 h-14 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
            disabled={loading || success}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing...
              </>
            ) : success ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Appointment Booked!
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5 mr-2" />
                Book My Appointment
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.section>
  );
};

export default BookAppointment;
