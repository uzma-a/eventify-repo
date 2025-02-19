import React, { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";


const Header = () => {
  const { userData } = useContext(AppContent); // Get user data from context
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Navigate to the registration page if user is not logged in
    navigate("/login");
  };

  return (
    <header
      className="relative mt-22 w-screen h-[90vh] text-white flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://www.visionvivaah.com/blog/wp-content/uploads/2019/11/Top-10-Event-Management-Companies-In-India.jpg')",
      }}
    >
      {/* Overlay with proper blend mode */}
      <div className="absolute inset-0 bg-black opacity-50 mix-blend-multiply"></div>

      {/* Content (placed above the overlay) */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Large Username */}
        <h2 data-aos="zoom-up" data-aos-duration="1400"  data-aos-easing="ease-in-up"
       className="text-6xl font-semibold mb-4">Hey {userData ? userData.name : "User"}! 👋 </h2>

        
        {/* Short Line */}
        <hr className="border-t-2 border-white w-32 mx-auto mb-6" />
        
        {/* Short Description */}
        <p data-aos="zoom-up" data-aos-duration="1400"  data-aos-easing="ease-in-up" className="text-xl text-gray-200 mb-8">
          Make your event easier and never miss an important date!
        </p>
        
        {/* Additional lines to make it more attractive */}
        <p data-aos="zoom-up" data-aos-duration="1400"  data-aos-easing="ease-in-up" className="text-2xl text-white font-semibold mb-6">
          Experience seamless event management like never before.
        </p>
        <p data-aos="zoom-up" data-aos-duration="1400"  data-aos-easing="ease-in-up" className="text-lg text-gray-200 mb-8">
          Let us handle the details, while you focus on the moments that matter.
        </p>
        
        {/* Call-to-action buttons */}
        <div className="space-x-4">
          {userData ? (
            // If user is logged in, show dashboard button
            <button
              className="text-gray-100  border-2 border-white bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl font-medium rounded-full text-lg px-5 py-2.5 text-center cursor-pointer"
              onClick={() => navigate("/event-dashboard")}
            >
              View Dashboard
            </button>
          ) : (
            // If user is not logged in, show register button
            <button
              className="text-gray-100  border-2 border-white bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl font-medium rounded-full text-lg px-5 py-2.5 text-center cursor-pointer"
              onClick={handleRegisterClick}
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
