import React, { useState } from "react";
import image1 from "../assets/egamecard.png";
import image2 from "../assets/egaming_banner.png";
import image3 from "../assets/geekcard.png";

const ImageSlider = () => {
  const images = [image1, image2, image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center justify-center py-5  md:px-0 px-0 w-[100%]">
      <div className="relative md:w-[100%] w-[100%]">
        <div
          className="overflow-hidden"
          style={{
            borderWidth: "6px",
            borderStyle: "solid",
            borderImage:
              "linear-gradient(to bottom, grey, rgba(54, 39, 39, 0.8)) 1",
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full md:h-[500px] h-[350px] object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        >
          &#8592; {/* Left Arrow */}
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        >
          &#8594; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
