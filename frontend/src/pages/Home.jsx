// src/pages/Home.jsx
import { Helmet } from "react-helmet-async"; // ✅ Import Helmet
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import AboutDrTanvi from "../components/AboutDrTanvi";
import ServicesSection from "../components/ServicesSection";
import ConditionsSection from "../components/ConditionsSection";
import BookAppointmentCTA from "../components/BookAppointmentCTA";
import GoogleReviewsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>
          Physiotherapy in Mira Road | Dr. Tanvi B. Dhavale – Back Pain, Injury,
          Rehab
        </title>
        <meta
          name="description"
          content="Looking for the best physiotherapist in Mira Road? Dr. Tanvi B. Dhavale offers expert treatment for back pain, joint injuries, frozen shoulder, sciatica, post-surgery rehab & more. Book your appointment today."
        />
        <meta
          name="keywords"
          content="physiotherapy Mira Road, best physiotherapist Mira Road, Dr Tanvi Dhavale, back pain treatment Mira Road, knee pain physio, frozen shoulder physio, post surgery physiotherapy Mira Road, sports injury physiotherapy, physiotherapy clinic Mira Bhayandar, female physiotherapist Mira Road, physio near me, Mira Road physio, physiotherapy near me"
        />
        <link rel="canonical" href="https://drtanviphysio.vercel.app" />
      </Helmet>

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
