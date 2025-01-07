import React, { useState, useEffect } from "react";
import events from "../data";
import EventCard from "./EventCards";
import EventsFilter from "./EventsFilter";

const Allevents = ({ event, desc }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    let result = [...events];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (selectedDate) {
      result = result.filter((event) => {
        const eventStartDate = new Date(event.dateRange.split("-")[0].trim());
        const filterDate = new Date(selectedDate);
        return eventStartDate.toDateString() === filterDate.toDateString();
      });
    }

    // Apply sorting
    if (sortBy) {
      result = result.sort((a, b) => {
        switch (sortBy) {
          case "date":
            return (
              new Date(a.dateRange.split("-")[0]) -
              new Date(b.dateRange.split("-")[0])
            );
          case "price":
            return (
              parseFloat(a.price.replace("$", "")) -
              parseFloat(b.price.replace("$", ""))
            );
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }

    setFilteredEvents(result);
  }, [searchTerm, selectedDate, sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
  };

  return (
    <div className="min-h-screen w-full mt-28">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Title and Description */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
          {event}
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg mb-8">
          {desc}
        </p>

        {/* Filter Section */}
        <EventsFilter
          onSearch={handleSearch}
          onDateChange={handleDateChange}
          onSort={handleSort}
        />

        {/* Events Grid */}
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              image={event.image}
              title={event.title}
              location={event.location}
              price={event.price}
              dateRange={event.dateRange}
              timeToEnd={event.timeToEnd}
              daysLeft={event.daysLeft}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allevents;
