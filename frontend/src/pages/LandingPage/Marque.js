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
        <div className="bg-white py-8">
            <h2 className="text-4xl text-center text-slate-900 font-semibold mb-6">
                Our Government Partners to Drive Growth and Transparency
            </h2>
            <Marquee pauseOnClick={true}>
                <div className="flex items-center space-x-8">
                    <img src={logo1} alt="logo1" className="h-24 w-auto" />
                    <img src={logo2} alt="logo2" className="h-24 w-auto" />
                    <img src={logo3} alt="logo3" className="h-24 w-auto" />
                    <img src={logo4} alt="logo4" className="h-24 w-auto" />
                    <img src={logo5} alt="logo5" className="h-24 w-auto" />
                    <img src={logo6} alt="logo6" className="h-24 w-auto" />
                    <img src={logo7} alt="logo7" className="h-24 w-auto" />
                    <img src={logo8} alt="logo8" className="h-24 w-auto" />
                </div>
            </Marquee>
        </div>
    );
}

export default Marque;
