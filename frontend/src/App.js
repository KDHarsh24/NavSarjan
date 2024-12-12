import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Project from './pages/Project/Project';
import ProjectProfile from './pages/Project/ProjectProfile';
import Startup from './pages/Startup/Startup';
import StartupProfile from './pages/Startup/Startupprofile';
import ProfilePage from './pages/Profile/Profile';
import Navbar from './pages/LandingPage/Navbar';
import StartupInvestmentTracker from './Data/startuptrack';
import PolicyMakerLandingPage from './pages/Policy_maker/Components/policymakerpage';
import PatentForm from './pages/Patent/iprform';
import PatentApplicationForm from './pages/Patent/patentapply';
import CreateAccount from './pages/Home/Create_account';
import Signpage from './pages/Home/Signpage';
import Newstartup from './pages/Startup/Newstartup';
import MyProject from './pages/Project/myProject';
import MyStartup from './pages/Startup/myStartup';
import NewProject from './pages/Project/newProject';
import ChangeHistoryTable from './pages/Policy_maker/policymake';

import DefaultPage from './pages/defaultpage';
import IPRDatas from './pages/Patent/patentexist';
import CalendarPage from './pages/CalendarPage';
import Chat from './pages/Chat/chat.js';
import Notify from './pages/Notification/notification.js';
import { useState,useEffect } from 'react';
import ChangeHistoryTableSenior from './pages/Policy_maker/policymaker2.js';
import ChangeHistoryTableSuper from './pages/Policy_maker/policymaker3.js';
import Videopage from './pages/Video/homepage.js';
import RoomPage from './pages/Video/roompage.js';

import Gujarat_Policy from './pages/LandingPage/Gujarat_Policy.js';
import Services from './pages/LandingPage/Services.js';
import {Component} from './pages/LandingPage/Footer.js';

export let socketvalue = {}
function App() {
  const [socket,setSocket]=useState('');
  useEffect(()=>{
    if(socket)
    {
      socketvalue=socket;
      console.log("Socket value in app: "+socket.id);
    }
  },[socket]);



  return (
  <BrowserRouter>
      <Routes>
        <Route path='*' element={<DefaultPage/>}/>
        <Route path={'/tracker'} exact={true} element={<StartupInvestmentTracker/>}/>
        <Route path='/' exact={true} element={<Navbar/>}/>

        <Route path={'/Gujarat_Policy'} element={<Gujarat_Policy/>}/>
        <Route path={'/Services'} element={<Services/>}/>
        <Route path={'/Footer'} element={<Component/>}/>


        <Route path="/sign-page" element={<Signpage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/policymaker2" element={<ChangeHistoryTableSenior/>}/>
        <Route path="/policymaker3" element={<ChangeHistoryTableSuper/>}/>
        {/* Forms Routes */}
        
        <Route path={'/dashboard'} exact={true} element={<Dashboard socketValue={setSocket}/>}>
        <Route path={'/dashboard'} exact={true} element={<PolicyMakerLandingPage/>}/>
        <Route path={'/dashboard/chat'} exact={true} element={<Chat/>}/>
        <Route path={'/dashboard/room'} exact={true} element={<Videopage/>}/>
        <Route path={'/dashboard/room/:roomId'} exact={true} element={<RoomPage/>}/>
        
        <Route path={'/dashboard/calendar'} exact={true} element={<CalendarPage/>}/>
          <Route path="/dashboard/policymaker" element={<ChangeHistoryTable/>}/>
          <Route path="/dashboard/policymaker2" element={<ChangeHistoryTableSenior/>}/>
          <Route path="/dashboard/policymaker3" element={<ChangeHistoryTableSuper/>}/>
          <Route path="/dashboard/iprdata" element={<IPRDatas/>}/>
          <Route path={'/dashboard/projects'} exact={true} element={<Project/>}/>
          <Route path={'/dashboard/myprojects'} exact={true} element={<MyProject/>}/>
          <Route path={'/dashboard/myprojects/new'} exact={true} element={<NewProject/>}/>
          <Route path={'/dashboard/patents'} exact={true} element={<PatentForm/>}>
          <Route path={'/dashboard/patents/'} exact={true} element={<PatentApplicationForm/>}/>
            <Route path={'/dashboard/patents/active'} exact={true} element={<PatentApplicationForm/>}/>
          </Route>
          <Route path={'/dashboard/projects/projectprofile'} exact={true} element={<ProjectProfile/>}/>
          <Route path={'/dashboard/myprojects/projectprofile'} exact={true} element={<ProjectProfile/>}/>
          <Route path={'/dashboard/startups'} exact={true} element={<Startup/>}/>
          <Route path={'/dashboard/startups/startupprofile'} exact={true} element={<StartupProfile/>}/>
          <Route path={'/dashboard/mystartups'} exact={true} element={<MyStartup/>}/>
          <Route path={'/dashboard/mystartups/new'} exact={true} element={<Newstartup/>}/>
          <Route path={'/dashboard/profile'} exact={true} element={<ProfilePage/>}/>
          {/* <Route path={'/dashboard/policymaker'} exact={true} element={<PolicyMakerLandingPage/>}/> */}


        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;

