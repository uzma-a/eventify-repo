import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings/all");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6 mt-22 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Bookings Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Tickets</th>
              <th className="p-3 text-left">Seat Category</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-gray-800 font-bold">{booking.eventName}</td>
                  <td className="p-3">{booking.userName}</td>
                  <td className="p-3">{booking.email || "N/A"}</td>
                  <td className="p-3">{booking.tickets}</td>
                  <td className="p-3">{booking.seatCategory}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
