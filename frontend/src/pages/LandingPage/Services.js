import image1 from "./Images/landikart.png";
import image2 from "./Images/INTAS.png";
import image3 from "./Images/digital_class.jpg";
import image4 from "./Images/billdesk.jpg";
import image5 from "./Images/blue_smart.jpg";
import image6 from "./Images/bigspoon.jpg"; 
import register from "./Images/Register.png";
import unique_id from "./Images/unique_id.jpg";
import assistance from "./Images/assistance.avif";
import Marquee from "react-fast-marquee";


function Services(){
    const services = [
        {id: 1, title:"Get Yourself Regitster",description:"Kickstart your journey by registering your startup or project with NavSarjan and unlock a world of opportunities and resources tailored for innovators.",image:register},
        {id: 2, title:"Get Your Unique Identification Number ",description:"Receive a verified unique ID for your startup or project, ensuring its authenticity and recognition within the NavSarjan ecosystem",image:unique_id},
        {id: 3, title:"Apply for the Assistance",description:"Submit your application to access tailored support, resources, and mentorship to accelerate your startup's growth.",image:assistance},
    ]
    return(
        <>
            <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
                <div className="text-center my-8">
                    <h2 className="text-4xl text-gray-700 font-semibold mb-2">Our Successful StartUps</h2>
                    <p className="text-gray-700">We have been working with successful 500+ startups</p>
                    {/* Company logo */}
 
                    <Marquee pauseOnClick={true}>
            <div className="flex overflow-hidden whitespace-nowrap items-center hover:cursor-pointer">
                <div className="inline-block mx-10">
                    <img src={image1} alt="logo1" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-10">
                    <img src={image2} alt="logo1" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-10">
                    <img src={image3} alt="logo1" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-10">
                    <img src={image4} alt="logo1" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-10">
                    <img src={image5} alt="logo1" className="max-w-xs h-auto" />
                </div>
                <div className="inline-block mx-10">
                    <img src={image6} alt="logo1" className="max-w-xs h-auto" />
                </div>
            </div>
        </Marquee>

                    {/* services card */}
                    <div className="mt-20 md:w-1/2 mx-auto text-center">
                        <h2 className="text-4xl text-gray-700 font-semibold mb-3">Become Part of Our Ecosystem</h2>
                    </div>

                    {/* cards */}
                    <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
    {
        services.map(service => (
            <div key={service.id} className="px-4 py-8 text-center md:w-[300px] 
            mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4
            hover:border-indigo-700 hover:shadow-indigo-600 transition-all duration-300 flex items-center justify-center h-full">
                <div>
                    <div className="bg-white h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="h-full w-full object-cover" // Ensures the image covers the container
                        />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-700 mb-2 px-2">{service.title}</h4>
                    <p className="text-sm text-gray-700">{service.description}</p>
                </div>
            </div>
        ))
    }
</div>
                </div>
            </div>
        </>
    );
};

export default Services;