import React from "react";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import { PopularProduct } from "../assets/ConstantData";
import NextArrow from "../assets/helper/NextButton";
import PrevArrow from "../assets/helper/PrevButton";

const ProductSlider = ({ item, Productdata, latestProd, setIsModal, setSingleProductId }) => {
  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: item,
    slidesToScroll: 1,
    nextArrow: <NextArrow className="bg-white text-black" />,
    prevArrow: <PrevArrow className="bg-white text-black" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="productsSlider my-8 w-full">
      {latestProd && <h1 className="text-2xl font-semibold">{latestProd}</h1>}

      <Slider {...settings} className="w-full py-5">
        {Productdata?.map((item, index) => (
          <ProductItem key={index} data={item} setIsModal={setIsModal} setSingleProductId={setSingleProductId} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
