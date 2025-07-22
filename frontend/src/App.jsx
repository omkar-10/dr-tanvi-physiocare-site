// src/App.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  // Optional: Auto-dismiss splash after a fallback timeout (e.g. 5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true);
    }, 5000); // optional fallback timeout

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      {!splashDone ? (
        <SplashScreen onFinish={() => setSplashDone(true)} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
