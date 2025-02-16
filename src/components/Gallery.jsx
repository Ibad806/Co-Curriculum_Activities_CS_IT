import React, { useState } from "react";
import image1 from "../assets/egamecard.png";
import image2 from "../assets/egaming_banner.png";
import image3 from "../assets/geekcard.png";
import image4 from "../assets/geeks_banner.png";
import image5 from "../assets/egamecard.png";
import image6 from "../assets/egaming_banner.png";
import image7 from "../assets/geekcard.png";

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image7,
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => openModal(src)}
          >
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold">Gallery Item {index + 1}</h3>
              <p className="text-sm mt-2">A beautiful glimpse into our world.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-3xl w-full transform scale-0 transition-transform duration-500 ease-out"
            style={{
              transform: modalOpen ? "scale(1)" : "scale(0)",
            }}
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-800 transition-all duration-300"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default Gallery;
