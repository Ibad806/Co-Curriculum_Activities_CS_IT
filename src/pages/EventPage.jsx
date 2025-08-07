import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  MapPin,
  Calendar,
  ImageIcon,
  Facebook,
  Twitter,
  Linkedin,
  PhoneIcon as Whatsapp,
  X,
} from "lucide-react";
import { AppRoutes } from "../constant/constant";

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
    const diffTime = eventDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  const shareLinks = {
    Facebook: `https://www.facebook.com/share.php?u=${encodeURIComponent(
      window.location.href
    )}`,
    Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(eventData ? eventData.title : "")}`,
    LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      window.location.href
    )}&title=${encodeURIComponent(eventData ? eventData.title : "")}`,
    WhatsApp: `https://api.whatsapp.com/send?text=Check out this event: ${
      eventData ? eventData.title : ""
    } - ${window.location.href}`,
  };

  const platforms = [
    {
      name: "Facebook",
      icon: <Facebook size={20} className="text-[#1877F2]" />,
    },
    { name: "Twitter", icon: <Twitter size={20} className="text-[#1DA1F2]" /> },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} className="text-[#0077B5]" />,
    },
    {
      name: "WhatsApp",
      icon: <Whatsapp size={20} className="text-[#25D366]" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
        <div className="text-xl font-medium">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
        <div className="text-xl text-red-500 font-medium">{error}</div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
        <div className="text-xl font-medium">Event not found</div>
      </div>
    );
  }

  const daysLeft = calculateDaysLeft(eventData.startdate);
  const galleryImages = eventData.galleryImages.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={eventData.bannerImage || "/placeholder.svg"}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 max-w-4xl drop-shadow-lg">
            {eventData.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {eventData.category === "ticketing" && (
              <Link to="/payment" state={{ eventData }}>
                <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Buy Tickets
                </button>
              </Link>
            )}
            <button
              className="bg-white/20 hover:bg-white/30 text-white py-3 px-8 rounded-full text-lg font-semibold border border-white transition-all shadow-lg backdrop-blur-sm flex items-center"
              onClick={() => setGalleryOpen(true)}
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              View Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {/* Event Details */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 md:p-8 shadow-lg rounded-xl">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Event Details
                </h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{ __html: eventData.description }}
                />
              </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-10 grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 shadow-lg rounded-xl">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                    Event Schedule
                  </h3>
                </div>
                <div className="text-gray-700">
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Start Date:</span>
                      <span>
                        {new Date(eventData.startdate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </li>
                    {eventData.enddate && (
                      <li className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">End Date:</span>
                        <span>
                          {new Date(eventData.enddate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </span>
                      </li>
                    )}
                    {eventData.registrationDeadline && (
                      <li className="flex justify-between items-center">
                        <span className="font-medium">
                          Registration Deadline:
                        </span>
                        <span>
                          {new Date(
                            eventData.registrationDeadline
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 shadow-lg rounded-xl">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <MapPin className="mr-3 h-6 w-6 text-blue-600" />
                    Venue Information
                  </h3>
                </div>
                <div className="text-gray-700">
                  <p className="mb-4">{eventData.locationDetails}</p>
                  <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-48 overflow-hidden">
                    {/* <iframe
                      title="Event Location Map"
                      src={`https://www.google.com/maps?q=SirSyedUniversity${encodeURIComponent(
                        eventData.locationDetails
                      )}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    /> */}
                    
                    <iframe
                      title="Event Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.4794539952845!2d67.09347780000002!3d24.915731600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f32a0f2c3f3%3A0x4fc0a6fd386117f0!2sSir%20Syed%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1754608251591!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Info Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 shadow-lg rounded-xl md:sticky md:top-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Quick Info</h3>
              </div>
              <div className="space-y-4 text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="font-medium w-32">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        eventData.status === "active"
                          ? "bg-green-100 text-green-800"
                          : eventData.status === "inactive"
                          ? "bg-gray-200 text-gray-800"
                          : eventData.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {eventData.status.charAt(0).toUpperCase() +
                        eventData.status.slice(1)}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-32">Days Left:</span>
                    <span className="font-semibold text-lg">
                      {daysLeft} days
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-32">Category:</span>
                    <span>
                      {eventData.category === "ticketing"
                        ? "Ticketed Event"
                        : "Free Event"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-32">Subcategory:</span>
                    <span>{eventData.subcategory}</span>
                  </li>
                  {eventData.ticketPrice && (
                    <li className="flex items-center">
                      <span className="font-medium w-32">Ticket Price:</span>
                      <span className="font-semibold text-lg">
                        ${parseFloat(eventData.ticketPrice).toFixed(2)}
                      </span>
                    </li>
                  )}
                </ul>

                {eventData.category === "ticketing" && (
                  <Link
                    to="/payment"
                    state={{ eventData }}
                    className="block mt-6"
                  >
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors shadow-md">
                      Purchase Tickets
                    </button>
                  </Link>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Share This Event
                  </h3>
                  <div className="flex space-x-3">
                    {platforms.map(({ name, icon }) => (
                      <a
                        key={name}
                        href={shareLinks[name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg flex items-center justify-center transition-colors text-gray-700 hover:text-gray-900"
                        aria-label={`Share on ${name}`}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
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
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full z-10"
            onClick={() => setGalleryOpen(false)}
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-5xl w-full h-full flex items-center justify-center">
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={true}
              additionalClass="gallery-container"
              thumbnailPosition="bottom"
              lazyLoad={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
