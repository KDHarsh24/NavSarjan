import image from "./Images/banner1.png";

function About(){
    return(
        <>
            {/* about text */}
            <div className="px-4 lg:px-14 max-w-screen-2xl bg-white mx-auto my-2">
                <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <img src={image} alt=""/>
                    </div>
                    <div className="md:w-3/5 mx-auto">
                        <h2 className="text-4xl text-gray-800 font-semibold mb-4 md:w-4/5">NavSarjan Startup Platform</h2>
                        
                        <p className="md:w-3/4 text-sm text-black mb-8">
                           <h2 className="text-center text-2xl">Objective:</h2>
                            To inspire and support startups in Gujarat.
                            To provide a platform for collaboration and innovation.<br/>
                            <h2 className="text-center text-2xl">Key Features:</h2>
                            Collaboration: Fostering connections and partnerships among startups, mentors, investors, and other stakeholders.<br/>
                            Innovation: Encouraging creative ideas and promoting technological advancements.<br/>
                            Support: Offering resources, guidance, and mentorship to help startups grow and succeed.</p>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500">
                                 Learn More
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;