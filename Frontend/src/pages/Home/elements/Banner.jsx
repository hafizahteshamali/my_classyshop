import React from "react";
import Slider from "react-slick";

import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { sideProducts, slides } from "../../../assets/ConstantData";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto mb-[50px]">
      {/* Main Carousel */}
      <div className="relative w-full lg:w-3/4 overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => {
            const {isligt} = slide;
            return(
              <div key={slide.id} className={isligt ? "min-w-full h-[400px] bg-pink-200 relative flex items-center" : "min-w-full h-[400px] bg-[#E7E1BF] relative flex items-center"}>
              <div className="flex flex-col md:flex-row items-center justify-between w-full px-8">
                <div className="w-full md:w-1/2 flex justify-center">
                  <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-[100%] object-cover" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <p className="text-gray-700">{slide.tag}</p>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800">{slide.title}</h2>
                  <div className="space-y-2">
                    <p className="text-lg">Starting At Only</p>
                    <p className="text-3xl md:text-5xl font-bold text-pink-500">{slide.price}</p>
                  </div>
                  <button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-md uppercase font-medium transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
        >
          <FiChevronRight className="text-2xl" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-pink-500 w-4" : "bg-gray-300"
              } transition-all`}
            />
          ))}
        </div>
      </div>

      {/* Side Products */}
      <div className="w-full lg:w-1/4 space-y-4 flex flex-col justify-between">
        {sideProducts.map((product) => (
          <div key={product.id} className={`${product.bgColor} rounded-lg p-4 flex flex-col h-[175px]`}>
            <div className="flex justify-between items-center">
              <div className="space-y-2 w-1/2">
                <h3 className="font-medium text-gray-800">{product.title}</h3>
                <p className="font-bold text-xl text-gray-900">{product.price}</p>
                <a href="#" className="inline-block text-gray-700 hover:text-gray-900 font-medium uppercase text-sm">
                  Shop Now
                </a>
              </div>
              <div className="w-1/2 flex justify-end">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-[100px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
