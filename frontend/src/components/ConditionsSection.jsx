import { motion } from "framer-motion";
import {
  Bone,
  Syringe,
  Dumbbell,
  Ruler,
  Brain,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const conditionsData = [
  {
    icon: <Bone size={24} />,
    title: "Orthopedic Conditions",
    conditions: [
      "Back Pain (Lower & Upper)",
      "Neck Pain",
      "Frozen Shoulder",
      "Knee Osteoarthritis",
      "Sciatica",
      "Spondylosis (Cervical & Lumbar)",
      "Tennis / Golfer's Elbow",
      "Heel Pain / Plantar Fasciitis",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Syringe size={24} />,
    title: "Post-Surgical Rehabilitation",
    conditions: [
      "Total Knee Replacement (TKR)",
      "Total Hip Replacement (THR)",
      "Spine Surgery Rehab",
      "Fracture Rehabilitation",
      "Ligament Repair Rehab (e.g. ACL)",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Dumbbell size={24} />,
    title: "Sports Injuries",
    conditions: [
      "Muscle Strains & Sprains",
      "Ligament Tears",
      "Meniscus Injuries",
      "Shoulder Dislocation Rehab",
      "Shin Splints",
    ],
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Ruler size={24} />,
    title: "Postural / Lifestyle Conditions",
    conditions: [
      "Forward Head Posture",
      "Rounded Shoulders",
      "Text Neck Syndrome",
      "Flat Feet",
      "Desk Job Related Pain",
    ],
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: <Brain size={24} />,
    title: "Neuromuscular / Other",
    conditions: [
      "Bell's Palsy",
      "Muscle Weakness",
      "Gait & Balance Issues",
      "Joint Stiffness",
      "Myofascial Pain Syndrome",
    ],
    color: "from-indigo-500 to-indigo-600",
  },
];

const ConditionsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 md:py-28 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-200 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            Our Expertise
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Conditions
            </span>{" "}
            Treated
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Specialized care for musculoskeletal and neurological disorders
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {conditionsData.map((group, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all h-full border border-gray-100 relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${group.color} text-white shadow-md`}
                  >
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {group.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {group.conditions.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/conditions">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View All Conditions <ArrowRight className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConditionsSection;
