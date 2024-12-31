import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, EffectFade } from "swiper/modules";
import image1 from "../assets/egamecard.png";
import image2 from "../assets/egaming_banner.png";
import image3 from "../assets/geekcard.png";

const ImageSlider = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-700 via-blue-500 to-gray-200">
      <Swiper
        navigation={true}
        effect="fade"
        modules={[Navigation, EffectFade]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            src={image1}
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image2}
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image3}
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image1}
            alt="Slide 4"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image3}
            alt="Slide 5"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSlider;