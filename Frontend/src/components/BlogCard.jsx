import { NavLink } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

const BlogCard = ({ data }) => {
  const { id, imgUrl, title, description, LinkText } = data;
  return (
    <div className="w-[100%] my-4 md:w-[48%] lg:w-[31%] xl:w-[23%] group transition-transform duration-300">
      <div className="h-[200px] w-[100%] rounded-md overflow-hidden">
        <img
          src={imgUrl}
          className="h-full w-full rounded-lg object-cover transform transition-transform duration-300 group-hover:scale-105"
          alt=""
        />
      </div>
      <div className="h-[50%] w-full p-2">
        <h5 className="font-semibold">{title.slice(0, 40)}...</h5>
        <p className="my-2 text-gray-400 font-[400]">{description}</p>
        <NavLink className="flex text-gray-400 items-center gap-2" to="/">
          <span>{LinkText}</span>{" "}
          <FaAngleDoubleRight className="text-xl font-[400] text-gray-400" />
        </NavLink>
      </div>
    </div>
  );
};

export default BlogCard;
