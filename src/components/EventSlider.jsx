import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import events from "../data";
import EventCard from "./EventCards";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AppRoutes } from "../constant/constant";
import axios from "axios";

const EventSlider = ({ heading, para }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(AppRoutes.event);
        console.log("Fetched events:", response.data);

        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative w-full py-[3vw] md:px-8 px-4 ">
      <div className="flex flex-col gap-[1vw] items-center justify-center">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl md:text-3xl font-bold">{heading}</h1>
          <h6 className="text-sm md:text-base text-gray-600 py-4">{para}</h6>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
        className="mt-8"
      >
        {events.length > 0 ? (
          events.map((event) => (
            <SwiperSlide key={event.id} className="flex justify-center items-center">
              <EventCard
                image={event.eventimageurl}
                title={event.title}
                location={event.locationDetails}
                price={event.ticketPrice}
                dateRange={event.startdate}
                timeToEnd={event.registrationDeadline}
                daysLeft={event.daysLeft}
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center w-full py-10 text-gray-500">No events found.</div>
        )}

      </Swiper>
      <div className="flex justify-center mt-2 space-x-4">
        <FaArrowAltCircleLeft className="swiper-prev cursor-pointer text-gray-500 hover:text-gray-800" size={40} />
        <FaArrowAltCircleRight className="swiper-next cursor-pointer text-gray-500 hover:text-gray-800" size={40} />
      </div>
    </div>
  );
};

export default EventSlider;
