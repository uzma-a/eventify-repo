import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const events = [
  { id: 1, name: "Concert by John Doe", location: "Madison Square Garden, NY", description: "Experience live music with top artists.", image: "https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=612x612&w=0&k=20&c=cMFdhX403-yKneupEN-VWSfFdy6UWf1H0zqo6QBChP4=" },
  { id: 2, name: "AI Lecture by Dr. Smith", location: "Silicon Valley Conference Center, CA", description: "Discover the future of artificial intelligence.", image: "https://ichef.bbci.co.uk/images/ic/320xn/p0b37hnt.jpg" },
  { id: 3, name: "Beach Party by DJ Wave", location: "Miami Beach, FL", description: "Dance under the stars by the ocean.", image: "https://thumbs.dreamstime.com/b/dj-mixing-sunset-beach-party-summer-vacation-outdoor-disc-jockey-hands-playing-music-tourist-people-chiringuito-kiosk-174113251.jpg" },
  { id: 4, name: "Startup Conference by Tech Gurus", location: "San Francisco Expo Center, CA", description: "Network and learn from industry leaders.", image: "https://www.cloudways.com/blog/wp-content/uploads/Top-Startup-Events-1.jpg" },
  { id: 5, name: "Comedy Night by Sarah Lee", location: "Laugh Lounge, LA", description: "Laugh out loud with top comedians.", image: "https://images.stockcake.com/public/9/5/5/955210a4-c550-4f82-bc81-59194453af07_large/comedy-night-fun-stockcake.jpg" },
  { id: 6, name: "Yoga Retreat by Guru Ananda", location: "Himalayan Wellness Resort, India", description: "Relax and rejuvenate with expert guidance.", image: "https://susannerieker.com/wp-content/uploads/2018/07/thailand-yoga-retreats.jpg " },
];

const Event = () => {
  return (
    <div className="p-10 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-12">ALL Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`} className="bg-white shadow-xl overflow-hidden transform hover:scale-105 transition duration-500 hover:shadow-xl">
            <img src={event.image} alt={event.name} className="w-full p-4 h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-3xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300">{event.name}</h2>
              <p className="text-sm text-gray-600 mt-2 flex items-center"><FaMapMarkerAlt className="mr-2 text-red-500" /> {event.location}</p>
              <p className="text-lg text-gray-600 mt-4">{event.description}</p>
              <button className="mt-6 w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:bg-gradient-to-bl transition duration-300">
                Learn More
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Event;
