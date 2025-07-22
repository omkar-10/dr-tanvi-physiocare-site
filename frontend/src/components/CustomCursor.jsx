import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest('button, a, [role="button"], [onclick]');

      setIsHoveringInteractive(isInteractive);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 bg-blue-600"
      animate={{
        x: position.x - 5,
        y: position.y - 5,
        opacity: isVisible && !isHoveringInteractive ? 1 : 0,
        scale: isVisible && !isHoveringInteractive ? 1 : 0.5,
      }}
      transition={{
        type: "spring",
        mass: 0.1,
        damping: 20,
        stiffness: 200,
      }}
    />
  );
};

export default CustomCursor;
