import React from "react";
import Smec_main from "../components/Smec_main";
import Navbar from "../components/Navbar";
import Gamecard from "../components/Gamecard";
import Smeccard from "../components/Smeccard";
import Smeccategory from "../components/Smeccategory";
import Smecslider from "../components/Smecslider";
import Smecwinners from "../components/Smecwinners";
import Smecsponsors from "../components/Smecsponsers";
import Footer from "../components/Footer";
import SponsorSlider from "../components/SponsorSlider";
import ImageSlider from "../components/ImageSlider";
import BlackNavbar from "../components/BlackNavbar";

const Smec = () => {
  return (
    <>
      <BlackNavbar />
      <Smec_main />
      <Smeccategory />
      <ImageSlider />
      <Smecwinners />
      <Smecsponsors />
      {/* <SponsorSlider /> */}
      <Footer footercolor="bg-black" footertext="text-white" />
    </>
  );
};

export default Smec;
