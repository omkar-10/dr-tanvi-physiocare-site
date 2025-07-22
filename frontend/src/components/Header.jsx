import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-blue-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo - Simplified */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logo}
              alt="Dr. Tanvi's PhysioCare Logo"
              className="h-10 w-10 object-contain"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              Dr. Tanvi's PhysioCare
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActive
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/30"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link to="/book" className="hidden md:block">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-200"
              >
                Book Appointment
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-blue-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-blue-600" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-blue-400 shadow-md"
                        : "text-gray-700 hover:bg-blue-50"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Link to="/book" className="block mt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Appointment
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
