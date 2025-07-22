// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/statsSection";
import AboutDrTanvi from "../components/AboutDrTanvi";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ConditionsSection from "../components/ConditionsSection";
import BookAppointmentCTA from "../components/BookAppointmentCTA";
import GoogleReviewsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <AboutDrTanvi />
      <ServicesSection />
      <GoogleReviewsSection />
      <ConditionsSection />
      <BookAppointmentCTA />
    </div>
  );
};

export default Home;
