import { motion } from "framer-motion";
import {
  BadgeCheck,
  Home,
  Bone,
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";
import doctorImage from "../assets/dr-tanvi.jpg";
import doctorInWork from "../assets/img-1.jpg";

const About = () => {
  const features = [
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Certified MPT Specialist",
      description: "Musculoskeletal Physiotherapy",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Home Visit Expert",
      description: "Personalized care at your doorstep",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Bone className="w-6 h-6" />,
      title: "Orthopedic Rehab",
      description: "Post-surgical & injury recovery",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "500+ Patients Treated",
      description: "Proven track record of success",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-200 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.img
                src={doctorInWork}
                alt="Dr. Tanvi providing physiotherapy treatment"
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.02 }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Since 2018</p>
                    <p className="font-medium text-gray-800">
                      5+ Years Experience
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                <BadgeCheck className="w-4 h-4 mr-2" />
                Trusted Physiotherapy Care
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
            >
              Expert{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Musculoskeletal
              </span>{" "}
              Care in Mumbai
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Dr. Tanvi B. Dhavale is a certified physiotherapist specializing
              in musculoskeletal and orthopedic rehabilitation. She combines
              evidence-based techniques with personalized care to help patients
              regain mobility and live pain-free.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-3`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Doctor Profile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={doctorImage}
                  alt="Dr. Tanvi B. Dhavale"
                  className="w-14 h-14 object-cover rounded-full border-4 border-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900">
                    Dr. Tanvi B. Dhavale
                  </h4>
                  <p className="text-sm text-blue-600">
                    MPT (Musculoskeletal Physiotherapy)
                  </p>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                View Full Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
