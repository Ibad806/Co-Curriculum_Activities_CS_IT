import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "../constant/constant";
import { FaMapMarkerAlt, FaCalendarAlt, FaImages } from "react-icons/fa";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const EventPage = () => {
  const { route } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${AppRoutes.event}/route/${route}`);
        setEventData(response.data);
      } catch (err) {
        setError("Failed to fetch event details");
        console.error("Error fetching event:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [route]);

  const calculateDaysLeft = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    const diffTime = eventDateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

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
    return (
      <div className="min-h-screen bg-white text-black flex justify-center items-center">
        <div className="text-xl">Event not found</div>
      </div>
    );
  }

  const daysLeft = calculateDaysLeft(eventData.startdate);
  const galleryImages = eventData.galleryImages.map(img => ({
    original: img,
    thumbnail: img
  }));

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Banner Section */}
      <div className="relative h-[500px]">
        <img
          src={eventData.bannerImage}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
            {eventData.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {eventData.category === 'ticketing' && (
              <Link to="/payment" state={{ eventData }}>
                <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full text-lg font-medium transition-all transform hover:scale-105">
                  Buy Tickets
                </button>
              </Link>
            )}
            <button 
              className="bg-white/20 hover:bg-white/30 text-white py-3 px-8 rounded-full text-lg font-medium border border-white transition-all"
              onClick={() => setGalleryOpen(true)}
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold mb-6">Event Details</h2>
              <div dangerouslySetInnerHTML={{ __html: eventData.description }} />
            </div>

            {/* Additional Sections */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Event Schedule
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b pb-2">
                    <span className="font-medium">Start Date:</span>
                    <span>{new Date(eventData.startdate).toLocaleDateString()}</span>
                  </li>
                  {eventData.enddate && (
                    <li className="flex justify-between border-b pb-2">
                      <span className="font-medium">End Date:</span>
                      <span>{new Date(eventData.enddate).toLocaleDateString()}</span>
                    </li>
                  )}
                  {eventData.registrationDeadline && (
                    <li className="flex justify-between">
                      <span className="font-medium">Registration Deadline:</span>
                      <span>{new Date(eventData.registrationDeadline).toLocaleDateString()}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" />
                  Venue Information
                </h3>
                <p className="mb-4">{eventData.locationDetails}</p>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
              </div>
            </div>
          </div>

          {/* Event Info Sidebar */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit sticky top-6">
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Quick Info</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-medium w-32">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      eventData.status === 'active' ? 'bg-green-100 text-green-800' :
                      eventData.status === 'inactive' ? 'bg-gray-200 text-gray-800' :
                      eventData.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {eventData.status.charAt(0).toUpperCase() + eventData.status.slice(1)}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-32">Days Left:</span>
                    <span className="font-semibold">{daysLeft} days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-32">Category:</span>
                    <span>{eventData.category === 'ticketing' ? 'Ticketed Event' : 'Free Event'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-32">Subcategory:</span>
                    <span>{eventData.subcategory}</span>
                  </li>
                  {eventData.ticketPrice && (
                    <li className="flex items-start">
                      <span className="font-medium w-32">Ticket Price:</span>
                      <span>${parseFloat(eventData.ticketPrice).toFixed(2)}</span>
                    </li>
                  )}
                </ul>
              </div>

              {eventData.category === 'ticketing' && (
                <Link to="/payment" state={{ eventData }}>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors shadow-md">
                    Purchase Tickets
                  </button>
                </Link>
              )}

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Share This Event</h3>
                <div className="flex space-x-3">
                  {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map((platform) => (
                    <button
                      key={platform}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg transition-colors"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white text-3xl z-10"
            onClick={() => setGalleryOpen(false)}
          >
            &times;
          </button>
          <div className="max-w-4xl w-full">
            <ImageGallery 
              items={galleryImages} 
              showPlayButton={false}
              showFullscreenButton={true}
              additionalClass="gallery-container"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;