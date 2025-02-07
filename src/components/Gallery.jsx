import React from "react";
import image1 from "../assets/egamecard.png";
import image2 from "../assets/egaming_banner.png";
import image3 from "../assets/geekcard.png";
import image4 from "../assets/geeks_banner.png";
import image5 from "../assets/egamecard.png";
import image6 from "../assets/egaming_banner.png";
import image7 from "../assets/geekcard.png";

const Gallery = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center text-5xl font-bold mb-6">
        Our Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;