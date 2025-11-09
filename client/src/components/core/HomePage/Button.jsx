import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          active 
            ? "bg-yellow-50 text-black hover:bg-yellow-100 hover:scale-105 shadow-lg hover:shadow-yellow-50/50" 
            : "bg-richblack-800 text-richblack-5 hover:bg-richblack-700 border border-richblack-700 hover:scale-105"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;