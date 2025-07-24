import { HiOutlineSearch } from "react-icons/hi";
import Button from "@mui/material/Button";

const SearchBox = () => {
  return (
    <div className="searchBox w-full h-[50px] bg-[#e5e5e5] rounded relative flex items-center">
      <input
        type="text"
        placeholder="Search products here..."
        className="h-full w-full text-[15px] p-2 pr-10 rounded focus:outline-none bg-transparent border-none"
      />
      <Button>
        <HiOutlineSearch className="text-3xl absolute right-3 top-[50%] bottom-[50%] transform -translate-y-[50%] text-gray-600 cursor-pointer" />
      </Button>
    </div>
  );
};

export default SearchBox;
