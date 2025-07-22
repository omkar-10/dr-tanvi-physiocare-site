import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, ArrowRight, BadgeCheck } from "lucide-react";
import drTanviImg from "../assets/dr-tanvi-placeholder.jpg";

const HeroSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.67, 0.24, 0.99],
      },
    },
  };

  const image = {
    hidden: { scale: 0.9, opacity: 0, rotate: -2 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.17, 0.67, 0.24, 0.99],
      },
    },
  };

  const features = [
    { text: "Personalized Treatment Plans", icon: BadgeCheck },
    { text: "Home Visit Services", icon: HeartPulse },
    { text: "Pain Relief Specialists", icon: BadgeCheck },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen flex items-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                <HeartPulse className="w-4 h-4 mr-2" />
                Trusted Physiotherapy Care
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Expert <span className="text-blue-600">Physiotherapy</span>
              <br />
              At Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Doorstep</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-3 bg-blue-200/50 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Hi, I'm Dr. Tanvi – MPT in Musculoskeletal. I provide personalized
              physiotherapy care with a focus on pain relief, post-surgery
              recovery, and improved mobility.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/book">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book Appointment <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-white text-blue-600 font-medium border-2 border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <Icon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Doctor Image */}
          <motion.div
            className="relative w-full max-w-md lg:w-[500px]"
            variants={image}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <motion.img
                src={drTanviImg}
                alt="Dr. Tanvi - Professional Physiotherapist"
                className="w-full h-auto object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certified</p>
                  <p className="font-medium text-gray-800">MPT Specialist</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
