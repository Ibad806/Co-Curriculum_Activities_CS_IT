import React from "react";
import EventSlider from "../components/EventSlider";
import ImageSlider from "../components/ImageSlider";
import NewsSection from "../components/NewsLetter";
import TicketSteps from "../components/TicketSteps";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"


const Home = () => {
 
  return (
    <>
    <Navbar/>
      <EventSlider heading={"Available Events"} para={"Explore events here"} />
      <TicketSteps />
      <EventSlider
        heading={"Upcoming Events"}
        para={"The best events will be soon!"}
      />
      <div className="m-10">
        <ImageSlider />
      </div>
      <NewsSection />
      <Faq />
      <Footer />
      
    </>
  );
};

export default Home;
