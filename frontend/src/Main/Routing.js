import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Option_page from "./Option_page";
import Signpage from "./Signpage";
import Create_account from "./Create_account";
import Basic_info from "../Applicant/Basic_Info";
import Team from "../Applicant/Team";
import Financials from "../Applicant/Financials";
import Industry from "../Applicant/Industry";
import PitchDesk from "../Applicant/Pitch_desk";
import Documents from "../Applicant/Documents";
import Dashboard from "../Applicant/Dashboard";
import ProjectForm from "../Applicant/Project/Project_form";
import Somepath from "../Applicant/Somepath";
import Home_page from "../Home/Home_page";

function Routing(){
    return(
        <>
            <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home_page/>}></Route> */}
                <Route path="/Option_page" element={<Option_page/>}></Route>
                <Route path="/" element={<Signpage/>}></Route>
                <Route path="/create-account" element={<Create_account/>}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>

                {/* Forms Routes */}
                <Route path="/Basic_info" element={<Basic_info/>}/>
                <Route path="/Team" element={<Team/>}/>
                <Route path="/Financials" element={<Financials/>}/>
                <Route path="/Industry" element={<Industry/>}/>
                <Route path="/Pitch_desk" element={<PitchDesk/>}/>
                <Route path="/Documents" element={<Documents/>}/>
                <Route path="/Project_form" element={<ProjectForm/>}/>

                {/* Some path */}
                <Route path="/Somepath" element={<Somepath />} />
            </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;