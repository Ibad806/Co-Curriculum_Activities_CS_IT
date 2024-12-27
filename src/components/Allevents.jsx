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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-[4vw] py-8">
        <h1 className="text-4xl font-bold text-center mb-4">{event}</h1>
        <p className="text-center text-gray-600 mb-8">{desc}</p>

        <EventsFilter
          onSearch={handleSearch}
          onDateChange={handleDateChange}
          onSort={handleSort}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
