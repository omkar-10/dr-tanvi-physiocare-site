// components/HospitalCards.jsx
import rajeev from "../assets/hospitals/rajeev.png";
import sancheti from "../assets/hospitals/sancheti.png";
import kamla from "../assets/hospitals/kamla.png";
import sasoon from "../assets/hospitals/sasoon.png";
import baba from "../assets/hospitals/baba.png";
import fortis from "../assets/hospitals/fortis.jpg";
import sushilaben from "../assets/hospitals/sushilaben.png";
import nbc from "../assets/hospitals/nbc.png";
import { motion } from "framer-motion";
import { useState } from "react";

const hospitals = [
  {
    name: "Sancheti Hospital, Pune",
    image: sancheti,
    role: "Musculoskeletal Rehabilitation",
    trust: "Worked with senior orthopedic specialists",
    delay: 0.2,
  },
  {
    name: "Bharat Ratna Late Rajeev Gandhi Hospital, Pune",
    image: rajeev,
    role: "Orthopedic Department",
    trust: "Treated 250+ post-surgical patients",
    delay: 0.1,
  },
  {
    name: "Kamla Nehru Government Hospital, Pune",
    image: kamla,
    role: "Outpatient Physio Unit",
    trust: "Handled 100+ knee & spine cases",
    delay: 0.3,
  },
  {
    name: "Sassoon General Hospital, Pune",
    image: sasoon,
    role: "Sports Medicine Division",
    trust: "Rehabilitated 50+ professional athletes",
    delay: 0.4,
  },
  {
    name: "Bharat Ratna Dr. Babasaheb Ambedekar Memorial Hospital, Mumbai",
    image: baba,
    role: "Neurological Rehabilitation",
    trust: "Specialized in stroke recovery cases",
    delay: 0.5,
  },
  {
    name: "Fortis Hospital",
    image: fortis,
    role: "Geriatric Physiotherapy",
    trust: "Improved mobility for 200+ elderly patients",
    delay: 0.6,
  },
  {
    name: "Smt. Sushilaben R. Mehta And Sir Kikabhai P. Cardiac Hospital, Mumbai",
    image: sushilaben,
    role: "Geriatric Physiotherapy",
    trust: "Improved mobility for 200+ elderly patients",
    delay: 0.6,
  },
  {
    name: "National Burns Hospital, Mumbai",
    image: nbc,
    role: "Geriatric Physiotherapy",
    trust: "Improved mobility for 200+ elderly patients",
    delay: 0.6,
  },
];

const HospitalCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-16 px-4 md:px-12 bg-white text-gray-900">
      <motion.h2
        className="text-3xl font-bold text-center text-blue-600 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Practiced in Renowned Healthcare Institutions
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {hospitals.map((hospital, i) => (
          <motion.div
            key={i}
            className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            custom={i}
            viewport={{ once: true, margin: "-50px" }}
            onHoverStart={() => setHoveredCard(i)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="relative overflow-hidden h-48">
              <motion.img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover"
                variants={imageVariants}
                animate={hoveredCard === i ? "hover" : "initial"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">{hospital.trust}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {hospital.name}
              </h3>
              <div className="flex items-center">
                <div className="w-8 h-1 bg-blue-600 rounded-full mr-2"></div>
                <p className="text-blue-600 font-medium">{hospital.role}</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/10 rounded-bl-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-blue-600/5 rounded-tr-xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HospitalCards;
