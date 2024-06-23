// UserContext.js
import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState("");
  const [userReg, setUserReg] = useState({});

  const login = (type) => {
    setUserType(type);
  };

  return (
    <UserContext.Provider value={{ userType, login, userId, setUserId, userReg, setUserReg }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
