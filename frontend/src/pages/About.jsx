// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Rocket,
  Star,
} from "lucide-react";
import doctorImage from "../assets/dr-tanvi-1.jpg";
import HospitalCards from "../components/HospitalCards";
import CertificationsSection from "../components/CertificationsSection";

const GradientText = ({
  children,
  className = "",
  colors = ["#3b82f6", "#6366f1", "#8b5cf6"],
}) => {
  return (
    <span
      className={`bg-gradient-to-r ${colors
        .map((c) => `[--gradient-color:${c}]`)
        .join(" ")} 
      bg-clip-text text-transparent bg-[length:300%_100%] 
      animate-gradient bg-shift ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
      }}
    >
      {children}
    </span>
  );
};

const TimelineItem = ({ year, title, description, icon, color = "blue" }) => {
  const colors = {
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      border: "border-blue-200",
    },
    indigo: {
      bg: "bg-indigo-500",
      text: "text-indigo-500",
      border: "border-indigo-200",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-500",
      border: "border-purple-200",
    },
  }[color];

  return (
    <motion.div
      className="relative pl-12 pb-12 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Animated line */}
      <div
        className={`absolute left-6 top-0 h-full w-0.5 ${colors.bg} bg-opacity-20`}
      >
        <motion.div
          className={`absolute top-0 left-0 w-full h-0 ${colors.bg}`}
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>

      {/* Icon with glow effect */}
      <div
        className={`absolute left-0 top-0 w-12 h-12 rounded-full ${colors.bg} 
          flex items-center justify-center text-white shadow-lg group-hover:scale-110 
          transition-transform duration-300 z-10`}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {icon}
        </motion.div>
        <div
          className={`absolute inset-0 rounded-full ${colors.bg} opacity-0 
            group-hover:opacity-40 group-hover:scale-150 transition-all duration-500`}
        />
      </div>

      {/* Content */}
      <motion.div
        className={`ml-4 p-6 rounded-xl bg-white shadow-lg border-l-4 ${colors.bg} border-opacity-50
        hover:shadow-xl transition-all duration-300`}
        whileHover={{ y: -5 }}
      >
        <div className={`text-sm font-bold ${colors.text} mb-1`}>{year}</div>
        <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>

        {/* Decorative elements */}
        <div className="absolute -bottom-3 -right-3 opacity-10">
          <Award size={40} className={colors.text} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section className="px-4 py-16 md:px-8 lg:px-16 bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24">
        {/* Image with elegant frame */}
        <motion.div
          className="relative w-full max-w-lg mx-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl opacity-30 blur-lg"></div>
          <div className="relative overflow-hidden rounded-xl shadow-2xl z-10">
            <motion.img
              src={doctorImage}
              alt="Dr. Tanvi"
              className="w-full h-auto object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white"
              >
                <p className="text-sm font-light">Specialist in</p>
                <h3 className="text-xl font-bold">
                  Musculoskeletal Physiotherapy
                </h3>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold">
            <GradientText colors={["#3b82f6", "#6366f1"]}>
              About Dr. Tanvi
            </GradientText>
          </h1>

          <p className="text-lg leading-relaxed text-gray-700">
            Dr. Tanvi is a passionate and dedicated{" "}
            <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MPT in Musculoskeletal Physiotherapy
            </span>{" "}
            with a strong commitment to restoring mobility, relieving pain, and
            improving quality of life through evidence-based physiotherapy.
          </p>

          <ul className="space-y-3 text-gray-700 mt-6">
            {[
              "Specialist in MSK & Orthopedic conditions",
              "Post-Surgical Rehab Expert",
              "Trained in Manual Therapy & Dry Needling",
              "Evidence-based treatment approaches",
              "Patient-centered care philosophy",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-3">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/book"
              className="inline-flex items-center mt-6 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span>Book Appointment</span>
              <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      {/* Education Timeline */}
      <div className="max-w-4xl mx-auto mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Education & Achievements
            </span>
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Professional journey and academic milestones
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              year: "2015-2019",
              title: "Bachelor of Physiotherapy (BPT)",
              description: "University of Pune, First Class with Distinction",
              icon: <GraduationCap className="text-blue-600" />,
              color: "blue",
            },
            {
              year: "2019-2021",
              title: "Master of Physiotherapy (MPT)",
              description: "Specialized in Musculoskeletal, Top 5% of class",
              icon: <BookOpen className="text-indigo-600" />,
              color: "indigo",
            },
            {
              year: "2020",
              title: "Certified Manual Therapist",
              description: "Indian Association of Physiotherapists",
              icon: <Briefcase className="text-purple-600" />,
              color: "purple",
            },
            {
              year: "2021",
              title: "Clinical Excellence Award",
              description: "Recognized for outstanding patient outcomes",
              icon: <Award className="text-amber-500" />,
              color: "amber",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex gap-6 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse text-right"
              }`}
            >
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-full bg-${item.color}-100 flex items-center justify-center`}
              >
                {item.icon}
              </div>
              <div className={index % 2 === 0 ? "pr-4" : "pl-4"}>
                <div
                  className={`text-sm font-medium text-${item.color}-600 mb-1`}
                >
                  {item.year}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Hospital Cards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-28"
      >
        <HospitalCards />
      </motion.div>
      {/* Certifications Section */}
      <CertificationsSection />
    </section>
  );
};

export default About;
