// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import DashboardBox from "./DasboardBox";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useState, createContext } from "react";
import Header from "../../components/Header/Header";
import { useLocation, Outlet } from "react-router-dom";
import { userData } from "../Login/Login";
const MyContext = createContext();


const Dashboard = () => {
    const [isToggleSidebar, setisToggleSidebar] = useState(false);
    const values = {
        isToggleSidebar, setisToggleSidebar
    }

    return(
        <MyContext.Provider value={values}>
            <div className="main d-flex">
                    <Header userdata={userData}/>
                <div className={`sidebarWrapper ${isToggleSidebar===true? 'toggle': ''}`}>
                    <Sidebar userlog={userData}/>
                </div>
                <div className={`content ${isToggleSidebar===true? 'toggle': ''} `}>
                    <Outlet/>
                </div>
            </div>
        </MyContext.Provider>
    );
}
export default Dashboard;
export {MyContext};
