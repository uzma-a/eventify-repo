import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using the 'react-router-dom' for navigation

const Footer = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <footer className="bg-gradient-to-br from-blue-500 to-purple-500 text-white py-4 ">
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <h1
          onClick={() => navigate('/')}
          className="text-3xl text-black cursor-pointer font-bold mb-4 sm:mb-0"
        >
          eventify
        </h1>
        <p className="text-sm text-gray-800 sm:text-base">
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
