import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Incubation_Applypage from './Incubation_Applypage';
import CreateProfile from './CreateProfile';
import Basic_Info from './Applicant/Basic_Info';
import Team from './Applicant/Team';
import Financials from './Applicant/Financials';
import Industry from './Applicant/Industry';
import Pitch_desk from './Applicant/Pitch_desk';
import Documents from './Applicant/Documents';

const Home = () => {
  const navigate = useNavigate();

  const handleIncubationChange = (event) => {
    const value = event.target.value;
    if (value) {
      navigate(value); 
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Header</h1>
      </header>

      {/* Main Section */}
      <main className="p-6 bg-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">HOME</h2>
          <h2 className="text-2xl font-semibold mb-4">STARTUPS</h2>

          {/* About Section */}
          <select
            aria-label="About Us"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="">Select About Section</option>
            <option value="what-we-do">What We Do</option>
            <option value="board-members">Board Members</option>
            <option value="advisors">Advisors</option>
            <option value="team">Team</option>
          </select>

          {/* Incubation Section */}
          <select
            aria-label="Incubation"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            onChange={handleIncubationChange}
          >
            <option value="">Select Incubation Type</option>
            <option value="/pre-incubation">Pre-Incubation</option>
            <option value="/physical-incubation">Physical INCUBATION</option>
          </select>

          {/* Updates Section */}
          <select
            aria-label="Updates"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="latest-events">Latest Events</option>
            <option value="bulletin">Bulletin</option>
          </select>
        </div>
      </main>

      {/* Banner Section */}
      <section className="bg-blue-600 text-white py-10 text-center">
        <h2 className="text-2xl font-bold">Banner</h2>
      </section>

      {/* What We Offer Section */}
      <div className="py-10 bg-gray-200 text-center">
        <h2 className="text-2xl font-bold">What We Offer</h2>
      </div>

      {/* Supported By Section */}
      <div className="py-10 bg-gray-300 text-center">
        <h2 className="text-2xl font-bold">Supported By</h2>
      </div>

      {/* Latest Events Section */}
      <div className="py-10 bg-gray-400 text-center">
        <h2 className="text-2xl font-bold">Latest Events</h2>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <h2 className="text-xl font-bold">Footer</h2>
      </footer>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pre-incubation" element={<Incubation_Applypage />} />
        <Route path="/physical-incubation" element={<div>Physical Incubation Page</div>}/>
        <Route path="/CreateProfile" element={<CreateProfile/>} />
        <Route path="/Basic_Info" element={<Basic_Info/>}/>
        <Route path="/Team" element={<Team/>}/>
        <Route path="/Financials" element={<Financials/>}/>
        <Route path="/Industry" element={<Industry/>}/>
        <Route path="/Pitch_desk" element={<Pitch_desk/>}/>
        <Route path="/Documents" element={<Documents/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
