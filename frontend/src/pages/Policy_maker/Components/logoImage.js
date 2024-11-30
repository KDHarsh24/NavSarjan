import React, { useState, useEffect } from "react";
import Gujaratlogo from "../Assets/gujrat_logo.png";
import nationalSymbol from "../Assets/national_symbol.png";

const Header = () => {
  const [userName] = useState("Aditya Aryan Singh"); // Replace with dynamic name
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName("");
    let i = 0;
    const interval = setInterval(() => {
      if(i === 0) {
        setDisplayName((prev) => prev + userName[i]);
        i++;
      } else if (i < userName.length) {
        setDisplayName((prev) => prev + userName[i-1]);
        i++;
      } else {
        clearInterval(interval); 
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, [userName]);

  return (
    <div className="bg-orange-500 flex flex-col md:flex-row justify-between items-center p-4 px-10">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <img src={Gujaratlogo} alt="NavSarjan Logo" className="h-20 w-20" />
        <div>
          <h1 className="text-lg font-bold text-maroon">NavSarjan</h1>
          <p className="text-sm text-black">A Govt. of Gujarat initiative</p>
        </div>
      </div>

      {/* Center Section - Welcome Message */}
      <div className="text-center mt-4 md:mt-0">
        <h1 className="text-3xl font-bold text-black">Welcome !</h1>
        <h2 className="text-2xl font-semibold text-maroon">{displayName}</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center flex-col mt-4 md:mt-0">
        <img src={nationalSymbol} alt="Government Emblem" className="h-16 w-12" />
        <h2 className="text-lg font-bold text-maroon-900">Government of Gujarat</h2>
      </div>
    </div>
  );
};

export default Header;
