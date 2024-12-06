import image from "./Images/banner1.png";

function About(){
    return(
        <>
            {/* about text */}
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
                <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <img src={image} alt=""/>
                    </div>
                    <div className="md:w-3/5 mx-auto">
                        <h2 className="text-4xl text-gray-800 font-semibold mb-4 md:w-4/5">The unseen of spending three years at Pixel grade</h2>
                        
                        <p className="md:w-3/4 text-sm text-green-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet 
                        justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis 
                        tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. 
                        Donec elementum pulvinar odio.</p>
                        <button className="border-t-cyan-300">Learn More</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;