import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import EventDashboard from "./pages/EventDashboard";

import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventDetail from "./pages/EventDetail";
import AdminPanel from "./pages/AdminPanel";
import BookedEvents from "./pages/BookedEvents";


const App = () => {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1200, // Increases smoothness
    offset: 50, // Starts animation earlier
    easing: "ease-in-out", // Smoother transition
    once: true, // Runs only once
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Toast notifications container */}
      <ToastContainer />

      {/* Main Content - Ensures footer stays at bottom */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/event-dashboard" element={<EventDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/admin/booked-events" element={<BookedEvents />} />
          
          <Route path='/admin-panel' element={<AdminPanel />}/>
          
        </Routes>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
