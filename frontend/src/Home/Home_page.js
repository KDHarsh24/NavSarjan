import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Startup_ecosystem from "./Startup_ecosystem";
import Events from "./Events";
import Services from "./Services";
import Timeline from "./Timeline";
import Footer from "./Footer";

function Home_page(){
    return(
        <>
            <Navbar/>
            <Home/>
            <Startup_ecosystem/>
            <Events/>
            <Timeline/>
            <Services/>
            <Footer/>
        </>
    );
};

export default Home_page;