import React from 'react';
import {Route, Routes} from 'react-router'
import HomePage from './components/HomePage.js';
import './App.css';
import Login_Signup from './components/Login_Signup.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login_Signup/>}></Route>

    </Routes>
    
  );
}

export default App;
