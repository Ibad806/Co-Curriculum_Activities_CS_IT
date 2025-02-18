import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { newsData } from "../data";

// Sample data for the slider


const NewsSlider = () => {
  const subscribe = () => {
alert("Subscribed successfully!")
};
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white py-10 px-6 w-full">
      {/* Newsletter Section */}
      <div className="mb-12 mx-auto w-full ">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated with Our News</h2>
        <p className="text-gray-600 mb-6">
          Sign up to receive the latest updates on music events, offers, and more.
        </p>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 px-4 border rounded-lg focus:outline-none shadow-md w-72"
          />
          <button onClick={subscribe} className="bg-blue-600 text-white text-lg px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        className="p-10"
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
      >
        {newsData.map((news) => (
          <>
          <div className=" ">
          <SwiperSlide key={news.id}>
            <Link to={`/all-news/${news.id}`} key={news.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{news.title}</h3>
                  {/* Apply line-clamp to limit description to 2 lines */}
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {news.description}
                  </p>
                  <div className="mt-4 text-sm text-gray-400">
                    <p>{news.author}</p>
                    <p>
                      {news.date} • {news.time}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          </div>
          </>
        ))}
      </Swiper>

      {/* View All News */}
      <div className="mt-5 text-right">
        <Link to="/all-news" className="text-blue-600 font-semibold">
          All News →
        </Link>
      </div>
    </div>
  );
};

export default NewsSlider;
