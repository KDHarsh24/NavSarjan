import Footer from "../../components/Footer/Homefooter";
import Homeheader from "../../components/Header/Homeheader";
import HeroSection from "./Herosection";
import ContentSection from "./Homecontent";

const Homepage = ({user}) => {






    return(
        <div className="navsarjanHome">
            <Homeheader/>
            <HeroSection/>
            <ContentSection/>
            <Footer/>
        </div>
    );
}
export default Homepage;
