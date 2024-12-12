function Blog() {

    const blogs = [
        {id: 1, title: "Creating Streamlined Safeguard Process with One Ram", image: "./Images/image18.png"},
        {id: 2, title: "Enhancing Efficiency in Safeguard Processes", image: "/Images/image19.png"},
        {id: 3, title: "Innovative Approaches to Safeguarding", image: "/Images/image20.png"}
    ];

    return (
        <>

<div className="px-4  bg-white lg:px-14 py-10">
  <div className="text-center md:w-3/4 mx-auto">
    {/* Section Heading */}
    <h2 className="text-3xl text-slate-900 font-bold mb-6">About NavSarjan</h2>
    
    {/* Paragraph 1: Overview */}
    <p className="text-sm text-gray-600 mb-4">
      <strong>NavSarjan</strong> is an advanced web application developed by Team Typewriters-II 
      for the Smart India Hackathon 2024, addressing the challenges outlined in 
      Problem Statement SIH1608 under the theme "Smart Education." The solution focuses on 
      enhancing the monitoring and management of research, intellectual property rights (IPR), 
      innovation, and start-ups in Gujarat State.
    </p>

    {/* Paragraph 2: Key Technologies */}
    <p className="text-sm text-gray-600 mb-4">
      This platform integrates modern technologies such as Artificial Intelligence (AI) and 
      Machine Learning (ML) to centralize stakeholder collaboration, automate key processes 
      like IP registration and start-up tracking, and deliver AI-driven insights for informed 
      decision-making. It fosters a seamless ecosystem for researchers, entrepreneurs, 
      policymakers, and investors to accelerate innovation and streamline resource allocation.
    </p>

    {/* Paragraph 3: Technical Features */}
    <p className="text-sm text-gray-600 mb-4">
      With its adaptable architecture, NavSarjan unifies various data sources, leverages scalable 
      cloud technologies, and employs robust data security measures. Key features include 
      real-time analytics, intuitive user interfaces powered by React.js, and secure communication 
      enabled by WebRTC and OAuth2. It is designed to address scalability, cross-platform 
      compatibility, and sustainability challenges while ensuring efficiency and transparency 
      in Gujarat’s innovation landscape.
    </p>

    {/* Paragraph 4: Impact */}
    <p className="text-sm text-gray-600 mb-4">
      NavSarjan exemplifies innovation by merging diverse technologies, fostering collaboration, 
      and creating an end-to-end solution tailored for evolving needs. It stands as a testament 
      to the vision of transforming Gujarat into a hub of sustainable and impactful innovation.
    </p>
  </div>
</div>
        </>
    );
};

export default Blog;