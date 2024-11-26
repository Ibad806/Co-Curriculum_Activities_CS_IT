import React from "react";
import Navbar from "../components/navbar/Navbar";
import EventSlider from "../components/EventSlider";
import ImageSlider from "../components/ImageSlider";

const images = [
  'https://media.licdn.com/dms/image/v2/D4D0BAQHBgWvpjFKFoA/company-logo_200_200/company-logo_200_200/0/1701371739326?e=1740614400&v=beta&t=oWycWdM29ZnyWV-jBEdYk2d8hNgvZ_8zbhU6SJ7sKeI',
  '/placeholder.svg?height=400&width=800',
  'https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/OIP.voLVMJX4Uka6I99CIPCv6QHaE8?w=2560&h=1707&rs=1&pid=ImgDetMain',
  'https://live.staticflickr.com/65535/49049007453_c0c4b272ca_o.jpg',
]

const Home = () => {
  return (
    <>
      <Navbar />
      <EventSlider heading={"Available Events"} para={"Explore events here"} />
      <ImageSlider images={images} />
      <EventSlider heading={"Upcoming Events"} para={"The best events will be soon!"} />
    </>
  );
};

export default Home;
