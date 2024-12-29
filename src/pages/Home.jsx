import React from "react";
import EventSlider from "../components/EventSlider";
import ImageSlider from "../components/ImageSlider";
import NewsSection from "../components/NewsLetter";
import TicketSteps from "../components/TicketSteps";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Availableevents from "../components/Availableevents";
import Cacmain from "../components/Cacmain";

const Home = () => {
  return (
    <>
      <Navbar navcolor="bg-white" />
      <Cacmain/>
      <Availableevents />
      <TicketSteps />
      <EventSlider
        heading={"Upcoming Events"}
        para={"The best events will be soon!"}
      />

      <ImageSlider />

      <NewsSection />
      <Faq />
      <Footer footercolor="bg-white" footertext="text-blac" />
    </>
  );
};

export default Home;
