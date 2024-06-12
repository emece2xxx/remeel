// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const UserContext = createContext();

// Proveedor de contexto
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // Inicialmente null

  // Función para actualizar el tipo de usuario
  const login = (type) => {
    setUserType(type);
  };

  return (
    <UserContext.Provider value={{ userType, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = () => useContext(UserContext);