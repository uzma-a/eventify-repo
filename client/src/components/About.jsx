import React from 'react';
import "aos/dist/aos.css";

const About = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn">
          About Eventify
        </h1>
        <p data-aos="fade-up" data-aos-duration="1200"  data-aos-easing="ease-in-up" className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Eventify is your go-to platform for discovering, planning, and managing events of all kinds. Whether you're
          looking to attend a local concert, organize a corporate event, or host a private party, Eventify makes it easy
          and enjoyable to be part of memorable experiences.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 transition duration-300 hover:text-purple-600">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to bring people together through unforgettable events. We strive to make every event planning
              process simple, stress-free, and exciting.
            </p>
          </div>
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 transition duration-300 hover:text-purple-600">
              What We Offer
            </h2>
            <p className="text-gray-600">
              From event discovery to seamless registration and ticketing, Eventify offers a comprehensive range of features
              to help you create the best event experience.
            </p>
          </div>
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 transition duration-300 hover:text-purple-600">
              Join Us
            </h2>
            <p className="text-gray-600">
              Join thousands of event organizers and attendees who trust Eventify to bring their events to life. Stay connected
              with the latest happenings and make your next event a memorable one.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 mt-16 text-center rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-white mb-4">Subscribe to our Newsletter</h2>
        <p className="text-lg text-white mb-6">Get the latest updates and event news directly in your inbox.</p>
        <div className="flex  flex-col sm:flex-row justify-center gap-6 sm:gap-10 items-center w-full sm:w-auto">
          <input
            type="email"
            className="p-4 border-2  border-black rounded-full text-gray-900 outline-none font-semibold  focus:ring-2 focus:ring-purple-600 w-full sm:w-72"
            placeholder="Enter your email"
          />
          <button
            className="text-white bg-gradient-to-br from-purple-700 to-blue-600 hover:bg-gradient-to-bl font-semibold rounded-full px-8 py-3 text-sm cursor-pointer transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
