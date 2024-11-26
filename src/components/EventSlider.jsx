import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';
import events from '../data';



const EventSlider = ({ heading , para }) => {
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
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <di className="flex flex-col gap-5 items-center justify-center h-full">
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-bold text-center'>
            {heading}
          </h1>
          <p className='text-xl font-semibold text-center'>
            {para}
          </p>
        </div>
        <div className="space-x-2">
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
      </di>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className="text-white overflow-hidden shadow-lg w-80 "
          >
            <div className="relative w-[90%] m-auto border rounded-lg h-64 bg-black border-purple-300 z-20 ">
              <img
                src={event.image}
                alt="Event image"
                className="object-cover w-full h-full opacity-80 border rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-purple-600 border rounded-b-lg border-purple-300 text-black p-2 flex items-center gap-2">
                <FaClock className="h-4 w-4 " />
                <span className="text-sm">Time to end</span>
                <span className="font-mono text-black">{event.timeToEnd}</span>
              </div>
            </div>
            <div className="p-4  text-black">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h6 className="font-semibold">{event.title}</h6>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <p className="text-xl font-bold text-black">{event.price}</p>
              </div>
              <p className="text-sm text-gray-500 mb-2">{event.dateRange}</p>
            </div>
            <div className="">
              <button className="w-full bg-purple-100 hover:bg-purple-300 text-black font-bold py-2 px-4 rounded transition-colors">
                Explore
              </button>
            </div>
            </div>
        ))}
      </div>

    </div>
  );
};

export default EventSlider;

