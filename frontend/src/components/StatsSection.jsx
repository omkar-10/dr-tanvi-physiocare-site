import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { HeartPulse, Clock, Stethoscope, Building2, Plus } from "lucide-react";

const stats = [
  {
    value: 500,
    label: "Patients Treated",
    icon: HeartPulse,
    color: "from-pink-500 to-rose-500",
  },
  {
    value: 5,
    label: "Years of Experience",
    icon: Clock,
    color: "from-amber-500 to-orange-500",
  },
  {
    value: 25,
    label: "Conditions Treated",
    icon: Stethoscope,
    color: "from-emerald-500 to-teal-600",
  },
  {
    value: 5,
    label: "Hospitals Practiced In",
    icon: Building2,
    color: "from-indigo-500 to-blue-600",
  },
];

const CountUp = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;

    const increment = target / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      setCount(Math.min(Math.floor(current), target));
      if (current >= target) clearInterval(timer);
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex items-end"
    >
      <span className="text-4xl md:text-5xl font-bold">{count}</span>
      <Plus className="w-6 h-6 mb-1" />
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 md:py-28 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Care Delivered, Impact Measured
          </motion.h2>
          <motion.p
            className="text-lg text-blue-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Trusted care that makes a measurable difference in patients' lives
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                  {/* Gradient border effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                  ></div>

                  <div className="flex flex-col items-center text-center h-full">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`mb-6 p-4 rounded-full bg-gradient-to-br ${item.color} text-white shadow-md`}
                    >
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </motion.div>

                    <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                      <CountUp target={item.value} />
                    </h3>

                    <p className="text-lg font-medium text-gray-600 mt-auto">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-blue-600/80 italic text-sm">
            *Numbers based on our practice records
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
