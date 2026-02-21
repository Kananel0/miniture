import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const TopBar = () => {
  return (
    <div className="border-b bg-gray-50 p-2">
      <div className="w-full lg:w-10/12 m-auto px-4 lg:px-0">
        <ul className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          
          {/* Left Side: Delivery Info */}
          <li className="flex items-center text-center md:text-left">
            <Icon />
            <span className="ml-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 uppercase tracking-tight">
              Get Express Delivery All over Nepal
            </span>
          </li>

          {/* Right Side: Quick Links */}
          <li className="flex items-center divide-x divide-gray-300">
            <Link 
              to="/stores" 
              className="px-2 md:px-4 text-[10px] sm:text-xs md:text-sm hover:text-red-600 transition-colors"
            >
              Our Stores
            </Link>
            <Link 
              to="/privacy" 
              className="px-2 md:px-4 text-[10px] sm:text-xs md:text-sm hover:text-red-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/faqs" 
              className="px-2 md:px-4 text-[10px] sm:text-xs md:text-sm hover:text-red-600 transition-colors"
            >
              FAQs
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default TopBar;