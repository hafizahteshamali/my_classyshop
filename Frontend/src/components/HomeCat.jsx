import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

const HomeCat = ({ categoriesData }) => {
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,         // Note the lowercase 'autoplay'
  autoplaySpeed: 2000,    // Adjust the speed as needed
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // screens < 1280px
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024, // screens < 1024px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768, // screens < 768px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // screens < 640px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // screens < 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-[95%] mx-auto p-2 mb-[50px]">
      <Slider className="mx-auto w-full" {...settings}>
        {categoriesData.map((item, index) => {
          return (
            <NavLink key={index} to={item.catLink}>
              <div className="h-[150px] w-[150px] bg-white rounded flex flex-col gap-2 justify-center items-center mx-auto">
                <img
                  src={item.catImg}
                  className="h-[70px] w-[80px] object-contain"
                  alt=""
                />
                <p>{item.catName}</p>
              </div>
            </NavLink>
          );
        })}
      </Slider>
    </div>
  );
};

export default HomeCat;
