import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Plus } from "lucide-react";

// Sample services data (replace with your actual data)
const services = [
  {
    id: 1,
    title: "Orthopedic Physiotherapy",
    description:
      "Specialized care for bone, joint, and muscle conditions to restore mobility and reduce pain.",
    image: "/ortho_physio.jpg",
    duration: "60-90 mins",
    sessions: "6-12 sessions",
    category: "Rehabilitation",
  },
  {
    id: 2,
    title: "Sports Injury Recovery",
    description:
      "Targeted rehabilitation programs for athletes to recover from injuries and enhance performance.",
    image: "/sports.jpg",
    duration: "45-75 mins",
    sessions: "4-8 sessions",
    category: "Sports",
  },
  {
    id: 3,
    title: "Post-Surgical Rehabilitation",
    description:
      "Customized recovery plans to regain strength and function after surgical procedures.",
    image: "/post.jpg",
    duration: "60-120 mins",
    sessions: "8-16 sessions",
    category: "Recovery",
  },
  {
    id: 4,
    title: "Chronic Pain Management",
    description:
      "Comprehensive strategies for long-term relief from persistent musculoskeletal pain.",
    image: "/back-pain.jpg",
    duration: "45-90 mins",
    sessions: "6-12 sessions",
    category: "Therapy",
  },
  {
    id: 5,
    title: "Manual Therapy",
    description:
      "Hands-on techniques including joint mobilization and soft tissue manipulation.",
    image: "/manual.jpg",
    duration: "45-60 mins",
    sessions: "4-10 sessions",
    category: "Therapy",
  },
  {
    id: 6,
    title: "Postural Correction",
    description:
      "Assessment and treatment to improve spinal alignment and correct postural imbalances.",
    image: "/posture.jpg",
    duration: "60 mins",
    sessions: "8-12 sessions",
    category: "Wellness",
  },
  {
    id: 7,
    title: "Gait & Balance Training",
    description:
      "Therapeutic exercises to improve walking patterns and reduce fall risk, especially in elderly or post-injury patients.",
    image: "/gait.png",
    duration: "45-60 mins",
    sessions: "6-10 sessions",
    category: "Rehabilitation",
  },
  {
    id: 8,
    title: "Temporomandibular Joint (TMJ) Therapy",
    description:
      "Specialized care for jaw pain, clicking, and movement dysfunctions related to TMJ disorders.",
    image: "/tmj.png",
    duration: "30-45 mins",
    sessions: "4-6 sessions",
    category: "Specialty",
  },
  {
    id: 9,
    title: "Myofascial Release Therapy",
    description:
      "Soft tissue therapy targeting tight fascia to relieve chronic pain and improve mobility.",
    image: "/myofascial.png",
    duration: "45-75 mins",
    sessions: "4-8 sessions",
    category: "Therapy",
  },
  {
    id: 10,
    title: "Frozen Shoulder Mobilization",
    description:
      "Progressive joint mobilization and stretching to improve range of motion in adhesive capsulitis.",
    image: "/frozen-shoulder.png",
    duration: "60 mins",
    sessions: "8-15 sessions",
    category: "Shoulder Care",
  },
  {
    id: 11,
    title: "Cervical & Lumbar Spine Rehab",
    description:
      "Targeted exercises and manual therapy for neck and lower back pain including disc and nerve-related issues.",
    image: "/spine.png",
    duration: "45-90 mins",
    sessions: "6-14 sessions",
    category: "Spine Care",
  },
  {
    id: 12,
    title: "Sciatica & Nerve Pain Relief",
    description:
      "Neurodynamic techniques and strengthening to reduce radiating leg pain from sciatic nerve compression.",
    image: "/sciatica.png",
    duration: "45-75 mins",
    sessions: "6-10 sessions",
    category: "Neuromuscular",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Premium Physiotherapy Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Evidence-based treatments tailored to your specific rehabilitation
              needs
            </p>
            <div className="mt-10">
              <Link
                to="/book"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all"
              >
                Book Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Specialized Treatment Programs
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each service is carefully designed to address specific conditions
            and recovery goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {service.sessions}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link
                      to={`/book`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      Book This Service
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Our expert physiotherapists will create a personalized treatment
              plan tailored to your specific needs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Book Initial Assessment
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
