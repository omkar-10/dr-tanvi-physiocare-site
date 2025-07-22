import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Instagram,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Clock,
} from "lucide-react";
import FooterMarquee from "./FooterMarquee";

const Footer = () => {
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
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com/drtanvisphysio",
      label: "Instagram",
      color: "bg-gradient-to-br from-pink-500 to-purple-600",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      url: "https://facebook.com/drtanvisphysio",
      label: "Facebook",
      color: "bg-blue-600",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/drtanvisphysio",
      label: "Twitter",
      color: "bg-sky-400",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/drtanvisphysio",
      label: "LinkedIn",
      color: "bg-blue-700",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      url: "https://wa.me/919876543210",
      label: "WhatsApp",
      color: "bg-green-500",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-50 to-white">
      <FooterMarquee></FooterMarquee>

      {/* Main Footer Content */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="text-gray-700 pt-12 pb-8"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                  <HeartPulse className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    PhysioCare
                  </h2>
                  <p className="text-sm text-blue-600 font-medium">
                    Healing with Care & Precision
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We understand that injuries and acute pain can happen
                unexpectedly. Our emergency physiotherapy services are here to
                help you recover faster and better.
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    className={`p-2 rounded-lg text-white ${social.color} shadow-sm hover:shadow-md transition-all`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-100 pb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  "Manual Therapy",
                  "Chronic Pain Management",
                  "Hand Therapy",
                  "Orthopedic Rehabilitation",
                  "Sports Injury Care",
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to="/services"
                      className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors"></span>
                      {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Working Hours Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-100 pb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Working Hours
              </h3>
              <ul className="space-y-4">
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Monday - Friday</p>
                    <p className="text-sm text-gray-600">10:00 AM - 7:00 PM</p>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Saturday</p>
                    <p className="text-sm text-gray-600">10:00 AM - 3:00 PM</p>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Sunday</p>
                    <p className="text-sm text-gray-600">Closed</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-100 pb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Contact Us
              </h3>
              <ul className="space-y-4">
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <a href="tel:+917893456012" className="text-sm">
                      (+91) 77158 74320
                    </a>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <a href="mailto:contact@physiocare.com" className="text-sm">
                      dr.tanvidhavalempt@gmail.com
                    </a>
                  </div>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-sm">Mira Road, East</p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-blue-100 text-center"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} PhysioCare. All Rights Reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link
                  to="/about"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  About Us
                </Link>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              Built with{" "}
              <HeartPulse className="w-3.5 h-3.5 text-red-500 animate-pulse" />{" "}
              by Omkar Dhavale
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </footer>
  );
};

export default Footer;
