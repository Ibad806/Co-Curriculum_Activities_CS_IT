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

const Smec = () => {
  return (
    <>
      <Navbar navcolor='bg-black'/>
      <Smec_main />
      <Smeccategory/>
      <Smecslider/>
      <Smecwinners/>
      {/* <Smecsponsors/> */}
      <SponsorSlider/>
      <Footer/>
    </>
  );
};

export default Smec;
