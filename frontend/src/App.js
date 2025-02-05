// import React from 'react';
// import {Route, Routes} from 'react-router'
// import HomePage from './components/HomePage.js';
// import './App.css';
// import Login_Signup from './components/Login_Signup.js';
// import Dashboard from './components/Dashboard.js';

// function App() {
//   return (
//     <Routes>
//       <Route path='/' element={<HomePage/>}></Route>
//       <Route path='/login' element={<Login_Signup/>}></Route>
//       <Route path='/dashboard' element={<Dashboard/>}></Route>



//     </Routes>
    
//   );
// }

// export default App;


import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage.js';
import './App.css';
import Login_Signup from './components/Login_Signup.js';
import Dashboard from './components/Dashboard.js';


function App() {
  const userName = "Laura T";
  const trafficUsed = 1200;
  const maxTraffic = 5000;
  const userIPs = ["192.168.1.1", "127.0.0.1", "10.0.0.5"];

  return (
  
    <Routes>
      {/* Passing props to HomePage */}
      <Route path="/" element={<HomePage greeting="Welcome to the Home Page!" />} />
      
      {/* Passing props to Login_Signup */}
      <Route path="/login" element={<Login_Signup initialMode="login" />} />
      
      {/* Passing props to Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <Dashboard
            userName={userName}
            trafficUsed={trafficUsed}
            maxTraffic={maxTraffic}
            userIPs={userIPs}
          />
        } 
      />
    </Routes>

  );
}

export default App;
