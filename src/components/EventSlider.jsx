import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import events from "../data";
import EventCard from "./EventCards";

const EventSlider = ({ heading, para }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= events.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 3 : prevIndex - 1
    );
  };

  const visibleEvents = events.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full p-[4vw]">
      <div className="flex flex-col gap-[1vw] items-center justify-center h-full">
        <div className="flex flex-col pt-[1vw]">
          <h1 className="text-center">{heading}</h1>
          <h6 className="py-[1vw] text-center">{para}</h6>
        </div>
        <div className="md:space-x-9 space-x-3">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border transition-colors text-gold"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border transition-colors text-gold"
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[3vw]">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            location={event.location}
            price={event.price}
            dateRange={event.dateRange}
            timeToEnd={event.timeToEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default EventSlider;
