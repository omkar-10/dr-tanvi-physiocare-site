import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Send us an email for inquiries",
      details: "dr.tanvidhavalempt@gmail.com",
      action: "mailto:dr.tanvidhavalempt@gmail.com",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri: 9AM-6PM | Sat: 9AM-1PM",
      details: "+91 77158 74320",
      action: "tel:+917715874320",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      description: "Visit our practice",
      details: "Mira Road, East",
      action: "https://maps.app.goo.gl/DE6Uq9vSm196N2PRA",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Book Online",
      description: "Schedule an appointment",
      details: "Via Website",
      action: "/book",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp",
      description: "Instant messaging",
      details: "+91 77158 74320",
      action: "https://wa.me/917715874320",
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4">
            Direct Contact Options
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your preferred way to get in touch with us
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.action}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-full ${method.color} flex items-center justify-center mb-4`}
              >
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-500 mb-3">{method.description}</p>
              <p className="text-gray-700 font-medium mt-auto">
                {method.details}
              </p>
              <div className="mt-4 text-blue-600 font-medium flex items-center gap-1">
                Contact now <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.4294921294322!2d72.86536983599449!3d19.294627205061907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1003949cff3%3A0xf15f72780386a2cd!2sDr.%20Tanvi%20Dhavale%20Physiotherapist%20%7C%20Home%20Visit%20Physiotherapist%20in%20Mira%20Road%20%26%20Bhayandar!5e0!3m2!1sen!2sin!4v1753001135316!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Home Physiotherapy
            </h3>
            <p className="text-gray-600">Mira Road, East</p>
            <a
              href="https://maps.app.goo.gl/miGysdwiPrWttVVa9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-blue-600 font-medium"
            >
              Get Directions <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
