import { motion } from "framer-motion";
import {
  FaMedal,
  FaAward,
  FaShieldAlt,
  FaStar,
  FaCertificate,
} from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";

const certificateImages = [
  {
    id: 1,
    image: "/certificates/1.jpg",
    title: "Conference on AI in Physiotherapy",
    issuer: "Goa Medical College, Sancheti Healthcare Academy",
    year: "2024",
    icon: <FaMedal className="text-blue-400" />,
    category: "Conference",
  },
  {
    id: 2,
    image: "/certificates/2.jpg",
    title: "Advances in Lower Limb Dysfunction Management",
    issuer: "Sancheti Healthcare Academy, Sancheti College of Physiotherapy",
    year: "2023	",
    icon: <FaAward className="text-blue-500" />,
    category: "Workshop",
  },
  {
    id: 3,
    image: "/certificates/3.jpg",
    title: "Breast Cancer Rehabilitation",
    issuer:
      "Sparsh Health Education Social Welfare & Cancer Rehabilitation Foundation, DPO’s NETT College of Physiotherapy",
    year: "2021",
    icon: <FaShieldAlt className="text-blue-300" />,
    category: "Workshop",
  },
  {
    id: 4,
    image: "/certificates/4.jpg",
    title: "Clinical Excellence in Physiotherapy",
    issuer: "DPO’s NETT College of Physiotherapy",
    year: "2021",
    icon: <FaStar className="text-blue-200" />,
    category: "Merit Award",
  },
  {
    id: 5,
    image: "/certificates/5.jpg",
    title: "Physiotherapy Symposium Participation",
    issuer:
      "Sancheti College of Physiotherapy, Sancheti Institute for Orthopaedics and Rehabilitation",
    year: "2023",
    icon: <GiLaurelsTrophy className="text-blue-600" />,
    category: "Symposium",
  },
  {
    id: 6,
    image: "/certificates/6.jpg",
    title: "Operation Restore – Burn Care Camp",
    issuer: "National Burns Centre, Rotary International (RC Deonar)",
    year: "2023",
    icon: <GiLaurelsTrophy className="text-blue-600" />,
    category: "Appreciation",
  },
  {
    id: 7,
    image: "/certificates/7.jpg",
    title: "Therapeutic Taping Workshop",
    issuer: "Institute of Manual Therapy & Taping (IMTT)",
    year: "2021",
    icon: <GiLaurelsTrophy className="text-blue-600" />,
    category: "Workshop",
  },
];

const CertificationsSection = () => {
  const duplicatedCertificates = [...certificateImages, ...certificateImages];
  const featuredCerts = certificateImages.slice(0, 3);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-100 rounded-full mb-6">
            <FaCertificate className="text-blue-600 mr-2 text-xl" />
            <span className="text-blue-600 font-medium">
              Professional Credentials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Our <span className="text-blue-600">Certifications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Validated expertise through internationally recognized
            certifications
          </p>
        </motion.div>

        {/* Premium Marquee Section - Removed side gradients */}
        <div className="bg-blue-50 rounded-3xl p-1 mb-20 border border-blue-100 shadow-sm overflow-x-hidden">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3 text-gray-800">
              <GiLaurelsTrophy className="text-blue-500" />
              <span>Accredited Certifications</span>
              <GiLaurelsTrophy className="text-blue-400" />
            </h3>

            <div className="relative py-6">
              <motion.div
                className="flex"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  duration: isMobile ? 40 : 60, // Faster on mobile
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {duplicatedCertificates.map((cert, index) => (
                  <motion.div
                    key={`cert-${cert.id}-${index}`}
                    className="flex-shrink-0 mx-3 w-72 lg:w-80"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="card bg-white shadow-md h-full group hover:shadow-lg transition-all duration-300 border border-blue-100">
                      <figure className="relative h-48 overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {cert.icon}
                            <span className="text-sm font-medium text-white">
                              {cert.category}
                            </span>
                          </div>
                        </div>
                      </figure>
                      <div className="card-body p-6">
                        <h3 className="card-title text-gray-800 line-clamp-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {cert.issuer}
                        </p>
                        <div className="card-actions justify-between items-center mt-4">
                          <span className="badge badge-outline border-blue-200 text-blue-600">
                            {cert.year}
                          </span>
                          <span className="text-xs font-medium text-blue-500">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Featured Certifications */}
        {/* <div className="mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              <span className="text-blue-600">Flagship</span> Qualifications
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most distinguished certifications in professional therapy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCerts.map((cert, index) => (
              <motion.div
                key={`featured-${cert.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
                className="card bg-white shadow-lg overflow-hidden border border-blue-100 hover:border-blue-300 transition-all"
              >
                <figure className="relative h-64 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                    {cert.icon}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-primary bg-blue-600 border-blue-600">
                        {cert.category}
                      </span>
                      <span className="badge badge-outline badge-sm text-white/80 border-white/30">
                        {cert.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {cert.title}
                    </h3>
                    <p className="text-blue-100">{cert.issuer}</p>
                  </div>
                </figure>
                <div className="card-body bg-white p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-600">
                          Active Certification
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-primary bg-blue-600 border-blue-600 hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CertificationsSection;
