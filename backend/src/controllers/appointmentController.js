import Appointment from "../models/appointmentModel.js";
import { sendEmail } from "../utils/emailService.js";
import Blog from "../models/blogModel.js";

const allSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
];

export const bookAppointment = async (req, res) => {
  try {
    const { name, phone, email, date, slot, reason, isFollowUp } = req.body;

    const allSlots = [
      "8:00 AM - 9:00 AM",
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "4:00 PM - 5:00 PM",
      "5:00 PM - 6:00 PM",
      "6:00 PM - 7:00 PM",
    ];

    // ✅ Validate slot
    if (!allSlots.includes(slot)) {
      return res.status(400).json({ message: "Invalid time slot" });
    }

    // ✅ Parse date string to UTC
    const [year, month, day] = date.split("-");
    const selectedDate = new Date(Date.UTC(+year, +month - 1, +day));

    const now = new Date();
    const utcToday = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const maxDate = new Date(utcToday);
    maxDate.setUTCDate(maxDate.getUTCDate() + 7);

    // ✅ Check booking date range
    if (selectedDate < utcToday || selectedDate > maxDate) {
      return res.status(400).json({
        message: "Appointments can only be booked up to 7 days in advance.",
      });
    }

    // ✅ Check if slot already booked on that day
    const startOfDay = new Date(selectedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existing = await Appointment.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      slot,
    });

    if (existing) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    // ✅ Prevent duplicate active bookings
    const alreadyHasAppointment = await Appointment.findOne({
      $or: [{ email }, { phone }],
      status: { $in: ["Pending", "Confirmed"] },
      date: { $gte: utcToday },
    });

    if (alreadyHasAppointment) {
      return res.status(409).json({
        message:
          "You already have a pending home visit appointment. Please call Dr. Tanvi at +91 77158 74320 to update or reschedule.",
      });
    }

    // ✅ Save appointment
    const appointment = new Appointment({
      name,
      phone,
      email,
      date: selectedDate,
      slot,
      reason,
      isFollowUp,
    });

    await appointment.save();

    // Send confirmation email to patient
    if (email) {
      await sendEmail({
        to: email,
        subject: "Appointment Confirmation – Dr. Tanvi's PhysioCare",
        html: ` 
    <body style="background-color: #ffffff; padding: 40px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333;">
      <div style="background-color: #ffffff; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 4px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        
        <!-- Header with Logo and Medical Theme -->
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f0f0f0; padding-bottom: 20px;">
          <img src="${
            process.env.LOGO_URL
          }" alt="Dr. Tanvi's PhysioCare Logo" style="max-height: 70px;" />
          <h2 style="color: #2a5c8d; margin-bottom: 5px; font-weight: 600; letter-spacing: 0.5px;">Dr. Tanvi's PhysioCare</h2>
          <p style="color: #6c757d; font-size: 14px; margin-top: 0;">Specialized Physiotherapy & Rehabilitation</p>
        </div>

        <!-- Greeting -->
        <p style="margin-bottom: 20px;">Dear <strong style="color: #2a5c8d;">${name}</strong>,</p>

        <!-- Main Content -->
        <p style="margin-bottom: 20px;">Thank you for booking your appointment with us. Your appointment details are confirmed as follows:</p>

        <!-- Appointment Info Box -->
        <div style="background-color: #f8f9fa; border-left: 4px solid #2a5c8d; padding: 15px; margin-bottom: 25px;">
          <h3 style="color: #2a5c8d; margin-top: 0; font-size: 16px;">Appointment Details</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; width: 120px; color: #6c757d;">Date:</td>
              <td style="padding: 6px 0; font-weight: 500;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Time:</td>
              <td style="padding: 6px 0; font-weight: 500;">${slot}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Reason:</td>
              <td style="padding: 6px 0; font-weight: 500;">${reason}</td>
            </tr>
          </table>
        </div>

        <!-- Instructions -->
        <p style="margin-bottom: 15px;">Please arrive 10 minutes prior to your scheduled time. Bring any relevant medical reports or scans with you.</p>
        
        <!-- Contact Info -->
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 25px 0; text-align: center;">
          <p style="margin: 5px 0; color: #2a5c8d; font-weight: 500;">Need to reschedule or have questions?</p>
          <p style="margin: 5px 0;"><span style="color: #6c757d;">Call us at</span> +91 77158 74320</p>
          <p style="margin: 5px 0;"><span style="color: #6c757d;">Clinic address:</span> Mira Road (E), Thane</p>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #f0f0f0; padding-top: 20px; text-align: center; font-size: 13px; color: #6c757d;">
          <p style="margin-bottom: 5px;">© ${new Date().getFullYear()} Dr. Tanvi's PhysioCare. All rights reserved.</p>
          <p style="margin: 5px 0;">This is an automated message - please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
  `,
      });
    }

    // Send notification to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "📋 New Appointment Booking – Dr. Tanvi’s PhysioCare",
      html: `
    <body style="background-color: #ffffff; padding: 40px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.5; color: #333;">
      <div style="background-color: #ffffff; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 4px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f0f0f0; padding-bottom: 20px;">
          <img src="${
            process.env.LOGO_URL
          }" alt="Dr. Tanvi's PhysioCare Logo" style="max-height: 70px;" />
          <h2 style="color: #2a5c8d; margin-bottom: 5px; font-weight: 600;">New Appointment Alert</h2>
          <p style="color: #6c757d; font-size: 14px; margin-top: 0;">Physiotherapy Booking Notification</p>
        </div>

        <!-- Alert Message -->
        <div style="background-color: #f8fafc; border-left: 4px solid #2a5c8d; padding: 12px 15px; margin-bottom: 25px;">
          <p style="margin: 0; font-weight: 500; color: #2a5c8d;">A new appointment has been booked:</p>
        </div>

        <!-- Patient Details Card -->
        <div style="background-color: #f9f9f9; border-radius: 4px; padding: 15px; margin-bottom: 20px;">
          <h3 style="color: #2a5c8d; margin-top: 0; margin-bottom: 15px; font-size: 16px;">Patient Information</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; width: 100px; color: #6c757d;">Name:</td>
              <td style="padding: 6px 0; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Phone:</td>
              <td style="padding: 6px 0; font-weight: 500;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Email:</td>
              <td style="padding: 6px 0; font-weight: 500;">${
                email || "Not provided"
              }</td>
            </tr>
          </table>
        </div>

        <!-- Appointment Details Card -->
        <div style="background-color: #f9f9f9; border-radius: 4px; padding: 15px; margin-bottom: 25px;">
          <h3 style="color: #2a5c8d; margin-top: 0; margin-bottom: 15px; font-size: 16px;">Appointment Details</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 6px 0; width: 100px; color: #6c757d;">Date:</td>
              <td style="padding: 6px 0; font-weight: 500;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Time Slot:</td>
              <td style="padding: 6px 0; font-weight: 500;">${slot}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Reason:</td>
              <td style="padding: 6px 0; font-weight: 500;">${reason}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6c757d;">Follow-Up:</td>
              <td style="padding: 6px 0; font-weight: 500;">${
                isFollowUp ? "Yes" : "No"
              }</td>
            </tr>
          </table>
        </div>

        <!-- Action Button -->
        <div style="text-align: center; margin: 25px 0;">
          <a href="${
            process.env.ADMIN_PANEL_URL
          }" style="display: inline-block; background-color: #2a5c8d; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;">View in Admin Panel</a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #f0f0f0; padding-top: 20px; text-align: center; font-size: 13px; color: #6c757d;">
          <p style="margin-bottom: 5px;">© ${new Date().getFullYear()} Dr. Tanvi's PhysioCare</p>
          <p style="margin: 5px 0;">Automated notification - Do not reply to this email</p>
        </div>
      </div>
    </body>
  `,
    });
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/appointments/available-slots?date=YYYY-MM-DD
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    // Ensure we're querying full 24-hour range
    const start = new Date(date); // e.g., 2025-07-18
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);

    console.log("Start:", start.toISOString());
    console.log("End:", end.toISOString());

    const booked = await Appointment.find({
      date: { $gte: start, $lte: end },
    });

    const bookedSlots = booked.map((a) => a.slot);

    const allSlots = [
      "8:00 AM - 9:00 AM",
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "4:00 PM - 5:00 PM",
      "5:00 PM - 6:00 PM",
      "6:00 PM - 7:00 PM",
    ];

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    console.log("Booked Slots:", bookedSlots);
    console.log("Available Slots:", availableSlots);

    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error("Get Slots Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/appointments/admin/all
export const getAllAppointments = async (req, res) => {
  try {
    const {
      date,
      slot,
      email,
      phone,
      isFollowUp,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (date) query.date = date;
    if (slot) query.slot = slot;
    if (email) query.email = { $regex: new RegExp(email, "i") };
    if (phone) query.phone = { $regex: new RegExp(phone, "i") };
    if (isFollowUp !== undefined) query.isFollowUp = isFollowUp === "true";

    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .sort({ date: 1, slot: 1 })
        .skip(skip)
        .limit(Number(limit)),
      Appointment.countDocuments(query),
    ]);

    res.status(200).json({
      appointments,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/appointments/admin/:id/status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (["Confirmed", "Completed", "Cancelled"].includes(status)) {
      await sendEmail({
        to: appointment.email,
        subject: `Appointment ${status} – Dr. Tanvi's PhysioCare`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f7f7f7;">
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding: 20px 0;"><![endif]-->
  <div style="max-width: 600px; margin: 0 auto; padding: 20px 0;">
    <!-- Email Container -->
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
      <!-- Header -->
      <tr>
        <td style="padding: 30px 20px; text-align: center; border-bottom: 1px solid #f0f0f0;">
          <img src="${
            process.env.LOGO_URL
          }" alt="Dr. Tanvi's PhysioCare" width="150" style="max-width: 150px; height: auto;">
          <h1 style="color: #2a5c8d; font-size: 22px; margin: 10px 0 5px; font-weight: 600;">Dr. Tanvi's PhysioCare</h1>
          <p style="color: #6c757d; font-size: 14px; margin: 0;">Specialized Physiotherapy & Rehabilitation</p>
        </td>
      </tr>
      
      <!-- Greeting -->
      <tr>
        <td style="padding: 25px 20px 0;">
          <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6;">Dear <strong style="color: #2a5c8d;">${
            appointment.name
          }</strong>,</p>
        </td>
      </tr>
      
      <!-- Status Card -->
      <tr>
        <td style="padding: 0 20px;">
          <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-left: 4px solid ${
            status === "Confirmed"
              ? "#28a745"
              : status === "Completed"
              ? "#17a2b8"
              : "#dc3545"
          };">
            <tr>
              <td style="padding: 15px;">
                <h2 style="color: ${
                  status === "Confirmed"
                    ? "#28a745"
                    : status === "Completed"
                    ? "#17a2b8"
                    : "#dc3545"
                }; margin: 0 0 10px; font-size: 18px;">Appointment ${status}</h2>
                <p style="margin: 0 0 15px; font-size: 15px;">Your appointment has been <strong>${status.toLowerCase()}</strong>:</p>
                
                <!-- Appointment Details -->
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td width="30%" style="padding: 5px 0; color: #6c757d; font-size: 14px;">Date:</td>
                    <td width="70%" style="padding: 5px 0; font-weight: 500; font-size: 15px;">${new Date(
                      appointment.date
                    ).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #6c757d; font-size: 14px;">Time:</td>
                    <td style="padding: 5px 0; font-weight: 500; font-size: 15px;">${
                      appointment.slot
                    }</td>
                  </tr>
                  ${
                    appointment.reason
                      ? `<tr>
                          <td style="padding: 5px 0; color: #6c757d; font-size: 14px;">Reason:</td>
                          <td style="padding: 5px 0; font-weight: 500; font-size: 15px;">${appointment.reason}</td>
                        </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <!-- Status-Specific Message -->
      <tr>
        <td style="padding: 20px;">
          <p style="margin: 0 0 15px; font-size: 15px; line-height: 1.6;">
            ${
              status === "Confirmed"
                ? "Your home physiotherapy session is confirmed. The therapist will arrive at the scheduled time. Kindly ensure medical documents are available and a suitable space is prepared."
                : status === "Cancelled"
                ? "If this cancellation was unexpected or you'd like to reschedule, please contact us below."
                : "Thank you for choosing Dr. Tanvi's PhysioCare. We hope your treatment was beneficial."
            }
          </p>
        </td>
      </tr>
      
      <!-- Contact Info -->
      <tr>
        <td style="padding: 0 20px 25px;">
          <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 4px; text-align: center;">
            <tr>
              <td style="padding: 15px;">
                <p style="margin: 0 0 5px; color: #2a5c8d; font-weight: 500; font-size: 15px;">Need to reschedule or have questions?</p>
                <p style="margin: 10px 0; font-size: 15px;"><span style="color: #6c757d;">Call:</span> +91 77158 74320</p>
                <p style="margin: 10px 0 0; font-size: 15px;"><span style="color: #6c757d;">Address:</span> Mira Road (E), Thane</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <!-- Footer -->
      <tr>
        <td style="padding: 20px; text-align: center; border-top: 1px solid #f0f0f0;">
          <p style="margin: 0 0 5px; color: #6c757d; font-size: 13px;">© ${new Date().getFullYear()} Dr. Tanvi's PhysioCare</p>
          <p style="margin: 0; color: #6c757d; font-size: 13px;">Automated message - Please don't reply</p>
        </td>
      </tr>
    </table>
  </div>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>
        `,
      });
    }

    res
      .status(200)
      .json({ message: "Status updated and mail sent", appointment });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();

    const totalBlogs = await Blog.countDocuments(); // ✅ Blog count added

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAppointments = await Appointment.countDocuments({ date: today });

    const followUps = await Appointment.countDocuments({ isFollowUp: true });

    const slotStats = await Appointment.aggregate([
      { $group: { _id: "$slot", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const mostPopularSlot = slotStats[0]?._id || "N/A";

    const upcomingAppointments = await Appointment.find({
      date: { $gte: today },
    })
      .sort({ date: 1, slot: 1 })
      .limit(3);

    res.status(200).json({
      totalAppointments,
      totalBlogs, // ✅ Include it in response
      todayAppointments,
      followUps,
      mostPopularSlot,
      upcomingAppointments,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
