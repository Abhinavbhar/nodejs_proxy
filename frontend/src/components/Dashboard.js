// import React from 'react';
// import '../Dashboard.css';

// const Dashboard = ({ userName, trafficUsed, maxTraffic, userIPs }) => {
//   const trafficPercentage = (trafficUsed / maxTraffic) * 100;

//   return (
//     <div className="dashboard-container">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div className="user-name">Welcome, {userName}!</div>
        
//       </div>

//       {/* Traffic Section */}
//       <div className="traffic-section">
//         <div
//           className="traffic-circle"
//           style={{
//             background: `conic-gradient(#4caf50 ${trafficPercentage}%, #ddd ${trafficPercentage}% 100%)`,
//           }}
//         >
//           <div className="traffic-info">
//             {trafficUsed}MB / {maxTraffic}MB
//           </div>
//         </div>
//       </div>

//       {/* Devices Section */}
//       <div className="devices-section">
//         <h2>Connected Devices:</h2>
//         {userIPs.length > 0 ? (
//           <ul className="devices-list">
//             {userIPs.map((ip, index) => (
//               <li key={index}>{ip}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No devices connected.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import '../Dashboard.css';
const Dashboard = ({ userName, trafficUsed, maxTraffic, userIPs }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const trafficPercentage = (trafficUsed / maxTraffic) * 100;

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-name">Welcome, {userName}!</div>
        <div className="theme-toggle">
          {/* <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span> */}
          <button onClick={toggleTheme}>
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Traffic Section */}
      <div className="traffic-section">
        <div
          className="traffic-circle"
          style={{
            background: `conic-gradient(#4caf50 ${trafficPercentage}%, #ddd ${trafficPercentage}% 100%)`,
          }}
        >
          <div className="traffic-info">{trafficUsed}MB</div>
        </div>
        <div className="traffic-stats">
          {trafficUsed}MB used out of {maxTraffic}MB
        </div>
      </div>

      {/* Devices Section */}
      <div className="devices-section">
      <button className='btnD'
          style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // margin: "120px 0",
          maxWidth: "300px",
          maxHeight: "300px",
          height:'50px',
          marginLeft: "40%",
          gap: '50px',
          fontWeight:"bolder"
          
          }}
        >
          Add Device IP
        </button>
        <h2>Connected Devices:</h2>
        {userIPs.length > 0 ? (
          <ul className="devices-list">
            {userIPs.map((ip, index) => (
              <li key={index}>{ip}</li>
            ))}
          </ul>
        ) : (
          <p>No devices connected.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
