import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image1 from "../assets/egamecard.png";
import image2 from "../assets/egaming_banner.png";
import image3 from "../assets/geekcard.png";
import image4 from "../assets/geeks_banner.png";
import image5 from "../assets/egamecard.png";
import image6 from "../assets/egaming_banner.png";
import image7 from "../assets/geekcard.png";

const MainGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image5,
    image6,
    image7,
  ];

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement("a");
      link.href = selectedImage;
      link.download = "downloaded_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-28">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
          Gallery
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg mb-8">
          You can see all the images here
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ width: "300px", height: "200px" }} // Fixed size for all images
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="w-[800px] h-[600px] object-cover rounded-lg" 
            />
            {/* download image */}
            <button 
              type="button" 
              className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded mt-2 block mx-auto"
              onClick={handleDownload}
            >
              Download Image
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MainGallery;