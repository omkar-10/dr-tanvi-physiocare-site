// import { motion } from "framer-motion";
// import {
//   FaMedal,
//   FaAward,
//   FaShieldAlt,
//   FaStar,
//   FaCertificate,
// } from "react-icons/fa";
// import { GiLaurelsTrophy } from "react-icons/gi";

// const certificateImages = [
//   {
//     id: 1,
//     image: "/certificates/1.jpg",
//     title: "Conference on AI in Physiotherapy",
//     issuer: "Goa Medical College, Sancheti Healthcare Academy",
//     year: "2024",
//     icon: <FaMedal className="text-blue-400" />,
//     category: "Conference",
//   },
//   {
//     id: 2,
//     image: "/certificates/2.jpg",
//     title: "Advances in Lower Limb Dysfunction Management",
//     issuer: "Sancheti Healthcare Academy, Sancheti College of Physiotherapy",
//     year: "2023	",
//     icon: <FaAward className="text-blue-500" />,
//     category: "Workshop",
//   },
//   {
//     id: 3,
//     image: "/certificates/3.jpg",
//     title: "Breast Cancer Rehabilitation",
//     issuer:
//       "Sparsh Health Education Social Welfare & Cancer Rehabilitation Foundation, DPO’s NETT College of Physiotherapy",
//     year: "2021",
//     icon: <FaShieldAlt className="text-blue-300" />,
//     category: "Workshop",
//   },
//   {
//     id: 4,
//     image: "/certificates/4.jpg",
//     title: "Clinical Excellence in Physiotherapy",
//     issuer: "DPO’s NETT College of Physiotherapy",
//     year: "2021",
//     icon: <FaStar className="text-blue-200" />,
//     category: "Merit Award",
//   },
//   {
//     id: 5,
//     image: "/certificates/5.jpg",
//     title: "Physiotherapy Symposium Participation",
//     issuer:
//       "Sancheti College of Physiotherapy, Sancheti Institute for Orthopaedics and Rehabilitation",
//     year: "2023",
//     icon: <GiLaurelsTrophy className="text-blue-600" />,
//     category: "Symposium",
//   },
//   {
//     id: 6,
//     image: "/certificates/6.jpg",
//     title: "Operation Restore – Burn Care Camp",
//     issuer: "National Burns Centre, Rotary International (RC Deonar)",
//     year: "2023",
//     icon: <GiLaurelsTrophy className="text-blue-600" />,
//     category: "Appreciation",
//   },
//   {
//     id: 7,
//     image: "/certificates/7.jpg",
//     title: "Therapeutic Taping Workshop",
//     issuer: "Institute of Manual Therapy & Taping (IMTT)",
//     year: "2021",
//     icon: <GiLaurelsTrophy className="text-blue-600" />,
//     category: "Workshop",
//   },
// ];

// const CertificationsSection = () => {
//   const duplicatedCertificates = [...certificateImages, ...certificateImages];
//   const featuredCerts = certificateImages.slice(0, 3);
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

//   return (
//     <section className="py-20 bg-white relative overflow-hidden">
//       {/* Decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: "spring" }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-100 rounded-full mb-6">
//             <FaCertificate className="text-blue-600 mr-2 text-xl" />
//             <span className="text-blue-600 font-medium">
//               Professional Credentials
//             </span>
//           </div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
//             Our <span className="text-blue-600">Certifications</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Validated expertise through internationally recognized
//             certifications
//           </p>
//         </motion.div>

//         {/* Premium Marquee Section - Removed side gradients */}
//         <div className="bg-blue-50 rounded-3xl p-1 mb-20 border border-blue-100 shadow-sm overflow-x-hidden">
//           <div className="bg-white rounded-2xl p-8">
//             <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3 text-gray-800">
//               <GiLaurelsTrophy className="text-blue-500" />
//               <span>Accredited Certifications</span>
//               <GiLaurelsTrophy className="text-blue-400" />
//             </h3>

//             <div className="relative py-6">
//               <motion.div
//                 className="flex"
//                 animate={{ x: ["0%", "-100%"] }}
//                 transition={{
//                   duration: isMobile ? 40 : 60, // Faster on mobile
//                   ease: "linear",
//                   repeat: Infinity,
//                 }}
//               >
//                 {duplicatedCertificates.map((cert, index) => (
//                   <motion.div
//                     key={`cert-${cert.id}-${index}`}
//                     className="flex-shrink-0 mx-3 w-72 lg:w-80"
//                     whileHover={{ scale: 1.03 }}
//                   >
//                     <div className="card bg-white shadow-md h-full group hover:shadow-lg transition-all duration-300 border border-blue-100">
//                       <figure className="relative h-48 overflow-hidden">
//                         <img
//                           src={cert.image}
//                           alt={cert.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                         <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             {cert.icon}
//                             <span className="text-sm font-medium text-white">
//                               {cert.category}
//                             </span>
//                           </div>
//                         </div>
//                       </figure>
//                       <div className="card-body p-6">
//                         <h3 className="card-title text-gray-800 line-clamp-1">
//                           {cert.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 line-clamp-1">
//                           {cert.issuer}
//                         </p>
//                         <div className="card-actions justify-between items-center mt-4">
//                           <span className="badge badge-outline border-blue-200 text-blue-600">
//                             {cert.year}
//                           </span>
//                           <span className="text-xs font-medium text-blue-500">
//                             Verified
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CertificationsSection;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, BookOpen, Star, Shield, X, Trophy } from "lucide-react";

// --- Data for Certificates ---
// Using placeholder images for demonstration. Replace with your actual paths.
const certificateImages = [
  {
    id: 1,
    image: "/certificates/1.webp",
    title: "Conference on AI in Physiotherapy",
    issuer: "Goa Medical College, Sancheti Healthcare Academy",
    year: "2024",
    category: "Conference",
  },
  {
    id: 2,
    image: "/certificates/2.webp",
    title: "Advances in Lower Limb Dysfunction Management",
    issuer: "Sancheti Healthcare Academy",
    year: "2023",
    category: "Workshop",
  },
  {
    id: 3,
    image: "/certificates/3.webp",
    title: "Breast Cancer Rehabilitation",
    issuer: "Sparsh Health Education & Cancer Foundation",
    year: "2021",
    category: "Workshop",
  },
  {
    id: 4,
    image: "/certificates/4.jpg",
    title: "Clinical Excellence in Physiotherapy",
    issuer: "DPO’s NETT College of Physiotherapy",
    year: "2021",
    category: "Merit Award",
  },
  {
    id: 5,
    image: "/certificates/5.jpg",
    title: "Physiotherapy Symposium Participation",
    issuer: "Sancheti College of Physiotherapy",
    year: "2023",
    category: "Symposium",
  },
  {
    id: 6,
    image: "/certificates/6.jpg",
    title: "Operation Restore – Burn Care Camp",
    issuer: "National Burns Centre, Rotary International",
    year: "2023",
    category: "Appreciation",
  },
  {
    id: 7,
    image: "/certificates/7.jpg",
    title: "Therapeutic Taping Workshop",
    issuer: "Institute of Manual Therapy & Taping (IMTT)",
    year: "2021",
    category: "Workshop",
  },
];

const categoryIcons = {
  Conference: <BookOpen className="w-4 h-4" />,
  Workshop: <Award className="w-4 h-4" />,
  "Merit Award": <Star className="w-4 h-4" />,
  Symposium: <Trophy className="w-4 h-4" />,
  Appreciation: <Shield className="w-4 h-4" />,
};

const allCategories = [
  "All",
  ...new Set(certificateImages.map((c) => c.category)),
];

// --- Main Component ---
const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCerts =
    activeFilter === "All"
      ? certificateImages
      : certificateImages.filter((c) => c.category === activeFilter);

  const handleCardClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Credentials & <span className="text-blue-600">Certifications</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            A commitment to continuous learning and professional excellence,
            validated by recognized institutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {allCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                activeFilter === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-blue-100"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Certificate Gallery */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                onClick={handleCardClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal for viewing certificate */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Sub-components ---

const CertificateCard = ({ cert, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.4, type: "spring" }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
    onClick={() => onClick(cert)}
  >
    <div className="relative h-56">
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/800x600/e2e8f0/334155?text=Image+Not+Found";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-lg leading-tight">{cert.title}</h3>
      </div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
        {cert.year}
      </div>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
          {categoryIcons[cert.category]}
          <span>{cert.category}</span>
        </div>
      </div>
      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{cert.issuer}</p>
    </div>
  </motion.div>
);

const CertificateModal = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
    >
      <div className="p-4 flex-shrink-0 flex justify-between items-center border-b border-slate-200">
        <h3 className="font-bold text-lg text-slate-800">{cert.title}</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <img
          src={cert.image}
          alt={`Certificate for ${cert.title}`}
          className="w-full h-auto"
        />
      </div>
      <div className="p-5 bg-slate-50 flex-shrink-0 border-t border-slate-200">
        <p className="text-slate-700">
          <strong>Issuer:</strong> {cert.issuer}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <span className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold">
            {categoryIcons[cert.category]}
            {cert.category}
          </span>
          <span className="text-sm font-bold text-slate-600">{cert.year}</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default CertificationsSection;
