import { motion } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  // Sample data mimicking Google Maps reviews API response
  const googleReviews = [
    {
      author_name: "Rahul Sharma",
      rating: 5,
      text: "Dr. Tanvi's treatment helped me recover from my knee pain faster than expected. Very professional!",
      profile_photo_url: "https://i.pravatar.cc/150?img=1",
      relative_time_description: "2 weeks ago",
    },
    {
      author_name: "Priya Desai",
      rating: 5,
      text: "Her home visit service was a blessing for my mother. Highly recommend Dr. Tanvi for elderly care.",
      profile_photo_url: "https://i.pravatar.cc/150?img=2",
      relative_time_description: "1 month ago",
    },
    {
      author_name: "Akash Mehta",
      rating: 4,
      text: "Excellent guidance through my shoulder rehab. Regained full mobility in just weeks!",
      profile_photo_url: "https://i.pravatar.cc/150?img=3",
      relative_time_description: "3 months ago",
    },
    {
      author_name: "Neha Patel",
      rating: 5,
      text: "Post-spinal surgery rehab was exceptional. Couldn't have asked for better care!",
      profile_photo_url: "https://i.pravatar.cc/150?img=4",
      relative_time_description: "2 months ago",
    },
    {
      author_name: "Vikram Joshi",
      rating: 5,
      text: "The pain relief techniques are remarkable. My chronic back pain is finally manageable.",
      profile_photo_url: "https://i.pravatar.cc/150?img=5",
      relative_time_description: "1 week ago",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % googleReviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, googleReviews.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % googleReviews.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + googleReviews.length) % googleReviews.length
    );
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-blue-100 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            Google Reviews
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Patient{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Real feedback from our valued patients
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-blue-600 w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-blue-600 w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              (currentIndex - 1 + googleReviews.length) % googleReviews.length,
              currentIndex,
              (currentIndex + 1) % googleReviews.length,
            ].map((index, i) => {
              const review = googleReviews[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: i === 1 ? 1 : 0.8,
                    y: 0,
                    scale: i === 1 ? 1.05 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${
                    i === 1 ? "md:col-span-1 z-10" : "hidden md:block"
                  }`}
                >
                  <div
                    className={`bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col ${
                      i === 1
                        ? "border-2 border-blue-300"
                        : "border border-gray-200"
                    }`}
                  >
                    {/* Google-style rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        {review.relative_time_description}
                      </span>
                    </div>

                    {/* Review text */}
                    <div className="relative flex-grow">
                      <Quote className="absolute top-0 left-0 text-blue-100 w-8 h-8" />
                      <p className="text-gray-700 text-lg italic pl-6 mb-6">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Reviewer info */}
                    <div className="flex items-center mt-auto">
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                      />
                      <div className="ml-3">
                        <h4 className="font-bold text-gray-900">
                          {review.author_name}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>Google Review</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile dots indicator */}
          <div className="flex justify-center mt-8 gap-2 md:hidden">
            {googleReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA to Google Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://www.google.com/maps/place/Dr.+Tanvi+Dhavale+Physiotherapist+%7C+Home+Visit+Physiotherapist+in+Mira+Road+%26+Bhayandar/@19.2945652,72.8634494,17z/data=!4m8!3m7!1s0x3be7b1003949cff3:0xf15f72780386a2cd!8m2!3d19.2945652!4d72.8660243!9m1!1b1!16s%2Fg%2F11xkpfpb90?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all"
          >
            See All Google Reviews
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
