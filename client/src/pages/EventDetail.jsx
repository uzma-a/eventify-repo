import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AppContent } from "../context/AppContext"; // Import your context
import "aos/dist/aos.css";

const events = [
  { id: 1, name: "Concert by John Doe", location: "Madison Square Garden, NY", description: "Experience live music with top artists.", image: "https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4=" },
  { id: 2, name: "AI Lecture by Dr. Smith", location: "Silicon Valley Conference Center, CA", description: "Discover the future of artificial intelligence.", image: "https://ichef.bbci.co.uk/images/ic/320xn/p0b37hnt.jpg" },
  { id: 3, name: "Beach Party by DJ Wave", location: "Miami Beach, FL", description: "Dance under the stars by the ocean.", image: "https://thumbs.dreamstime.com/b/dj-mixing-sunset-beach-party-summer-vacation-outdoor-disc-jockey-hands-playing-music-tourist-people-chiringuito-kiosk-174113251.jpg" },
  { id: 4, name: "Startup Conference by Tech Gurus", location: "San Francisco Expo Center, CA", description: "Network and learn from industry leaders.", image: "https://www.cloudways.com/blog/wp-content/uploads/Top-Startup-Events-1.jpg" },
  { id: 5, name: "Comedy Night by Sarah Lee", location: "Laugh Lounge, LA", description: "Laugh out loud with top comedians.", image: "https://images.stockcake.com/public/9/5/5/955210a4-c550-4f82-bc81-59194453af07_large/comedy-night-fun-stockcake.jpg" },
  { id: 6, name: "Yoga Retreat by Guru Ananda", location: "Himalayan Wellness Resort, India", description: "Relax and rejuvenate with expert guidance.", image: "https://susannerieker.com/wp-content/uploads/2018/07/thailand-yoga-retreats.jpg " },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContent); // Access auth state from context

  const event = events.find((event) => event.id === parseInt(id));

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    address: "",
    tickets: 1,
    seatCategory: "General",
  });

  if (!event) {
    return <div className="text-center text-xl font-bold mt-10">Event not found</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedin) {
      toast.error("You must log in first to book this event!");
      navigate("/login"); // Redirect to login page
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/bookings/book", {
        eventName: event.name,
        ...formData,
      });
      toast.success("Booking successful!");
      setFormData({
        userName: "",
        phoneNumber: "",
        email: "",
        address: "",
        tickets: 1,
        seatCategory: "General",
      });
    } catch (error) {
      toast.error("Failed to book. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 mt-18 min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
        {event.name}
      </h1>

      {/* Image Section */}
      <img 
        src={event.image} 
        alt={event.name} 
        className="w-full h-80 sm:h-96 object-cover shadow-lg rounded-lg"
      />

      {/* Description & Location Section */}
      <div className="mt-4 flex flex-col md:flex-row items-start justify-between max-w-7xl w-full gap-3">
        <p className="flex-1 text-gray-800 leading-relaxed text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Illum ullam beatae quidem voluptates temporibus nostrum iusto officia nam iste aliquid, quaerat odio tempora eos.
          Id eveniet amet soluta sapiente itaque illum quisquam harum esse beatae eos maiores excepturi culpa voluptatem repudiandae,
          molestiae nemo, aliquid hic. Consequuntur natus omnis veniam officiis ut sit quasi aperiam fuga corporis esse eos,
          qui dicta nemo, debitis ipsam tenetur nihil? Delectus nobis repellendus accusantium obcaecati tenetur deserunt quae?
          Voluptates, hic impedit? Repudiandae dicta magnam inventore porro laborum!
        </p>

        <div className="mt-4 md:mt-0 text-center text-sm text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> {event.location}
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="mt-6 p-4 sm:p-6 w-full max-w-2xl mx-auto bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl shadow-lg">
        <h2 className="text-2xl text-white font-bold text-center mb-4 sm:mb-6">Book Your Event</h2>
        
        <input type="text" name="userName" placeholder="Your Name" value={formData.userName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-2 sm:mt-3" required />
        
        <input type="text" name="phoneNumber" placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-2 sm:mt-3" required />
        
        <input type="text" name="email" placeholder="Email Id" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-2 sm:mt-3" required />
        
        <input type="text" name="address" placeholder="Your address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-2 sm:mt-3" required />
        
        <input type="number" name="tickets" placeholder="Number of Tickets" value={formData.tickets} onChange={handleChange} min="1" className="w-full p-3 border border-gray-300 rounded-lg mt-2 sm:mt-3" required />
        
        <select name="seatCategory" value={formData.seatCategory} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg mt-2 sm:mt-3">
          <option value="General">General</option>
          <option value="VIP">VIP</option>
          <option value="VVIP">VVIP</option>
        </select>
        
        <button type="submit" className="text-white w-full bg-gradient-to-br from-purple-700 to-blue-700 hover:bg-gradient-to-bl font-sans rounded-lg text-sm mt-3 px-5 py-2.5 text-center cursor-pointer">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default EventDetail;
