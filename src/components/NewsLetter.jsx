import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import smecbanner from "../assets/smec_banner.png";
import qawalibanner from "../assets/qawali_banner.png";
import qawali from "../assets/qawali.png";

// Sample data for the slider
const newsData = [
  {
    id: 1,
    title: "Taylor Swift in Biggest World",
    description:
      "Lorem ipsum dolor donec bibendum laishiaj oi asjfasj alskjfldsakf massa erat the ultrices nulla.",
    author: "Jonathan Wills",
    date: "July 17, 2024",
    time: "5 min read",
    image: smecbanner,
  },
  {
    id: 2,
    title: "Royal Albert Hall New Events",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "Marian Ed",
    date: "June 13, 2024",
    time: "10 min read",
    image: qawalibanner,
  },
  {
    id: 3,
    title: "Yanni Will Be in London",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "Jack Nikelson",
    date: "May 08, 2024",
    time: "7 min read",
    image: qawali,
  },
  {
    id: 4,
    title: "Jazz Night Special Concert",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "Sara Bennett",
    date: "April 22, 2024",
    time: "8 min read",
    image: qawalibanner,
  },
  {
    id: 5,
    title: "Classical Fusion Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "David Turner",
    date: "March 10, 2024",
    time: "6 min read",
    image: smecbanner,
  },
];

const NewsSlider = () => {
  return (
    <div className="bg-gray-100 py-10 px-6 w-[100% ]">
      {/* Newsletter Section */}
      <div className="mb-10 mx-auto w-[100%]">
        <h2 className="text-2xl font-bold text-gray-800">Subscribe to our Newsletter</h2>
        <p className="text-gray-500 mt-2">
          For weekly updates and offers about music events, join us here.
        </p>
        <div className="mt-4 flex items-center w-[100%] gap-1">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-[50px] p-2 border rounded-md focus:outline-none md:w-[50%] w-[100%]"
          />
          <button className="bg-blue-600 md:text-[15px] text-[13px] h-[50px] p-2 text-white rounded-md hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 3 }, // Large screens: 3 cards
          768: { slidesPerView: 2 },  // Tablets: 2 cards
          640: { slidesPerView: 1 },  // Mobile: 1 card
        }}
      >
        {newsData.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-[98%] mx-auto">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="md:p-8 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{news.description}</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>{news.author}</p>
                  <p>
                    {news.date} • {news.time}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All News */}
      <div className="mt-5 text-right">
        <a href="#" className="text-blue-600 font-semibold">
          All News →
        </a>
      </div>
    </div>
  );
};

export default NewsSlider;
