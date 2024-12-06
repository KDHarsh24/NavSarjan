import React from "react";
import { Carousel } from "flowbite-react";
import banner1 from "./Images/banner1.png";
import banner2 from "./Images/banner2.png";
import banner3 from "./Images/banner3.png"; 
import banner4 from "./Images/banner4.png";

function Carousal(){
    return(
            <div className=''>
                <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
                    {/* Flowbit react */}
                    <Carousel className="w-full mx-auto">
                        <div className="flex h-full items-center justify-center">
                        <img src={banner1} alt="banner1"/>
                        </div>
                        <div className="flex h-full items-center justify-center">
                        <img src={banner2} alt="banner1"/>
                        </div>
                        <div className="flex h-full items-center justify-center">
                        <img src={banner3} alt="banner1"/>
                        </div>
                        <div className="flex h-full items-center justify-center">
                        <img src={banner4} alt="banner1"/>
                        </div>
                    </Carousel>
                </div>
            </div>

            
    );
};

export default Carousal;