import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';

const events = [
  {
    id: 1,
    title: "50,000 Fans",
    image: "https://via.placeholder.com/400",
    location: "Manchester",
    dateRange: "June 13 - June 15",
    price: "$499.99",
    timeToEnd: "15D, 12:45:03"
  },
  {
    id: 2,
    title: "Qawali Night",
    image: "https://via.placeholder.com/400",
    location: "London",
    dateRange: "June 14 - June 19",
    price: "$799.99",
    timeToEnd: "15D, 08:45:03"
  },
  {
    id: 3,
    title: "SMEC",
    image: "https://via.placeholder.com/400",
    location: "Bristol",
    dateRange: "June 15 - June 18",
    price: "$199.99",
    timeToEnd: "14D, 11:34:03"
  },
  {
    id: 4,
    title: "Tech Conference",
    image: "https://via.placeholder.com/400",
    location: "Birmingham",
    dateRange: "June 20 - June 22",
    price: "$299.99",
    timeToEnd: "13D, 15:22:01"
  }
];

const EventSlider = () => {
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
        Upcoming Events
      </h1>
      <p className='text-xl font-semibold text-center'>
        Explore our upcoming events
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
          <div key={event.id} className="= text-white rounded-lg overflow-hidden shadow-lg border border-gold">
            <div className="relative h-48 bg-gradient-to-b from-black to-gray-800 flex items-center justify-center">
              <div className="text-4xl font-bold">{event.title}</div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-black">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.location}</p>
                </div>
                <p className="text-xl font-bold text-gold">{event.price}</p>
              </div>
              <p className="text-sm text-gray-400">{event.dateRange}</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                <FaClock className="h-4 w-4 text-gold" />
                <span>Time to end</span>
                <span className="font-mono text-gold">{event.timeToEnd}</span>
              </div>
            </div>
            <div className="p-4 pt-0">
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

