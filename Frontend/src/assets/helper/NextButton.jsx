import "./style.css";
import { FaArrowCircleRight } from "react-icons/fa";

const NextArrow = (props) => {
  const { className, onClick } = props; // ✅ include onClick

  return (
    <div
      className={`${className} custom-arrow next right-2`}
      onClick={onClick} // ✅ make it clickable
    >
      <FaArrowCircleRight className="text-black text-4xl" />
    </div>
  );
};

export default NextArrow;
