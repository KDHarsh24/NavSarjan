import { Carousel } from "flowbite-react";
import logo1 from './logo_01.png';
import logo2 from './logo_02.png';
import logo3 from './logo_03.png';
import logo4 from './logo_04.png';
import logo5 from './logo_05.png';
import logo6 from './logo_06.png';
import logo7 from './logo_07.png';


function Events(){
    return(
        <>
             <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img src={logo1} alt="..." />
                    <img src={logo2} alt="..." />
                    <img src={logo3} alt="..." />
                    <img src={logo4} alt="..." />
                    <img src={logo5} alt="..." />
                    <img src={logo6} alt="..." />
                    <img src={logo7} alt="..." />
                </Carousel>
                <Carousel>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                </Carousel>
             </div>
        </>
    );
};

export default Events;