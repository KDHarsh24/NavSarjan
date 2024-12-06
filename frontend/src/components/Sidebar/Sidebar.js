import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaAngleRight, FaProjectDiagram, FaSeedling, FaFileAlt, FaHandshake } from "react-icons/fa";
import { AiFillProject, AiOutlineLogout } from "react-icons/ai";
import { MdTrendingUp, MdEmojiObjects } from "react-icons/md";
import {FaGear} from "react-icons/fa6"
//import {userdata} from '../../pages/Home/Signpage'
// import { useContext } from "react";
// import { MyContext } from "../../App";


const Sidebar = ({userlog}) => {
    const investor = [
        { text: "Investments", icon: <MdTrendingUp />, link: "investments" },
        { text: "Projects", icon: <AiFillProject />, link: "projects" },
        { text: "Startups", icon: <MdEmojiObjects />, link: "startups" }
    ];
    const user = [
        { text: "My Project", icon: <FaProjectDiagram />, link: "myprojects" },
        { text: "Projects", icon: <AiFillProject />, link: "projects" },
        { text: "Startups", icon: <MdEmojiObjects />, link: "startups" },
        { text: "My Brand", icon: <FaSeedling />, link: "mystartups" },
        { text: "Patents", icon: <FaFileAlt />, link: "patents" }
    ];
        
    let valUser = user;
    if (userlog.role === "investor")
        valUser = investor;
    //const context = useContext(MyContext)
    return(
    <div className="sidebar">
        <ul>
            {valUser.map((row, index) => {
                return(
                    <li key={index}>
                        <Link to={row.link} state={{userid: userlog.email}}>
                        <Button className="w-100">
                            <span className="icon">
                                {row.icon}
                            </span>
                                {row.text}
                            <span className="arrow">
                                <FaAngleRight/>
                            </span>
                        </Button>
                        </Link>
                    </li>);
                })}
            <li>
                <Link to="/dashboard">
                <Button className="w-100">
                    <span className="icon"><FaHandshake/></span>
                        People
                    <span className="arrow"><FaAngleRight/></span>
                </Button>
                </Link>
            </li>
        </ul>
        <ul>
        <li>
            <Link to="/">
            <Button className="w-100">
                <span className="icon"><FaGear/></span>
                    Settings
                <span className="arrow"><FaAngleRight/></span>
            </Button>
            </Link>
            </li>
        </ul>
        <br/>
        <div className="logoutWrapper">
            <div className="logoutBox">
                <Button variant="contained"><AiOutlineLogout/> Logout</Button>
            </div>
        </div>
    </div>
    );
}
export default Sidebar;