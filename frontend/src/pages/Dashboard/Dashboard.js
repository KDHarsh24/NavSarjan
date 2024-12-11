// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import DashboardBox from "./DasboardBox";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useState, createContext,useEffect } from "react";
import Header from "../../components/Header/Header";
import {  Outlet } from "react-router-dom";
import { useUser } from '../../context/UserContext';
import {io} from "socket.io-client";

const ENDPOINT = "http://localhost:8081/";
let socket;

const MyContext = createContext();




const Dashboard = ({user,socketValue}) => {

    useEffect(() => {
        // Ensure socket connection is established once
        if (!socket) {
          socket = io('http://localhost:8081/');
         
    
          socket.on("connect", () => {
            console.log("Client Id: " + socket.id);
            socketValue(socket);
          });
    
          socket.emit("Add", { from: user });
    
          socket.on("notification", ({ to, message }) => {
            console.log("Notification from " + to + " with message: " + message);
          });
        }
    
        return () => {
          socket?.off(); // Clean up socket listeners
        };
      }, [user, socketValue]); // Only trigger on user or socketValue changes

    
    console.log("User Email: "+user);
    const [isToggleSidebar, setisToggleSidebar] = useState(false);
    const values = {
        isToggleSidebar, setisToggleSidebar
    }
  

        // Only trigger on user or socketValue changes



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
