import company1 from "./Images/company1.png"; 
import company2 from "./Images/company2.png"; 
import company3 from "./Images/company3.png"; 
import company4 from "./Images/company4.png"; 
import company5 from "./Images/company5.png"; 
import company6 from "./Images/company6.png"; 

function Services(){
    const services = [
        {id: 1, title:"Membership Organisation",description:"Our Member ship management software provides full automation of membership renewals and payments",image:"/Images/company1.png"},
        {id: 2, title:"Membership Organisation",description:"Our Member ship management software provides full automation of membership renewals and payments",image:"/Images/company2.png"},
        {id: 3, title:"Membership Organisation",description:"Our Member ship management software provides full automation of membership renewals and payments",image:"/Images/company3.png"},
    ]
    return(
        <>
            <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
                <div className="text-center my-8">
                    <h2 className="text-4xl text-gray-700 font-semibold mb-2">Our Clients</h2>
                    <p className="text-gray-700">We have been working with some Fortune 500+ clients</p>
                    {/* Company logo */}

                    <div className="my-12 flex flex-wrap justify-between items-center gap-8">
                        <img src={company1} alt="company1"/>
                        <img src={company2} alt="company2"/>
                        <img src={company3} alt="company3"/>
                        <img src={company4} alt="company4"/>
                        <img src={company5} alt="company5"/>
                        <img src={company6} alt="company6"/>
                    </div>

                    {/* services card */}
                    <div className="mt-20 md:w-1/2 mx-auto text-center">
                        <h2 className="text-4xl text-gray-700 font-semibold mb-3">Manage your entire community in a single system</h2>
                        <p className="text-green-500">Who is Nextcent suitable for?</p>
                    </div>

                    {/* cards */}
                    <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
                        {
                            services.map(service => <div key={service.id} className="px-4 py-8 text-center md:w-[300px] 
                            mx-auto md:h-80 rounded-md shadow cursor-pointer hover:-translate-y-5 hover:border-b-4
                             hover:border-indigo-700 transition-all duration-300 flex items-center justify-center h-full">
                                <div>
                                    <div className="bg-white h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl"><img
                                    src={service.image} alt="serviceimage1" className="-ml-5"/></div>
                                    <h4 className="text-2xl font-bold text-gray-700 mb-2 px-2">{service.title}</h4>
                                    <p className="text-sm text-gray-700">{service.description}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;