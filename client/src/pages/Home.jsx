import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import About from "../components/About";
import Event from "./event";
import EventList from "./EventList";
import MoreEvent from "./MoreEvent";


const Home = () => {
  const [events, setEvents] = useState([]);

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id)); // Remove event by id
  };

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Event />
      <MoreEvent events={events} />
      

      
      
    </div>
  );
};

export default Home;
