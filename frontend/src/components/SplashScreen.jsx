// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Activity, HeartPulse } from "lucide-react";

// const SplashScreen = ({ onFinish }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [showTapMessage, setShowTapMessage] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowTapMessage(true);
//     }, 1500);

//     const finishTimer = setTimeout(() => {
//       setIsVisible(false);
//       setTimeout(onFinish, 500);
//     }, 3500);

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(finishTimer);
//     };
//   }, [onFinish]);

//   // Professional icons animation
//   const iconVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.2,
//         duration: 0.6,
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     }),
//   };

//   const pulse = {
//     scale: [1, 1.05, 1], // More subtle pulse for professional look
//     transition: {
//       duration: 2.5,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-50 flex flex-col items-center justify-center gap-6 px-4 overflow-hidden"
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//           onClick={() => {
//             setIsVisible(false);
//             setTimeout(onFinish, 300);
//           }}
//         >
//           {/* Main content */}
//           <motion.div className="relative z-10 flex flex-col items-center justify-center gap-6">
//             {/* Logo with subtle animation */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 opacity: 1,
//               }}
//               transition={{
//                 scale: { duration: 0.8, type: "spring" },
//                 opacity: { duration: 0.8 },
//               }}
//             >
//               <motion.div animate={pulse}>
//                 <img
//                   src="/logo1.png" // Update this path
//                   alt="Dr. Tanvi's PhysioCare Logo"
//                   className="h-28 w-28 object-contain opacity-100" // Full opacity as requested
//                 />
//               </motion.div>
//             </motion.div>

//             {/* Clinic name with elegant animation */}
//             <motion.div className="text-center space-y-2">
//               <motion.h1
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
//                 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
//               >
//                 Dr. Tanvi's PhysioCare
//               </motion.h1>

//               <motion.p
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//                 className="text-blue-500 font-medium text-lg tracking-wider" // Added tracking for better readability
//               >
//                 Clinically Driven • Functionally Focused
//               </motion.p>
//             </motion.div>

//             {/* Professional services icons row */}
//             <motion.div className="flex gap-8 mt-4">
//               {[
//                 {
//                   icon: <Activity className="h-8 w-8" />,
//                   text: "Rehabilitation",
//                 },
//                 {
//                   icon: <HeartPulse className="h-8 w-8" />,
//                   text: "Preventive Care",
//                 },
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   custom={i}
//                   initial="hidden"
//                   animate="visible"
//                   variants={iconVariants}
//                   className="flex flex-col items-center gap-2"
//                 >
//                   <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
//                     {item.icon}
//                   </div>
//                   <span className="text-xs font-medium text-blue-700 tracking-wide">
//                     {item.text}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Minimal progress bar */}
//           <motion.div
//             className="absolute bottom-20 left-0 right-0 h-0.5 bg-blue-100 mx-4 rounded-full overflow-hidden"
//             initial={{ width: 0 }}
//             animate={{ width: "100%" }}
//             transition={{ duration: 3, ease: "linear" }}
//           >
//             <motion.div
//               className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
//               initial={{ width: 0 }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 3, ease: "linear" }}
//             />
//           </motion.div>

//           {/* Professional tap prompt */}
//           <AnimatePresence>
//             {showTapMessage && (
//               <motion.div
//                 className="absolute bottom-8 text-sm text-blue-500 font-medium"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 Tap to enter
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SplashScreen;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Recycle, Accessibility } from "lucide-react";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  // This function will be called when the main animation sequence completes.
  const handleAnimationComplete = () => {
    // Wait a little longer before finishing to let the user admire the screen
    setTimeout(() => {
      handleFinish();
    }, 1000);
  };

  // Central function to handle the exit transition
  const handleFinish = () => {
    setIsVisible(false);
    // The `onFinish` callback is triggered after the exit animation completes
    // thanks to the `AnimatePresence` component's `onExitComplete` prop.
  };

  // Main container variants for orchestrating the animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  // Variants for child elements to fade in and move up
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          onClick={handleFinish}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-8">
            {/* Animated Logo Image */}
            <motion.div variants={itemVariants}>
              <img
                // IMPORTANT: Replace this placeholder with the path to your actual logo file.
                src="/logo1.png"
                alt="Dr. Tanvi's PhysioCare Logo"
                className="w-28 h-28 object-contain rounded-full shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/128x128/cccccc/ffffff?text=Error";
                }}
              />
            </motion.div>

            {/* Animated Title and Subtitle */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
                Dr. Tanvi's PhysioCare
              </h1>
              <p className="text-lg text-blue-600 font-medium">
                Clinically Driven &bull; Functionally Focused
              </p>
            </motion.div>

            {/* Animated Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-8 pt-4"
            >
              {[
                {
                  icon: <Recycle className="h-7 w-7" />,
                  text: "Rehabilitation",
                },
                { icon: <HeartPulse className="h-7 w-7" />, text: "Wellness" },
                {
                  icon: <Accessibility className="h-7 w-7" />,
                  text: "Mobility",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 text-blue-700"
                >
                  <div className="p-4 bg-blue-100/70 rounded-full">
                    {item.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-800">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Animated "Tap to enter" prompt */}
            <motion.p
              className="absolute bottom-10 text-sm text-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              Tap anywhere to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App component to demonstrate the splash screen
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="antialiased font-sans bg-blue-50 text-blue-900 min-h-screen">
      {isLoading ? (
        <SplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        // This is where your main app content will go
        <div className="p-8 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold">Welcome to PhysioCare</h1>
            <p className="mt-2 text-lg text-blue-600">
              Your main application content starts here.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
