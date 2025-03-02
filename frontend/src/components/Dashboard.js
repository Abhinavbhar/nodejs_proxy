import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Dashboard = ({ userName }) => {
  const maxTraffic = 5000;
  const navigate = useNavigate();
  
  const [userIPs, setUserIPs] = useState([]);
  const [trafficUsed, setTrafficUsed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const token = `bearer ${localStorage.getItem("token")}`
        console.log(token)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/main/getip`, {
          headers: {
            'Authorization': token
          }
        });

        // Assuming response.data has { ips: [...], totalBandwidth: number }
        setUserIPs(response.data.ips || []);
        setTrafficUsed(response.data.totalBandwidth || 0);
      } catch (error) {
        console.error("Error fetching IP data:", error);
        navigate('/login')
      }
    };

    fetchData();
  }, []);

  const trafficPercentage = (trafficUsed / maxTraffic) * 100;

 const addIp = async () => {
  const token = `bearer ${localStorage.getItem("token")}`;
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/main/addip`, {
      headers: {
        'Authorization': token
      }
    }); 
    if(response.status === 200){
      window.location.reload();  // Reloads the page
    }
  } catch (err) {
    if(err.response && err.response.status === 409){
      alert("IP Address already exists");
    } else {
      alert("Server error");
    }
  }
};


  return (
    <div className="dashboard-container light">
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-name">Welcome, {userName}!</div>
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
        <button
          className="btnD"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "300px",
            maxHeight: "300px",
            height: '50px',
            marginLeft: "40%",
            gap: '50px',
            fontWeight: "bolder"
          }}
          onClick={addIp}
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
