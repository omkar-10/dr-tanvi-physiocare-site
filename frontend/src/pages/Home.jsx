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
          Best Physiotherapist in Mira Road | Dr. Tanvi B. Dhavale – Back Pain,
          Sports Injury & Rehab
        </title>
        <meta
          name="description"
          content="Top-rated home physiotherapy in Mira Road by Dr. Tanvi B. Dhavale. Specialized in back pain, neck pain, frozen shoulder, sports injuries, post-surgical rehab & more. Trusted by families across Mumbai suburbs. Book your appointment now."
        />
        <meta
          name="keywords"
          content="best physiotherapist Mira Road, home physiotherapy Mira Road, Dr Tanvi Dhavale, female physiotherapist Mira Road, back pain treatment Mira Road, neck pain physio Mira Road, frozen shoulder physiotherapy, post surgery rehab Mira Bhayandar, sports injury physiotherapist Mumbai, physio near me, physiotherapy at home Mira Road"
        />
        <link rel="canonical" href="https://drtanvisphysiocare.com/" />

        {/* ✅ Structured Data: Home Visit Physiotherapist */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dr. Tanvi B. Dhavale",
        "jobTitle": "Physiotherapist",
        "image": "https://res.cloudinary.com/doz6bpin2/image/upload/v1752516027/logo1_z2rwqy.png",
        "url": "https://drtanvisphysiocare.com/",
        "description": "Experienced home-visit physiotherapist in Mira Road offering personalized treatment for back pain, neck pain, frozen shoulder, sports injury rehab, and post-surgical recovery.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mira Road",
          "addressRegion": "Maharashtra",
          "addressCountry": "India"
        },
        "areaServed": [
          "Mira Road",
          "Bhayandar",
          "Dahisar",
          "Borivali",
          "Kandivali",
          "Mumbai Western Suburbs"
        ],
        "makesOffer": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Physiotherapy Services",
            "description": "Professional physiotherapy at your doorstep – Back pain, joint pain, sports injuries, post-surgical rehab, and more."
          }
        }
      }
    `}
        </script>
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
