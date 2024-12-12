import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiAlignRight, FiXCircle } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import logo from './Images/logo.jpg';
import Carousal from "./Carousal";
import Services from "./Services";
import About from "./About";
import Blog from "./Blog";
import { Component } from "./Footer";
import Marque from "./Marque";
import Countup from './Countup';
import Header from './Header';
import { Button } from '@mui/material';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return ( 
        <>
            <Header />
            <div className="bg-white shadow relative">
                <div className="container">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="header__middle__logo">
                            <NavLink exact to="/" activeClassName='is-active'>
                                <img src={logo} alt="logo" className="h-10" />
                            </NavLink>
                        </div>

                        {/* Responsive Menu Button */}
                        <div className="md:hidden">
                            <button 
                                className="text-2xl focus:outline-none" 
                                onClick={toggleMenu}
                                aria-label="Toggle mobile menu"
                            >
                                {isMenuOpen ? <FiXCircle /> : <FiAlignRight />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex space-x-6">
                                <li>
                                    <NavLink 
                                        exact 
                                        to="/" 
                                        className="text-black  py-2 active:bg-gray-200 flex items-center"
                                    >
                                        <IoHomeOutline className="mr-2" /> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Gujarat_Policy"
                                        className="text-black py-2 active:bg-gray-200 flex items-center"
                                    >
                                        Policies
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/Services"
                                        className="text-black py-2 active:bg-gray-200 flex items-center"
                                    >
                                        Ecosystem Support
                                    </NavLink>
                                </li>
                                
                                <li>
                                    <NavLink 
                                        to="/Footer" 
                                        className="text-black block px-4 py-2 active:bg-gray-200"
                                    >
                                        Contact Us
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/sign-page"
                                        className="text-gray-700 px-4 py-2 active:text-blue-500"
                                    >
                                        <Button variant="contained" color="primary">
                                            Login
                                        </Button>
                                    </NavLink>
                                </li> 
                            </ul>
                        </nav>
                    </div>

                    {/* Mobile Menu - Fixed to show full width */}
                    {isMenuOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}>
                            <div 
                                className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-lg overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 border-b flex justify-between items-center">
                                    <img src={logo} alt="logo" className="h-10" />
                                    <button 
                                        onClick={toggleMenu} 
                                        className="text-2xl focus:outline-none"
                                    >
                                        <FiXCircle />
                                    </button>
                                </div>
                                <nav>
                                    <ul>
                                        <li>
                                            <NavLink 
                                                exact 
                                                to="/" 
                                                activeClassName='is-active' 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu();
                                                }} 
                                                className=" px-4 py-3 text-black active:bg-gray-100 flex items-center"
                                            >
                                                <IoHomeOutline className="mr-2" /> Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/Gujarat_Policy"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu();
                                                }}
                                                className="block px-4 py-3 text-black active:bg-gray-100"
                                            >
                                                Policies
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/Services"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu();
                                                }}
                                                className="block px-4 py-3 text-black active:bg-gray-100"
                                            >
                                                Ecosystem Support
                                            </NavLink>
                                        </li>
                                       
                                        <li>
                                            <NavLink 
                                                to="/Footer" 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu();
                                                }}
                                                className="block px-4 py-3 border-t text-black active:bg-gray-100"
                                            >
                                                Contact Us
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/sign-page"
                                                className="block px-4 py-3 text-gray-700 active:bg-gray-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu();
                                                }}
                                            >
                                                <Button variant="contained" color="primary">
                                                    Login
                                                </Button>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>     
            <Carousal/>
            <Countup/>
            <Services/>
            <About/>
            <Blog/>
            <Marque/>
            <Component/>
        </>
    );
};

export default Navbar;