// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import DashboardBox from "./DasboardBox";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useState, createContext } from "react";
import Header from "../../components/Header/Header";
import { useLocation, Outlet } from "react-router-dom";
import { useUser } from '../../context/UserContext';
const MyContext = createContext();


const Dashboard = () => {
    const { userData } = useUser();   //to access email use userData.email

    const [isToggleSidebar, setisToggleSidebar] = useState(false);
    const values = {
        isToggleSidebar, setisToggleSidebar
    }

    return(
        
        <MyContext.Provider value={values}>
            <div className="main d-flex">
                    <Header useUser={useUser}/>
                    
                <div className={`sidebarWrapper ${isToggleSidebar===true? 'toggle': ''}`}>
                    <Sidebar userlog={useUser}/>
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
