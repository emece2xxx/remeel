// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './View/Home';
import Login from './View/Login';
import './App.css';
import { UserProvider } from './Controller/userContext';




function App() {
  return (
    <div className='App'>
      <UserProvider>    
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="home/*" element={<Home />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
    
  );
}

export default App;