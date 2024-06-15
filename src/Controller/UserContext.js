// UserContext.js
import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); 

  const login = (type) => {
    setUserType(type);
  };

  return (
    <UserContext.Provider value={{ userType, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);