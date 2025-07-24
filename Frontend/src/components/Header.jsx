import { Link } from "react-router-dom";
import Search from "./Search";
import Badge from "@mui/material/Badge";
import { LuGitCompareArrows } from "react-icons/lu";
import { IoCart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-300">
        <div className="container">
          <div className="hidden md:flex items-center justify-between md:flex-row">
            <div className="col1 w-[100%] md:w-[50%] md:text-left text-center">
              <p className="text-[14px]">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            <div className="col2 flex md:justify-end items-center md:w-full">
              <ul className="flex items-center w-full md:w-[30%] justify-between gap-2 md:flex-row">
                <li>
                  <Link
                    className="hover:text-[var(--colorPrimary)] transition"
                    to="/help-center"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-[var(--colorPrimary)] transition"
                    to="/ordert-tracking"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-5 border-b-[1px] border-gray-300">
        <div className="container mx-auto flex md:flex-row gap-5 items-center justify-between">
          <div className="col1 w-full md:w-[25%] flex justify-start">
            <Link to="/">
              <img src="/assets/images/logo.jpg" alt="" />
            </Link>
          </div>
          <div className="col2 hidden md:block w-full md:w-[45%] ">
            <Search />
          </div>
          <div className="col3 w-full md:w-[30%] md:pl-7 flex md:justify-end items-center">
            <ul className="flex items-center justify-end md:justify-between gap-5 w-full">
              <li className="hidden md:block">
                <Link
                  className="hover:text-[var(--bgPrimary)] transition text-[15px] font-[600]"
                  to="/login"
                >
                  Login
                </Link>{" "}
                | &nbsp;
                <Link
                  className="hover:text-[var(--bgPrimary)] transition text-[15px] font-[600]"
                  to="/register"
                >
                  Register
                </Link>
              </li>
              <li className="hidden md:block">
                <Tooltip title="Compare">
                  <IconButton>
                    <Badge badgeContent={4} color="error">
                      <LuGitCompareArrows
                        className="text-3xl hover:text-[var(--colorPrimary)]"
                        color="action"
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
              <li className="hidden md:block">
                <Tooltip title="Wishlist">
                  <IconButton>
                    <Badge badgeContent={4} color="error">
                      <IoMdHeartEmpty
                        className="text-3xl hover:text-[var(--colorPrimary)]"
                        color="action"
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Cart">
                  <IconButton>
                    <Badge badgeContent={4} color="error">
                      <IoCart
                        className="text-3xl hover:text-[var(--colorPrimary)]"
                        color="action"
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
