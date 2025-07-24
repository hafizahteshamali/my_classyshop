import { FaArrowCircleLeft } from "react-icons/fa";
import "./style.css";

const PrevArrow = (props) => {
  const { className, onClick } = props;

  return (
    <div
      className={`${className} custom-arrow  prev left-2`}
      onClick={onClick} // ✅ This is required
    >
      <FaArrowCircleLeft className="text-black text-4xl" />
    </div>
  );
};

export default PrevArrow;
