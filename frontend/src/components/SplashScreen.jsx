import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, HeartPulse } from "lucide-react";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTapMessage, setShowTapMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTapMessage(true);
    }, 1500);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  // Professional icons animation
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const pulse = {
    scale: [1, 1.05, 1], // More subtle pulse for professional look
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-50 flex flex-col items-center justify-center gap-6 px-4 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onFinish, 300);
          }}
        >
          {/* Main content */}
          <motion.div className="relative z-10 flex flex-col items-center justify-center gap-6">
            {/* Logo with subtle animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                scale: { duration: 0.8, type: "spring" },
                opacity: { duration: 0.8 },
              }}
            >
              <motion.div animate={pulse}>
                <img
                  src="/logo1.png" // Update this path
                  alt="Dr. Tanvi's PhysioCare Logo"
                  className="h-28 w-28 object-contain opacity-100" // Full opacity as requested
                />
              </motion.div>
            </motion.div>

            {/* Clinic name with elegant animation */}
            <motion.div className="text-center space-y-2">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
              >
                Dr. Tanvi's PhysioCare
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-blue-500 font-medium text-lg tracking-wider" // Added tracking for better readability
              >
                Clinically Driven • Functionally Focused
              </motion.p>
            </motion.div>

            {/* Professional services icons row */}
            <motion.div className="flex gap-8 mt-4">
              {[
                {
                  icon: <Activity className="h-8 w-8" />,
                  text: "Rehabilitation",
                },
                {
                  icon: <HeartPulse className="h-8 w-8" />,
                  text: "Preventive Care",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-blue-700 tracking-wide">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Minimal progress bar */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 h-0.5 bg-blue-100 mx-4 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </motion.div>

          {/* Professional tap prompt */}
          <AnimatePresence>
            {showTapMessage && (
              <motion.div
                className="absolute bottom-8 text-sm text-blue-500 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                Tap to enter
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
