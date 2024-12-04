import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Provide the context to the app
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);
