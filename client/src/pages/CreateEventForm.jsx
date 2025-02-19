import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEventForm = ({ events, setEvents }) => {
  const [eventName, setEventName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEventImage(reader.result);
        setPreviewImage(reader.result);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !eventTitle || !eventLocation || !eventDate || !eventImage) {
      toast.error("Please fill all fields!");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName,
      title: eventTitle,
      location: eventLocation,
      date: eventDate,
      image: eventImage,
    };

    setEvents([...events, newEvent]);
    localStorage.setItem("events", JSON.stringify([...events, newEvent]));

    toast.success("New Event Added!");

    // Clear input fields
    setEventName("");
    setEventTitle("");
    setEventLocation("");
    setEventDate("");
    setEventImage(null);
    setPreviewImage("");
  };

  return (
    <div className="p-5 mt-6 bg-gradient-to-t from-blue-300 to-purple-300 shadow-lg rounded-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border-2 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          className="border-2 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <input
          type="text"
          className="border-2 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <input
          type="date"
          className="border-2 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        {/* File Upload */}
        <label className="border p-3 w-full rounded-md cursor-pointer bg-white text-gray-700 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition">
          <span className="text-sm sm:text-base">📁 Tap to upload an image</span>
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>

        {/* Image Preview */}
        {previewImage && (
          <div className="mt-3 text-center">
            <p className="text-gray-800 text-sm sm:text-base">Image Preview:</p>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-48 object-cover rounded-md shadow-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-br from-purple-700 to-blue-700 text-white font-medium rounded-lg text-lg px-5 py-3 hover:bg-gradient-to-bl transition duration-300"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
