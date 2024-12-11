import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
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

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveSubMenu(null);
    };

    const toggleSubMenu = (menuName) => {
        setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
    };

    const menuItems = [
        {
            title: "Policies and Support",
            submenu: [
                { label: "Policy 1", path: "/Somepath" },
                { label: "Policy 2", path: "/Somepath" }
            ]
        },
        {
            title: "Ecosystem",
            submenu: [
                { label: "Ecosystem 1", path: "/Somepath" },
                { label: "Ecosystem 2", path: "/Somepath" }
            ]
        },
        {
            title: "Information Wizard",
            submenu: [
                { label: "I 1", path: "/Somepath" },
                { label: "I 2", path: "/Somepath" }
            ]
        },
        {
            title: "Notification",
            submenu: [
                { label: "Notification 1", path: "/online-shop" },
                { label: "Notification 2", path: "/offline-shop" }
            ]
        }
    ];
 
    return (
        <>
            <Header />
            <div className="bg-white shadow relative">
                <div className="container  px-4">
                    <div className="flex items-center justify-between py-1">
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
                            <ul className="flex space-x-4">
                                <li>
                                    <NavLink 
                                        exact 
                                        to="/" 
                                        className="text-black  px-4 py-2 hover:bg-gray-200 flex items-center"
                                    >
                                        <IoHomeOutline className="mr-2" /> Home
                                    </NavLink>
                                </li>
                                {menuItems.map((menuItem, index) => (
                                    <li key={index} className="relative group">
                                        <Link 
                                            to="#" 
                                            className="px-4 py-2 text-black hover:bg-gray-200 flex items-center justify-between"
                                        >
                                            {menuItem.title} <FiChevronDown className="ml-2" />
                                        </Link>
                                        <ul className="absolute hidden group-hover:block left-0 mt-2 bg-white shadow-lg rounded-lg">
                                            {menuItem.submenu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <NavLink 
                                                        to={subItem.path} 
                                                        className="text-black block px-4 py-2 hover:bg-gray-200"
                                                    >
                                                        {subItem.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                                <li>
                                    <NavLink 
                                        to="/contact" 
                                        className="text-black block px-4 py-2 hover:bg-gray-200"
                                    >
                                        Contact Us
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
                                                onClick={toggleMenu} 
                                                className=" px-4 py-3 text-black hover:bg-gray-100 flex items-center"
                                            >
                                                <IoHomeOutline className="mr-2" /> Home
                                            </NavLink>
                                        </li>
                                        {menuItems.map((menuItem, index) => (
                                            <li key={index} className="border-t">
                                                <div 
                                                    onClick={() => toggleSubMenu(menuItem.title)}
                                                    className="px-4 py-3 flex text-black justify-between items-center cursor-pointer hover:bg-gray-100"
                                                >
                                                    {menuItem.title}
                                                    <FiChevronDown 
                                                        className={`transform transition-transform duration-200 ${
                                                            activeSubMenu === menuItem.title ? 'rotate-180' : ''
                                                        }`} 
                                                    />
                                                </div>
                                                {activeSubMenu === menuItem.title && (
                                                    <ul className="bg-gray-50">
                                                        {menuItem.submenu.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <NavLink 
                                                                    to={subItem.path} 
                                                                    onClick={toggleMenu}
                                                                    className="block px-8 py-3 text-black hover:bg-gray-100"
                                                                >
                                                                    {subItem.label}
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                        <li>
                                            <NavLink 
                                                to="/contact" 
                                                onClick={toggleMenu}
                                                className="block px-4 py-3 border-t text-black hover:bg-gray-100"
                                            >
                                                Contact Us
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