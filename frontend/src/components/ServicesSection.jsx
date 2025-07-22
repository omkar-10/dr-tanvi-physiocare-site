import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    image: "/ortho_physio.jpg",
    title: "Orthopedic Physiotherapy",
    desc: "Specialized care for bone, joint, and muscle conditions to restore mobility and reduce pain.",
    color: "bg-blue-50",
  },
  {
    image: "/post.jpg",
    title: "Post-Surgical Rehab",
    desc: "Customized recovery programs to regain strength and function after surgical procedures.",
    color: "bg-blue-50",
  },
  {
    image: "/sports.jpg",
    title: "Sports Injury Rehab",
    desc: "Targeted rehabilitation for athletes to recover from injuries and enhance performance.",
    color: "bg-blue-50",
  },
  {
    image: "/back-pain.jpg",
    title: "Chronic Pain Management",
    desc: "Comprehensive strategies for long-term relief from persistent musculoskeletal pain.",
    color: "bg-blue-50",
  },
  {
    image: "/manual.jpg",
    title: "Manual Therapy",
    desc: "Hands-on techniques including joint mobilization and soft tissue manipulation.",
    color: "bg-blue-50",
  },
  {
    image: "/posture.jpg",
    title: "Postural Correction",
    desc: "Assessment and treatment to improve spinal alignment and correct postural imbalances.",
    color: "bg-blue-50",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Physiotherapy Services
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Evidence-based treatments tailored to your specific rehabilitation
            needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div
                className={`p-6 rounded-xl ${service.color} h-full flex flex-col border border-transparent hover:border-blue-200 transition-all overflow-hidden`}
              >
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
                <Link
                  to="/book"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center shadow-md hover:shadow-lg transition-all"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Begin Your Personalized Treatment Plan Today
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Book Initial Assessment
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              View All Treatment Options
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const services = [
//   {
//     image: "/ortho_physio.jpg", // Replace with your actual image paths
//     title: "Orthopedic Physiotherapy",
//     desc: "Specialized care for bone, joint, and muscle conditions to restore mobility and reduce pain.",
//     color: "bg-blue-50",
//   },
//   {
//     image: "/post.jpg",
//     title: "Post-Surgical Rehab",
//     desc: "Customized recovery programs to regain strength and function after surgical procedures.",
//     color: "bg-purple-50",
//   },
//   {
//     image: "/sports.jpg",
//     title: "Sports Injury Rehab",
//     desc: "Targeted rehabilitation for athletes to recover from injuries and enhance performance.",
//     color: "bg-green-50",
//   },
//   {
//     image: "/back-pain.jpg",
//     title: "Chronic Pain Management",
//     desc: "Comprehensive strategies for long-term relief from persistent musculoskeletal pain.",
//     color: "bg-red-50",
//   },
//   {
//     image: "/manual.jpg",
//     title: "Manual Therapy",
//     desc: "Hands-on techniques including joint mobilization and soft tissue manipulation.",
//     color: "bg-orange-50",
//   },
//   {
//     image: "/posture.jpg",
//     title: "Postural Correction",
//     desc: "Assessment and treatment to improve spinal alignment and correct postural imbalances.",
//     color: "bg-teal-50",
//   },
// ];

// const ServicesSection = () => {
//   return (
//     <section id="services" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Comprehensive Physiotherapy Services
//           </h2>
//           <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Evidence-based treatments tailored to your specific rehabilitation
//             needs.
//           </p>
//         </motion.div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1, duration: 0.5 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -5 }}
//               className="group"
//             >
//               <div
//                 className={`p-6 rounded-xl ${service.color} h-full flex flex-col border border-transparent hover:border-blue-200 transition-all overflow-hidden`}
//               >
//                 <div className="mb-6 overflow-hidden rounded-lg">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
//                 <Link
//                   to="/book"
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center shadow-md hover:shadow-lg transition-all"
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mt-20 text-center"
//         >
//           <h3 className="text-2xl font-bold text-gray-900 mb-6">
//             Begin Your Personalized Treatment Plan Today
//           </h3>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link
//               to="/book"
//               className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
//             >
//               Book Initial Assessment
//             </Link>
//             <Link
//               to="/services"
//               className="px-8 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
//             >
//               View All Treatment Options
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;
