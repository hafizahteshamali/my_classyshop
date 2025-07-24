import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getReq } from "../api/axios";

const Modal = ({ singleProductId, setIsModal }) => {
  const [singleProduct, setsingleProduct] = useState(null);
  const [isImg, setIsImg] = useState(0);
  const [imgAnimClass, setImgAnimClass] = useState("");
  const [count, setCount] = useState(1); // default to 1

  const fetchProduct = async () => {
    try {
      const response = await getReq(`/products/${singleProductId}`);
      setsingleProduct(response?.data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [singleProductId]);

  useEffect(() => {
    setImgAnimClass("slide-in-right");
    const timer = setTimeout(() => setImgAnimClass(""), 500);
    return () => clearTimeout(timer);
  }, [isImg]);

  if (!singleProduct) return null;

  const {
    images = [],
    productName,
    brand,
    ratings,
    oldPrice,
    salePrice,
    stock,
    description,
    size = [],
  } = singleProduct;

  const DecreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const IncreaseCount = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000088] z-50 px-2">
  <div className="w-[90%] lg:w-[75%] max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-lg p-4 flex flex-col lg:flex-row gap-4 animate-zoomIn transition-all duration-300 relative">
    
    {/* Close Button */}
    <div
      className="h-[35px] w-[35px] bg-gray-200 absolute top-3 right-3 rounded-full flex justify-center items-center cursor-pointer"
      onClick={() => setIsModal(false)}
    >
      <span>X</span>
    </div>

    {/* Image Section */}
    <div className="flex flex-col mt-[50px] lg:flex-row lg:mt-0 w-full lg:w-[48%] gap-2">
      
      {/* Thumbnail List */}
      <div className="flex justify-center items-center lg:flex-col lg:justify-start gap-2 overflow-x-auto order-2 lg:order-1 lg:overflow-y-auto py-1.5 lg:w-[20%]">
        {images.map((item, index) => (
          <div
            key={index}
            className={`min-w-[60px] lg:w-[70px] h-[60px] lg:h-[70px] rounded cursor-pointer border ${isImg === index ? "border-black" : "border-gray-300"}`}
          >
            <img
              src={item.url}
              onClick={() => setIsImg(index)}
              alt={`product-${index}`}
              className="h-full w-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="h-[300px] lg:h-[400px] order-1 lg:order-2 flex justify-center items-center overflow-hidden w-full">
        <img
          src={images[isImg]?.url}
          alt=""
          className={`max-h-full max-w-full object-contain rounded ${imgAnimClass}`}
        />
      </div>
    </div>

    {/* Product Details */}
    <div className="w-full lg:w-[48%] space-y-3">
      <h1 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">{productName}</h1>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
        <h4 className="text-sm font-medium">Brand: <span className="text-gray-500">{brand}</span></h4>
        <div className="flex items-center gap-1">
          <Rating name="read-only" value={ratings} readOnly size="small" />
          <span className="text-gray-500 text-sm">Review (8)</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
        <h3 className="text-lg lg:text-xl font-semibold">
          <span className="line-through text-gray-500">Rs: {oldPrice}</span>{" "}
          <span className="text-[#ff5252]">Rs: {salePrice}</span>
        </h3>
        <p>Stock: <span className="text-green-700 font-semibold">{stock} Items</span></p>
      </div>

      <p className="text-gray-600 text-sm text-center lg:text-left">{description}</p>

      <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
        <h4 className="font-medium">SIZE:</h4>
        {size.map((item, index) => (
          <div key={index} className="h-[35px] px-2 flex justify-center items-center border rounded text-sm text-gray-700">
            {item}
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center lg:text-left">Free Shipping (Est. Delivery Time 2-3 Days)</p>

      {/* Quantity Counter */}
      <div className="flex items-center justify-center lg:justify-between p-2 gap-2 mt-2">
        <div className="h-[45px] w-[100px] border border-gray-300 rounded-md flex overflow-hidden">
          <div className="h-full w-[40%] flex flex-col items-center justify-center border-r">
            <IoIosArrowUp onClick={IncreaseCount} className="text-gray-600 cursor-pointer hover:text-black" />
            <IoIosArrowDown onClick={DecreaseCount} className="text-gray-600 cursor-pointer hover:text-black" />
          </div>
          <div className="h-full w-[60%] flex items-center justify-center text-gray-700 font-semibold">
            {count}
          </div>
        </div>

        <button className="bg-black text-white h-[45px] w-[50%] border-none outline-none rounded-md">ADD TO CART</button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Modal;
