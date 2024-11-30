import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Project from './pages/Project/Project';
import ProjectProfile from './pages/Project/ProjectProfile';
import Startup from './pages/Startup/Startup';
import StartupProfile from './pages/Startup/Startupprofile';
import StartupForm from './pages/Startup/Startupform';
import ProfilePage from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Homepage from './pages/Home/Homepage';
import StartupInvestmentTracker from './Data/startuptrack';
import PolicyMakerLandingPage from './pages/Policy_maker/Components/policymakerpage';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path={'/login'} exact={true} element={<Login/>}/>
        <Route path={'/tracker'} exact={true} element={<StartupInvestmentTracker/>}/>
        <Route path='/' exact={true} element={<Homepage/>}/>
        <Route path={'/dashboard'} exact={true} element={<Dashboard/>}>
          <Route path={'/dashboard/projects'} exact={true} element={<Project/>}/>
          <Route path={'/dashboard/projects/projectprofile'} exact={true} element={<ProjectProfile/>}/>
          <Route path={'/dashboard/startups'} exact={true} element={<Startup/>}/>
          <Route path={'/dashboard/startups/startupprofile'} exact={true} element={<StartupProfile/>}/>
          <Route path={'/dashboard/startups/new'} exact={true} element={<StartupForm/>}/>
          <Route path={'/dashboard/profile/:userId'} exact={true} element={<ProfilePage/>}/>
          <Route path={'/dashboard/policymaker'} exact={true} element={<PolicyMakerLandingPage/>}/>
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;

