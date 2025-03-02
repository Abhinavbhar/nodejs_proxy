import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage.js';
import './App.css';
import Login_Signup from './components/Login_Signup.js';
import Dashboard from './components/Dashboard.js';
function App() {
  const userName = "Bhar";


  return (
  
    <Routes>
      <Route path="/" element={<HomePage greeting="Welcome to the Home Page!" />} />
      <Route path="/login" element={<Login_Signup initialMode="login" />} />
      <Route 
        path="/dashboard" 
        element={
          <Dashboard
            userName={userName}
           
          />
        } 
      />
    </Routes>

  );
}

export default App;
