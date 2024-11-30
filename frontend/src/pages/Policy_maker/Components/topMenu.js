import React from 'react';
import './all.css';
import { FaEnvelope } from 'react-icons/fa';
import { IoCall } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";


function topMenu(){
    return(
    // TOP MENU
    <menu className="top_menu row_dir col_dir">
        <section className="flex_content row_dir top_sec1 center">
            <a className='flex' href="/"> <FaEnvelope className='mr-1 mt-1' size={13}/> info@lilliovi.com</a>
            <a className='flex' href="/"> <IoCall className='mr-1 mt-1' size={13}/> 1234567890</a>
        </section>
        <section className="flex_content row_dir center">
            <a href="/" title="Facebook"><CiFacebook/></a>
            <a href="/" title="Instagram"><FaInstagram/></a>
            <a href="/" title="Twitter"><FaXTwitter/></a>
            <a href="/" title="youtube"><AiOutlineYoutube/></a>
        </section>
    </menu>
    );
}

export default topMenu;