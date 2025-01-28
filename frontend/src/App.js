import React from 'react';
import {Route, Routes} from 'react-router'
import HomePage from './components/HomePage.js';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}>

      </Route>
    </Routes>
    
  );
}

export default App;
