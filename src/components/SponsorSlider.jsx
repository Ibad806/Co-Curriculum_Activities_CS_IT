import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sponsors = [
  { id: 1, src: "https://vectorseek.com/wp-content/uploads/2023/07/Bahria-Town-Logo-Vector.svg-.png", alt: "NexaLab" },
  { id: 2, src: "https://seeklogo.com/images/A/allied-bank-limited-abl-logo-BC9B3FF50C-seeklogo.com.png", alt: "CaterSpot" },
  { id: 3, src: "https://logodix.com/logo/936665.png", alt: "BuddyAI" },
  { id: 4, src: "https://graficsea.com/wp-content/uploads/2022/02/MCB-Bank-Logo-.png", alt: "BuildLab" },
  { id: 5, src: "https://th.bing.com/th/id/R.6c51302c5649a6a8b98767feb3ac02af?rik=zytGxeOPSEsR7w&pid=ImgRaw&r=0", alt: "Trendly" },
  { id: 6, src: "https://iospak.net/wp-content/uploads/2023/10/Sindh-Police.png", alt: "Mesur.io" },
  { id: 7, src: "https://bimtech.oclits.com/wp-content/uploads/2022/03/SSUET-Logo.png", alt: "SuperDev" },
];

const SponsorSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relative bg-black w-full py-[80px]">
      <div className="bg-black py-8 px-6 w-[80%] mx-auto ">
        <h2 className="text-center text-[40px] md:text-[60px] font-semibold pb-[100px] text-gray-300">
          Gold Sponsor
        </h2>
        <div className="relative">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-black to-transparent z-10"></div>
          <Slider {...settings}>
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex items-center justify-center px-20">
                <img
                  src={sponsor.src}
                  alt={sponsor.alt}
                  className="w-[500px] h-[500px] object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SponsorSlider;
