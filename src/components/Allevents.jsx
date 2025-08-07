import React, { useState, useEffect } from "react";
import EventCard from "./EventCards"; // Assuming this is a custom component
import EventsFilter from "./EventsFilter"; // Assuming this is a custom component
import { Link } from "react-router-dom"; // Assuming react-router-dom is used
import axios from "axios"; // Assuming axios is used
import { AppRoutes } from "../constant/constant"; // Assuming this constant exists

const Allevents = ({ event, desc }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'calendar'
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(AppRoutes.event);
        const eventsData = Array.isArray(response.data?.events)
          ? response.data.events
          : Array.isArray(response.data)
          ? response.data
          : [];
        setEvents(eventsData);
        setFilteredEvents(eventsData);
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
    if (!Array.isArray(events)) {
      setFilteredEvents([]);
      return;
    }

    let results = [...events];
    // Apply search filter
    if (searchTerm) {
      results = results.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.locationDetails?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply date filter
    if (selectedDate) {
      results = results.filter((event) => {
        const eventStartDate = new Date(event.startdate);
        const filterDate = new Date(selectedDate);
        return eventStartDate.toDateString() === filterDate.toDateString();
      });
    }
    // Apply sorting
    if (sortBy) {
      results = results.sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(a.startdate).getTime() - new Date(b.startdate).getTime();
          case "price":
            return (
              parseFloat(a.ticketPrice || "0") -
              parseFloat(b.ticketPrice || "0")
            );
          case "name":
            return a.title?.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }
    setFilteredEvents(results);
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
  const calculateDaysLeft = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    today.setHours(0, 0, 0, 0); // Normalize today's date to start of day
    eventDateObj.setHours(0, 0, 0, 0); // Normalize event date to start of day
    const diffTime = eventDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  };

  // Calendar view functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startdate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };
  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1
    ));
  };

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const weeks = [];
    let days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today for comparison

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-3 border border-gray-100 bg-gray-50 text-gray-300"></div>);
    }

    // Create cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentDate.setHours(0, 0, 0, 0); // Normalize current day for comparison
      const dateEvents = getEventsForDate(currentDate);
      const isToday = currentDate.toDateString() === today.toDateString();

      days.push(
        <div
          key={`day-${day}`}
          className={`p-3 border border-gray-100 min-h-[140px] flex flex-col relative group ${
            isToday ? "bg-blue-50 border-blue-300" : "bg-white"
          } ${
            dateEvents.length > 0 && !isToday ? "bg-indigo-50 border-indigo-200" : ""
          }`}
        >
          <div className={`text-lg font-bold text-right mb-2 ${isToday ? "text-blue-700" : "text-gray-800"}`}>{day}</div>
          <div className="flex-grow overflow-y-auto custom-scrollbar space-y-1">
            {dateEvents.map(event => (
              <Link
                key={event._id}
                to={`/events/${event.customRoute || event._id}`}
                className="block text-xs bg-indigo-600 text-white rounded-sm px-2 py-1 truncate hover:bg-indigo-700 transition-colors duration-200 font-medium"
                title={event.title}
              >
                {event.title}
              </Link>
            ))}
          </div>
        </div>
      );

      // Start a new row every 7 days
      if ((day + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
        weeks.push(
          <div key={`week-${weeks.length}`} className="grid grid-cols-7">
            {days}
          </div>
        );
        days = [];
      }
    }

    // Add empty cells for the remaining days of the last week
    if (days.length > 0) {
      while (days.length < 7) {
        days.push(<div key={`empty-end-${days.length}`} className="p-3 border border-gray-100 bg-gray-50 text-gray-300"></div>);
      }
      weeks.push(
        <div key={`week-${weeks.length}`} className="grid grid-cols-7">
          {days}
        </div>
      );
    }

    return weeks;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full mt-28 flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading events...</div>
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-900">
          {event || "All Events"}
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg mb-8">
          {desc || "Explore upcoming events in the Computer Science Department"}
        </p>
        <EventsFilter
          onSearch={handleSearch}
          onDateChange={handleDateChange}
          onSort={handleSort}
          onViewChange={(view) => setViewType(view)}
        />

        {/* View toggle buttons */}
        <div className="flex justify-end mb-8">
          <div className="inline-flex rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                viewType === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewType('grid')}
            >
              Grid View
            </button>
            <button
              className={`px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                viewType === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewType('calendar')}
            >
              Calendar View
            </button>
          </div>
        </div>

        {viewType === 'grid' ? (
          <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const daysLeft = calculateDaysLeft(event.startdate);
                return (
                  <Link
                    to={`/events/${event.customRoute || event._id}`}
                    key={event._id}
                  >
                    <EventCard
                      image={event.bannerImage}
                      title={event.title}
                      location={event.locationDetails}
                      price={event.ticketPrice ? `$${event.ticketPrice}` : "Free"}
                      dateRange={new Date(event.startdate).toLocaleDateString()}
                      daysLeft={daysLeft}
                      category={event.category}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No events found matching your criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="calendar-view bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => navigateMonth(-1)}
                aria-label="Previous month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => navigateMonth(1)}
                aria-label="Next month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>

            <div className="calendar-weekdays grid grid-cols-7 text-center font-bold text-gray-700 border-b-2 border-gray-200 py-3 bg-gray-50 text-sm uppercase tracking-wide">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2">{day}</div>
              ))}
            </div>

            <div className="calendar-days">
              {renderCalendar()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allevents;
