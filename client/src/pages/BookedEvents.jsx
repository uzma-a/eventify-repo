import React, {useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from '../context/AppContext'

const BookedEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);

  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/bookings/all");
        setBookings(response.data);

        // Calculate total tickets
        const total = response.data.reduce((sum, booking) => sum + booking.tickets, 0);
        setTotalTickets(total);

      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-1 mt-22">
      {/* Total Tickets Display */}
      <div className="mb-5 p-4 bg-gray-800 text-white rounded-lg shadow-md text-center">
        <h3 className="text-xl font-bold">Total Tickets: {totalTickets}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Tickets</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-gray-800 font-bold">{booking.eventName}</td>
                  <td className="p-3">{booking.userName}</td>
                  <td className="p-3">{booking.tickets}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500">
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

export default BookedEvents;
