import React from "react";
import Navbar from "../components/navbar/Navbar";
import EventSlider from "../components/EventSlider";
import ImageSlider from "../components/ImageSlider";
import NewsSection from "../components/NewsLetter";
import TicketSteps from "../components/TicketSteps";


const Home = () => {
  return (
    <>
      <Navbar />
      <EventSlider heading={"Available Events"} para={"Explore events here"} />
      <TicketSteps/>
      <EventSlider heading={"Upcoming Events"} para={"The best events will be soon!"} />
      <div className="m-10">
      <h1 className="text-4xl font-bold mb-8 text-center mt-8">Amazing  Carousel</h1>
      <ImageSlider  />
      </div>
      <NewsSection/>
    </>
  );
};

export default Home;
