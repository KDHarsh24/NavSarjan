import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from "./Images/logo_01.png";
import logo2 from "./Images/logo_02.png";
import logo3 from "./Images/logo_03.png";
import logo4 from "./Images/logo_04.png";
import logo5 from "./Images/logo_05.png";
import logo6 from "./Images/logo_06.png";
import logo7 from "./Images/logo_07.png";
import logo8 from "./Images/logo_08.png";

function Marque() {
    return (
        <Marquee pauseOnClick={true}>
            <div className="flex overflow-hidden whitespace-nowrap items-center hover:cursor-pointer">
                <div className="inline-block mx-4">
                    <img src={logo1} alt="logo1" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo2} alt="logo2" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo3} alt="logo3" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo4} alt="logo4" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo5} alt="logo5" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo6} alt="logo6" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo7} alt="logo7" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-4">
                    <img src={logo8} alt="logo8" className="max-w-xs h-auto" />
                </div>
            </div>
        </Marquee>
    );
};

export default Marque;