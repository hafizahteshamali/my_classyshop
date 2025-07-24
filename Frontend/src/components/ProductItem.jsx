import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { LuGitCompareArrows } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";

const ProductItem = ({ data, setIsModal, setSingleProductId }) => {

  const [isHovered, setIsHovered] = useState(false);

  const { featureImages = [], discount, brand, productName, ratings = 0, oldPrice, salePrice, _id } = data;

  const handleChange = (id) => {
    setIsModal(true);
    setSingleProductId(id);
  };

  return (
    <div
      className="productItem rounded-md p-2 mx-2 border relative overflow-hidden cursor-pointer border-[#949494] bg-[#ffffff] shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="imgWrapper w-full h-[250px] rounded-md overflow-hidden relative">

        {/* Main Image */}
        <img
          src={featureImages[0].url}
          className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-1000 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          alt="product"
        />

        {/* Hover Image */}
        {featureImages[1] && (
          <img
            src={featureImages[1].url}
            className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            alt="product-hover"
          />
        )}
      </div>

      <div className="Info p-3">
        <h6 className="text-[13px]">
          <Link to="/" className="hover:text-gray-400 transition-all duration-100">{brand}</Link>
        </h6>
        <h4 className="text-[13px] font-[500] text-[rgba(0, 0, 0, 0.9)] mt-2 hover:text-[#ff5252] transition-all duration-100">
          <Link to="/">{productName?.slice(0, 20)}...</Link>
        </h4>

        <Rating name="size-small" value={ratings} size="small" readOnly />

        <div className="w-full flex justify-between items-center mt-2">
          <span className="line-through text-gray-400">Rs: {oldPrice}</span>
          <span className="text-[#ff5252] font-semibold">Rs: {salePrice}</span>
        </div>
      </div>

      {discount && (
        <span className="bg-red-500 py-1 px-2 rounded-lg text-white absolute top-[15px] left-[20px]">{discount}%</span>
      )}

      <div className={`flex flex-col justify-center items-center gap-5 absolute ${isHovered == true ? "top-[10%] opacity-100" : "-top-[40%] opacity-0"} right-[20px] transition-all duration-800`}>
        <MdOutlineZoomOutMap onClick={() => handleChange(_id)} className="text-[16px] h-[40px] w-[40px] rounded-full bg-white p-1.5 hover:text-[#ff5252] transition-all duration-200" />
        <LuGitCompareArrows className="text-[16px] h-[40px] w-[40px] rounded-full bg-white p-1.5 hover:text-[#ff5252] transition-all duration-200" />
        <IoMdHeartEmpty className="text-[16px] h-[40px] w-[40px] rounded-full bg-white p-1.5 hover:text-[#ff5252] transition-all duration-200" />
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); /* Add-to-cart logic here */ }}
        className="flex justify-center items-center text-[13px] gap-2 mx-auto text-[#ff5252] border border-[#ff5252] hover:bg-black hover:text-white hover:border-black transition-all duration-700 h-[40px] w-[95%] rounded-md mt-2"
      >
        <IoCart className="text-2xl" />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductItem;
