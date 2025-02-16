import React from "react";
import { Link, useParams } from "react-router-dom";
import banner from "../assets/banner.png"; // Placeholder banner
import events  from "../data"; 

const EventPage = () => {
  const { eventId } = useParams(); 
  console.log(eventId);
  
  const event = events.find((event) => event.id === eventId); // Fetch event data dynamically

  if (!event) {
    return <div>Event not found</div>; // Handle case when event is not found
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src={event.bannerImage || banner} // Event-specific banner image or fallback
          alt={event.title}
          className="w-full h-full object-cover rounded-lg brightness-75"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-8">{event.title}</h1>
          {/* CTA button */}
          <Link to="/payment">
            <button className="text-white border-white hover:bg-white/20 py-2 px-6 rounded-full">
              Register Now
            </button>
          </Link>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{event.title}</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">📅 Date:</span>
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">📅 Days Left:</span>
                <span>{event.daysLeft} days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">📍 Venue:</span>
                <span>{event.venue}</span>
              </div>
            </div>
            {/* CTA button */}
            <Link to="/payment">
              <button className="border px-5 py-2 rounded-full text-xl bg-red-600 text-white bold">
                BUY TICKET
              </button>
            </Link>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg bg-gray-200">
            <img
              src={event.eventImage || banner} // Event-specific image
              alt={event.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GALLERY</h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Event-specific gallery images */}
            {event.galleryImages.map((image, index) => (
              <div key={index} className={`col-span-${image.gridSize || 4}`}>
                <div className="relative h-[200px] md:h-[300px]">
                  <img
                    src={image.url}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
