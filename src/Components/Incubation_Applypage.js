import React from "react";
import { Link } from "react-router-dom";
import CreateProfile from "./CreateProfile";

function Incubation_Applypage() {
  return (
    <div>
      <h1 className="text-center text-9xl">Apply Page</h1>
      <Link to="/CreateProfile">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Apply Now</button>
      </Link>
    </div>
  );
}    
export default Incubation_Applypage;
