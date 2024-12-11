import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
//import Dashboard from './pages/Policy_maker/Components/Dashboard';
import Project from './pages/Project/Project';
import ProjectProfile from './pages/Project/ProjectProfile';
import StartupProfile from './pages/Startup/Startupprofile';
import ProfilePage from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Homepage from './pages/Home/Homepage';
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
import Startup from './pages/Startup/startup';
import Register from './pages/Login/Register';
import { useState,useEffect} from 'react';

//for chat,videoCall,notification
import Chat from './pages/Chat/chat.js';
import Notify from './pages/Notification/notification.js';
import { getFormControlLabelUtilityClasses } from '@mui/material';


export let socketvalue = {};


//fetch socketvalue from somewhere




function App() {
  const [userEmail, setUserEmail] = useState(() => {
    // Retrieve email from localStorage
    return localStorage.getItem('userEmail') || null;
  });

  const [socket,setSocket]=useState('');

  
  useEffect(()=>{
    if(socket)
    {
      socketvalue = socket;
      console.log("socket in app: "+socket.id);
      socket ? console.log("Hello") : console.log("Hello1");
    }

  },[socket])
    
  return (
  <BrowserRouter>
      <Routes>
        <Route path={'/login'} exact={true} element={<Login     emailValue={setUserEmail} />}/>
        <Route path={'/register'} exact={true} element={<Register/>}/>
        <Route path={'/tracker'} exact={true} element={<StartupInvestmentTracker  userEmail={userEmail}/>}/>
        <Route path='/' exact={true} element={<Homepage user={userEmail} />}/>
        <Route path="/sign-page" element={<Signpage emailValue={setUserEmail}/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>

        
        <Route path="/notification" exact={true}  element={<Notify user={userEmail} socket={socket}/>}/>

        {/* Forms Routes */}

        <Route path={'/dashboard'} exact={true} element={<Dashboard user={userEmail} socketValue={setSocket}/>}>
        <Route path={'/dashboard/chat'}exact={true} element={ <Chat user={userEmail}  /> } />
          <Route path={'/dashboard/projects'} exact={true} element={<Project  userEmail={userEmail}/>}/>
          <Route path={'/dashboard/myprojects'} exact={true} element={<MyProject  userEmail={userEmail}/>}/>
          <Route path={'/dashboard/myprojects/new'} exact={true} element={<NewProject userEmail={userEmail}/>}/>
          <Route path={'/dashboard/patents'} exact={true} element={<PatentForm  userEmail={userEmail}/>}>
          <Route path={'/dashboard/patents/'} exact={true} element={<PatentApplicationForm  userEmail={userEmail}/>}/>
            <Route path={'/dashboard/patents/active'} exact={true} element={<PatentApplicationForm  userEmail={userEmail}/>}/>
          </Route>
          <Route path={'/dashboard/projects/projectprofile'} exact={true} element={<ProjectProfile  userEmail={userEmail}/>}/>
          <Route path={'/dashboard/mystartups/startupprofile'} exact={true} element={<StartupProfile  userEmail={userEmail}/>}/>
          <Route path={'/dashboard/startups/startupprofile'} exact={true} element={<StartupProfile  userEmail={userEmail}/>}/>
          <Route path={'/dashboard/startups'} exact={true} element={<Startup  userEmail={userEmail}/>}/>
          <Route path={'/dashboard/mystartups'} exact={true} element={<MyStartup userEmail={userEmail}/>}/>
          <Route path={'/dashboard/mystartups/new'} exact={true} element={<Newstartup userEmail={userEmail}/>}/>
          <Route path={'/dashboard/profile/:userId'} exact={true} element={<ProfilePage userEmail={userEmail}/>}/>
          <Route path={'/dashboard/policymaker'} exact={true} element={<PolicyMakerLandingPage  userEmail={userEmail}/>}/>
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;


