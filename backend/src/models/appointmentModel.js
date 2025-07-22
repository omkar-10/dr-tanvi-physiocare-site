import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Enter a valid 10-digit phone number"],
    },
    email: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    slot: {
      type: String,
      required: true,
      enum: [
        "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "4:00 PM - 5:00 PM",
        "5:00 PM - 6:00 PM",
        "6:00 PM - 7:00 PM",
      ],
    },
    reason: {
      type: String,
      required: [true, "Reason for visit is required"],
      trim: true,
    },
    isFollowUp: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
