import React, { useState, useEffect } from "react";
import EventCard from "./EventCards";
import EventsFilter from "./EventsFilter";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

const Allevents = ({ event, desc }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(AppRoutes.event);
        console.log("Fetched events:", response.data);
        
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    
    let result = [...events];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.locationDetails.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (selectedDate) {
      result = result.filter((event) => {
        const eventStartDate = new Date(event.startdate);
        const filterDate = new Date(selectedDate);
        return eventStartDate.toDateString() === filterDate.toDateString();
      });
    }

    // Apply sorting
    if (sortBy) {
      result = result.sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(a.startdate) - new Date(b.startdate);
          case "price":
            return (
              parseFloat(a.ticketPrice || "0") - 
              parseFloat(b.ticketPrice || "0")
            );
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }

    setFilteredEvents(result);
  }, [searchTerm, selectedDate, sortBy, events]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
  };

  // Helper function to calculate days left
  const calculateDaysLeft = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    const diffTime = eventDateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  // Helper function to generate dynamic links
  const generateEventLink = (event) => {
    if (event.subcategory === "SMCE") {
      return "/smec";
    } else if (event.subcategory === "Annual Dinner") {
      return "/events/dinner";
    } else if (event.subcategory === "Qawali night") {
      return "/events/qawwali";
    } else {
      return `/events/${event.title.replace(/\s+/g, "-").toLowerCase()}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full mt-28 flex justify-center items-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full mt-28 flex justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mt-28">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
          {event}
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg mb-8">
          {desc}
        </p>

        <EventsFilter
          onSearch={handleSearch}
          onDateChange={handleDateChange}
          onSort={handleSort}
        />

        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => {
            const daysLeft = calculateDaysLeft(event.startdate);
            return (
              <Link 
                to={generateEventLink(event)} 
                state={{ eventData: event }} 
                key={event._id}
              >
                <EventCard
                  image={event.eventimageurl}
                  title={event.title}
                  location={event.locationDetails}
                  price={event.ticketPrice ? `$${event.ticketPrice}` : "Free"}
                  dateRange={new Date(event.startdate).toLocaleDateString()}
                  daysLeft={daysLeft}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Allevents;