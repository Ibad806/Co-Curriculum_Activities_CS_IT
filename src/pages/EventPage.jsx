import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import banner from "../assets/banner.png";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

const EventPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        if (location.state?.eventData) {
          setEventData(location.state.eventData);
        } else {
          const response = await axios.get(`${AppRoutes.event}/${eventId}`);
          setEventData(response.data);
        }
      } catch (err) {
        setError("Failed to fetch event details");
        console.error("Error fetching event:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, location.state]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex justify-center items-center">
        <div className="text-xl">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!eventData) {
    return <div className="min-h-screen bg-white text-black flex justify-center items-center">
      <div className="text-xl">Event not found</div>
    </div>;
  }

  // Calculate days left
  const calculateDaysLeft = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    const diffTime = eventDateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  const daysLeft = calculateDaysLeft(eventData.startdate);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="relative h-[600px]">
        <img
          src={eventData.eventimageurl || banner}
          alt={eventData.title}
          className="w-full h-full object-cover rounded-lg brightness-75"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = banner;
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-8">{eventData.title}</h1>
          <Link to="/payment">
            <button className="text-white border-white hover:bg-white/20 py-2 px-6 rounded-full">
              Register Now
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{eventData.title}</h2>
            <p className="text-gray-600 leading-relaxed">{eventData.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">📅 Date:</span>
                <span>{new Date(eventData.startdate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">📅 Days Left:</span>
                <span>{daysLeft} days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">📍 Venue:</span>
                <span>{eventData.locationDetails}</span>
              </div>
            </div>
            <Link to="/payment">
              <button className="border px-5 py-2 rounded-full text-xl bg-red-600 text-white bold">
                BUY TICKET
              </button>
            </Link>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg bg-gray-200">
            <img
              src={eventData.eventimageurl || banner}
              alt={eventData.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = banner;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;