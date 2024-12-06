function Blog() {

    const blogs = [
        {id: 1, title: "Creating Streamlined Safeguard Process with One Ram", image: "./Images/image18.png"},
        {id: 2, title: "Enhancing Efficiency in Safeguard Processes", image: "/Images/image19.png"},
        {id: 3, title: "Innovative Approaches to Safeguarding", image: "/Images/image20.png"}
    ];

    return (
        <>
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-12 ">
                <div className="text-center md:w-1/2 mx-auto">
                    <h2 className="text-4xl text-green-400 font-semibold mb-4">Caring is the New Marks</h2>
                    <p className="text-sm text-green-400 mb-8 md:w-3/4 mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. 
                        Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. 
                        Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
                    </p>
                </div>
            </div>

            {/* All blogs */}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 items-center justify-between">
                {
                    blogs.map(blog => (
                        <div key={blog.id} className="mx-auto relative mb-12 cursor-pointer">
                            <img src={blog.image} alt={blog.title} className="w-full h-auto"/>
                            <div>
                                <h3 className="text-lg font-semibold">{blog.title}</h3>
                                <div className="flex items-center gap-8">
                                    <a href="/" className="font-bold text-green-200 hover:text-neutral-700">
                                        Read More
                                    </a>
                                    <span>Meet all customers</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17"
                                        height="11"
                                        viewBox="0 0 17 11"
                                        fill="none"
                                        className="inline-block ml-2"
                                    >
                                        <path d="M1 5.5H16M16 5.5L12.5 2M16 5.5L12.5 9" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Blog;