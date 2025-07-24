import { Button } from "@mui/material";
import { HiMenuAlt2 } from "react-icons/hi";
import { NavData } from "../assets/ConstantData";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import CategoryPanel from "./CategoryPanel";
import { useState } from "react";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end">
          <div className="col_1 w-full md:w-[25%]">
            <Button
              onClick={toggleDrawer(true)}
              className="flex justify-center items-center gap-2"
            >
              <HiMenuAlt2 className="text-3xl text-gray-700" />
              <span className="text-gray-700 font-[550]">
                Shop By Categories
              </span>
              <FaAngleDown className="text-gray-700" />
            </Button>
          </div>

          <div className="col_2 w-[78%] hidden md:flex justify-between items-center">
            <div className="w-full md:w-[45%]">
              <ul className="flex justify-around items-center">
                {NavData?.map((item, index) => (
                  <li key={index} className="group relative">
                    <Link
                      to={item.url}
                      className="text-gray-700 font-[600] hover:text-gray-900 px-2 py-2 inline-flex gap-1 text-[13px] items-center"
                    >
                      {item.text}
                      {item.dropDown && <FaAngleDown />}
                    </Link>

                    {/* First level dropdown */}
                    {item.dropDown && item.subMenu && (
                      <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li className="relative group/sub" key={subIndex}>
                            <Link
                              to={subItem.url}
                              className="block px-4 py-2 text-gray-700 font-[600] hover:bg-gray-50 hover:text-gray-900 flex text-[14px] items-center justify-between"
                            >
                              {subItem.text}
                              {subItem.subCategory && subItem.subMenu && (
                                <FaAngleRight />
                              )}
                            </Link>

                            {/* Second level dropdown */}
                            {subItem.subCategory && subItem.subMenu && (
                              <ul className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-20 invisible group-hover/sub:visible opacity-0 group-hover/sub:opacity-100 transition-all duration-300">
                                {subItem.subMenu.map(
                                  (subSubItem, subSubIndex) => (
                                    <li key={subSubIndex}>
                                      <Link
                                        to={subSubItem.url}
                                        className="block px-4 py-2 font-[600] text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-[14px]"
                                      >
                                        {subSubItem.text}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[23%] justify-end items-center hidden xl:flex">
              <p className="flex items-center font-[600] gap-1 text-[13px]">
                <IoRocketOutline className="text-xl" />{" "}
                <span>Free International Delivery</span>
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Panel */}

      <CategoryPanel
        open={open}
        setOpen={setOpen}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default Navigation;
