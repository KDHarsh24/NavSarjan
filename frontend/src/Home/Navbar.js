import React, { useState,useEffect } from "react";
import logo from './logo.jpg';
import {Link} from 'react-router-dom';

// react icons
import {FaXmark,FaBars} from "react-icons/fa6";

function Navbar(){

    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [isSticky,setIsSticky] = useState(false);

    // set toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            if(Window.scrollY>100){
                setIsSticky(true);
            }
            else{
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll',handleScroll);

        return () => {
            window.addEventListener('scroll',handleScroll);
        }
    });

    // navitems array
    const navItems = [
        {link: "Home",path: "home"},
        {link: "Services",path: "services"},
        {link: "About",path: "about"},
        {link: "Product",path: "product"},
        {link: "Testimonial",path: "testimonial"},
        {link: "FAQ",path: "FAQ"},
    ]

    return(
        <>
           <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
                <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" :""}`}>
                    <div className="flex justify-between items-center text-base gap-8">
                        <a href="" className="text-2xl font-semibold flex items-center space-x-3">
                            <img src={logo} alt="logo" className="w-10 inline-block items-center"/>
                            <span className='text-black'>NavSarjan</span></a>
                            {/* nav items for large devices */}

                            <ul className="md:flex space-x-12 hidden">
                                {
                                    navItems.map(({link,path}) => <Link  to={path} spy={true} smooth={true} offset={true}  key={link} className='block text-base text-gray900 hover:text-brandPrimary first:font-medium' >{link}</Link>)
                                }
                            </ul>

                            {/* btn for large devices */}
                            <div className="space-x-12 hidden lg:flex items-center">
                                <a href="/" className='hidden lg:flex items-center text-green-500 hover:text-gray900'>Login</a>
                                <button className="bg-green-400 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-gray-800">Signup</button>
                            </div>

                            {/* menu btn for only mobile devices */}
                            <div className="md:hidden">
                                <button className="focus: outline-none focus:text-gray-500" onClick={() =>setIsMenuOpen(!isMenuOpen)}>
                                    {
                                        isMenuOpen ? (<FaXmark className="h-6 w-6 text-gray-800"/>) : (<FaBars className="h-6 w-6 text-gray-800"/>)
                                    }
                                </button>
                            </div>
                    </div>

                    {/* nav items for mobile devices */}
                    <div className={`space-y-4 px-4 mt-16 py-7 bg-green-200 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({link,path}) => <Link  to={path} spy={true} smooth={true} offset={-100}  key={link} className='block text-base text-gray900 hover:text-brandPrimary first:font-medium' >{link}</Link>)
                    }
                    </div>
                </nav>
           </header>
        </>
    );
};

export default Navbar;