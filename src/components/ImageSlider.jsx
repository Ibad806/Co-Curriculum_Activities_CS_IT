import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const images = [
  "https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0",
  "https://live.staticflickr.com/65535/49049007453_c0c4b272ca_o.jpg",
  "https://th.bing.com/th/id/OIP.voLVMJX4Uka6I99CIPCv6QHaE8?w=2560&h=1707&rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0",
  "https://live.staticflickr.com/65535/49049007453_c0c4b272ca_o.jpg"
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full mx-auto h-96">
      <div className="relative h-full overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
}

export default ImageSlider;

