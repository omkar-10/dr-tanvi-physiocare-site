import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device is desktop (window width > 768px)
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    // Initial check
    checkIfDesktop();

    // Add resize listener
    window.addEventListener("resize", checkIfDesktop);

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

    // Only add mouse event listeners if desktop
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseout", handleMouseLeave);
      window.addEventListener("mouseover", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseEnter);
      window.removeEventListener("resize", checkIfDesktop);
    };
  }, [isVisible, isDesktop]);

  // Don't render anything if not desktop
  if (!isDesktop) return null;

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
