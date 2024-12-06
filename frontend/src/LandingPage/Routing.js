import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Somepath from "./Somepath";

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/Somepath" element={<Somepath/>}/>
        </Routes>
      </BrowserRouter>
    );
  };

export default App;