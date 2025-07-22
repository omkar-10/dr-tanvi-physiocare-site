import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Dr. Tanvi's PhysioCare" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Email send error:", error.message);
  }
};
