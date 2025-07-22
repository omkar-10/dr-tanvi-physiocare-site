import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Clock, Mail } from "lucide-react";

const FooterMarquee = () => {
  const marqueeRef = useRef(null);
  const [duration, setDuration] = useState(20);

  // Marquee items data
  const items = [
    {
      icon: <Phone className="w-4 h-4" />,
      text: "Book an Appointment: +91 77158 74320",
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Working Hours: Mon-Fri 10AM-7PM | Sat 10AM-3PM | Sun Closed",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      text: "Additional Inquiries: dr.tanvidhavalempt@gmail.com",
    },
  ];

  // Duplicate items for seamless looping
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative bg-blue-600 text-white py-3 overflow-hidden">
      {/* Gradient fade effect on sides */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-blue-600 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-600 to-transparent z-10" />

      <motion.div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        onHoverStart={() => setDuration(40)}
        onHoverEnd={() => setDuration(20)}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${index}-${item.text}`}
            className="flex items-center px-8 text-sm font-medium"
          >
            <span className="mr-2">{item.icon}</span>
            {item.text}
            {index < duplicatedItems.length - 1 && (
              <span className="mx-8 w-1 h-1 rounded-full bg-white/50" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FooterMarquee;
