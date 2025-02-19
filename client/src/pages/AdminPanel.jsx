import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaCalendarCheck, FaClipboardList } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi"; // 3-dot menu icon
import BookedEvents from "./BookedEvents";
import CreateEventForm from "./CreateEventForm";
import EventList from "./EventList";

const AdminPanel = () => {
  const [showBookedEvents, setShowBookedEvents] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEventsPage, setShowEventsPage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="flex mt-22">
      {/* Sidebar for Large Screens */}
      <div className="hidden sm:block w-64 h-auto bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              className="flex items-center p-2 w-full text-left rounded hover:bg-gray-700"
              onClick={() => {
                setShowCreateEvent(true);
                setShowBookedEvents(false);
                setShowEventsPage(false);
              }}
            >
              <FaPlusCircle className="mr-2" /> Create New Event
            </button>
          </li>
          <li>
            <button
              className="flex items-center p-2 w-full text-left rounded hover:bg-gray-700"
              onClick={() => {
                setShowCreateEvent(false);
                setShowBookedEvents(true);
                setShowEventsPage(false);
              }}
            >
              <FaCalendarCheck className="mr-2" /> Total Booked Events
            </button>
          </li>
          <li>
            <button
              className="flex items-center p-2 w-full text-left rounded hover:bg-gray-700"
              onClick={() => {
                setShowCreateEvent(false);
                setShowBookedEvents(false);
                setShowEventsPage(true);
              }}
            >
              <FaClipboardList className="mr-2" /> View All Events
            </button>
          </li>
        </ul>
      </div>

      {/* 3-dot menu for Small Screens */}
      <div className="sm:hidden absolute top-5 right-5">
        <button
          className="p-2 bg-gray-200 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMoreVertical size={24} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setShowCreateEvent(true);
                setShowBookedEvents(false);
                setShowEventsPage(false);
                setMenuOpen(false);
              }}
            >
              Create New Event
            </button>
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setShowCreateEvent(false);
                setShowBookedEvents(true);
                setShowEventsPage(false);
                setMenuOpen(false);
              }}
            >
              Total Booked Events
            </button>
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setShowCreateEvent(false);
                setShowBookedEvents(false);
                setShowEventsPage(true);
                setMenuOpen(false);
              }}
            >
              View All Events
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex items-center justify-center">
        {showBookedEvents ? (
          <BookedEvents />
        ) : showCreateEvent ? (
          <CreateEventForm events={events} setEvents={setEvents} />
        ) : showEventsPage ? (
          <EventList events={events} deleteEvent={deleteEvent} />
        ) : (
          <div className="bg-white mt-22 shadow-lg rounded-lg p-6 sm:p-10 max-w-full sm:max-w-3xl mx-auto text-center">
  <h2 className="text-3xl sm:text-5xl font-bold text-gray-800">
    Welcome to Admin Panel
  </h2>
  <p className="text-gray-600 mt-4 text-base sm:text-lg">
    Effortlessly manage events and bookings with a seamless experience.
  </p>
</div>

        )}
      </div>
    </div>
  );
};

export default AdminPanel;
