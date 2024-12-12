import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Videopage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a random room code
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Automatically navigate to the generated room
    navigate(`/dashboard/room/${randomCode}`);
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting to your room...</h1>
    </div>
  );
};

export default Videopage;
