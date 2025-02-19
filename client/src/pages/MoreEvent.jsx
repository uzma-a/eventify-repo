const MoreEvent = ({ events = [] }) => {
    return (
      <div className="max-w-full mt-10 w-full shadow-xl rounded-lg p-6">
        {/* Gradient Header */}
        <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-700 to-blue-700 p-4 rounded-md text-center">
           Upcoming Events 🎉
        </h2>
  
        {events.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No events available.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-6 mt-6">
            {events.map((event) => (
              <li
                key={event.id}
                className="p-4 bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Section */}
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 flex items-center justify-center rounded-md text-gray-500">
                    No image available
                  </div>
                )}
  
                {/* Event Details */}
                <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                <p className="text-gray-600 font-bold">{event.title}</p>
                <p className="text-gray-700">📍 {event.location}</p>
                <p className="text-gray-700">📅 {event.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default MoreEvent;
  