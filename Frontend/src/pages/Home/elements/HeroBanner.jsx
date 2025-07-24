import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { bannerImg } from "../../../assets/ConstantData";

const HeroBanner = () => {
  return (
    <>
      <div className="w-[98%] mx-auto rounded-[20px] my-5">
        <Swiper
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {bannerImg.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  className="h-[100%] rounded-[20px] w-full"
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default HeroBanner;
