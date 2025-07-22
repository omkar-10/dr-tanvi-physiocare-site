import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarClock, PhoneCall, MapPin } from "lucide-react";

const BookAppointmentSection = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-blue-700 to-blue-900 py-16 sm:py-20 md:py-28 text-white overflow-hidden"
      id="cta"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20"
            >
              <div className="w-2 h-2 rounded-full bg-blue-300 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium tracking-wider">
                GET STARTED TODAY
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight"
            >
              Begin Your <span className="text-blue-200">Healing Journey</span>{" "}
              With Us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-xl leading-relaxed"
            >
              Schedule a consultation with Dr. Tanvi for professional home visit
              physiotherapy. Tailored rehabilitation programs designed for your
              specific needs and comfort.
            </motion.p>

            <div className="space-y-3.5 mb-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm mt-0.5">
                  <PhoneCall className="w-5 h-5 text-blue-200" />
                </div>
                <span className="text-blue-50/90 text-base">
                  Comprehensive home care service across Mumbai
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm mt-0.5">
                  <MapPin className="w-5 h-5 text-blue-200" />
                </div>
                <span className="text-blue-50/90 text-base">
                  Convenient scheduling including weekend availability
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/book"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <CalendarClock className="w-5 h-5 mr-3" />
                Book Your Appointment
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-blue-900 bg-white hover:bg-gray-50 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Have Questions First?
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%] flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-3 bg-white/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-500"></div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl border-4 border-white/90">
                <img
                  src="/LOGO.png"
                  alt="Professional Physiotherapy Care"
                  className="w-full max-w-[400px] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentSection;
