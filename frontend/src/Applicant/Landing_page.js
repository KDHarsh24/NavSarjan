import React, { useState } from "react";
import { AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { FaPhone, FaFacebookSquare, FaInstagram, FaTwitterSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Somepath from "./Somepath";
import NvidiaImage from './Images/Nvidia.jpeg';
import ZomatoImage from './Images/Zomato.jpg';
import SwiggyImage from './Images/Swiggy.webp';
import blinkitimage from'./Images/blinkit.jpeg';
import Atlassianimage from'./Images/Atlassian.png';
import Zeptoimage from './Images/Zepto.jpeg';

function Landing_Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <div className="w-full px-8 py-4 bg-red-500 flex items-center justify-between">
  {/* Search Bar */}
  <form className="w-full max-w-md">
    <div className="relative">
      <input
        type="search"
        placeholder="Search project"
        className="w-full p-3 pl-10 pr-12 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 rounded-full hover:bg-green-600 transition duration-200">
        <AiOutlineSearch size={20} className="text-white" />
      </button>
    </div>
  </form>

  {/* Notification Icon and Dropdown */}
  <div className="relative ml-4">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <IoIosNotifications className="text-2xl text-gray-600" />
    </button>

    {/* Dropdown Menu */}
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Link 1
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Link 2
          </a>
        </div>
      </div>
    )}
  </div>
</div>

      {/* Hero Section */}
      <div className="text-center my-6">
        <RiGovernmentLine className="mx-auto text-5xl text-blue-600" />
        <h2 className="text-3xl font-extrabold text-gray-800 ">NavSarjan</h2>
        <h3 className="text-lg font-semibold text-gray-800">
          An Initiative of Gujarat Government
        </h3>
        <nav className="mt-4 space-x-4">
          <Link to="/Somepath" className="text-blue-700 hover:underline">
            HOME
          </Link>
          <Link to="/Somepath" className="text-blue-700 hover:underline">
            ABOUT
          </Link>
          <Link to="/Somepath" className="text-blue-700 hover:underline">
            UPDATES
          </Link>
          <Link to="/Somepath" className="text-blue-700 hover:underline">
            COMMUNITY
          </Link>
          <Link to="/Somepath" className="text-blue-700 hover:underline">
            PROGRAM
          </Link>
        </nav>
      </div>

      {/* Card Section */}
      <div className="flex justify-center my-6">
        <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Apply for Startup
          </h3>
          <p className="mt-4 text-gray-600">
            Applications from startups in tech & deep tech domains are open
            yearly. The startups will be provided with state-of-the-art
            technology labs, specialized researchers, technical & business
            mentors, and world-class infrastructure.
          </p>
          <Link to="/Somepath">
            <button className="mt-4 w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
     {/* Existing projects or Successful Projects */}
     <div className="text-center">
        <h2 className="text-black text-2xl font-bold">Our Successful Startups</h2>
    </div>

 
<div className="flex justify-center items-center gap-6 p-6 flex-wrap transition-all ease-in-out">
    {/* Nvidia Image */}
    <div className="image-item group w-52 h-52 overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg">
        <img src={NvidiaImage} alt="Nvidia Image" className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
    </div>

    {/* Zomato Image */}
    <div className="image-item group w-52 h-52 overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg">
        <img src={ZomatoImage} alt="Zomato Image" className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
    </div>

    {/* Swiggy Image */}
    <div className="image-item group w-52 h-52 overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg">
        <img src={SwiggyImage} alt="Swiggy Image" className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
    </div>

    {/* Atlassian Image */}
    <div className="image-item group w-52 h-52 overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg">
        <img src={Atlassianimage} alt="Atlassian Image" className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
    </div>

    {/* Blinkit Image */}
    <div className="image-item group w-52 h-52 overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg">
        <img src={blinkitimage} alt="Blinkit Image" className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
    </div>

    {/* Zepto Image */}
    <div className="image-item group w-52 h-52 overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg">
        <img src={Zeptoimage} alt="Zepto Image" className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
    </div>
</div>

      {/* Footer */}
      <footer className="mt-8 p-6 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-white">
        <div className="text-center">
          <label className="flex justify-center items-center space-x-2">
            <AiOutlineMail />
            <p>navsarjan@gmail.com</p>
          </label>
          <label className="flex justify-center items-center space-x-2 mt-2">
            <FaPhone />
            <p>+919876543210</p>
          </label>
          <div className="flex justify-center space-x-4 mt-4">
            <FaFacebookSquare className="text-blue-200 hover:text-blue-400 transition duration-200" />
            <FaInstagram className="text-pink-200 hover:text-pink-400 transition duration-200" />
            <FaTwitterSquare className="text-blue-200 hover:text-blue-400 transition duration-200" />
            <FaLinkedin className="text-blue-200 hover:text-blue-400 transition duration-200" />
            <FaYoutube className="text-red-200 hover:text-red-400 transition duration-200" />
          </div>
        </div>
      </footer>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/Somepath" element={<Somepath />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
