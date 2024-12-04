import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
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


function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path={'/login'} exact={true} element={<Login/>}/>
        <Route path={'/register'} exact={true} element={<Register/>}/>
        <Route path={'/tracker'} exact={true} element={<StartupInvestmentTracker/>}/>
        <Route path='/' exact={true} element={<Homepage/>}/>
        <Route path="/sign-page" element={<Signpage/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        {/* Forms Routes */}

        <Route path={'/dashboard'} exact={true} element={<Dashboard/>}>
          <Route path={'/dashboard/projects'} exact={true} element={<Project/>}/>
          <Route path={'/dashboard/myprojects'} exact={true} element={<MyProject/>}/>
          <Route path={'/dashboard/myprojects/new'} exact={true} element={<NewProject/>}/>
          <Route path={'/dashboard/patents'} exact={true} element={<PatentForm/>}>
          <Route path={'/dashboard/patents/'} exact={true} element={<PatentApplicationForm/>}/>
            <Route path={'/dashboard/patents/active'} exact={true} element={<PatentApplicationForm/>}/>
          </Route>
          <Route path={'/dashboard/projects/projectprofile'} exact={true} element={<ProjectProfile/>}/>
          <Route path={'/dashboard/mystartups/startupprofile'} exact={true} element={<StartupProfile/>}/>
          <Route path={'/dashboard/startups/startupprofile'} exact={true} element={<StartupProfile/>}/>
          <Route path={'/dashboard/startups'} exact={true} element={<Startup/>}/>
          <Route path={'/dashboard/mystartups'} exact={true} element={<MyStartup/>}/>
          <Route path={'/dashboard/mystartups/new'} exact={true} element={<Newstartup/>}/>
          <Route path={'/dashboard/profile/:userId'} exact={true} element={<ProfilePage/>}/>
          <Route path={'/dashboard/policymaker'} exact={true} element={<PolicyMakerLandingPage/>}/>
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;

