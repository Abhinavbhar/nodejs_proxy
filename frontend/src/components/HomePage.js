import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [textColor, setTextColor] = useState('white'); // Default text color

  useEffect(() => {
    // GSAP animations for initial loading
    gsap.from('.navbar', { duration: 1, y: -50, opacity: 0 });
    gsap.from('.content', { duration: 1, opacity: 0, delay: 0.5 });

    // GSAP animation for navbar color change
    ScrollTrigger.create({
      trigger: '.section-two', // Replace with your actual section class
      start: "top 50%",
      end: "bottom 0%",
      onEnter: () => {
        gsap.to('.navbar', { duration: 1.0, backgroundColor: 'black' });
      },
      onLeaveBack: () => {
        gsap.to('.navbar', { duration: 1.0, backgroundColor: 'lightgreen' });
      }
    });

    // Tubelight effect for text color
    const colors = ['white', 'teal'];
    let index = 0;
    const interval = setInterval(() => {
      setTextColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 250); // Change color every 300ms

    // Stop after 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setTextColor('white'); // Set final color to white
    }, 2500); // Stop after 3.5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    }; // Cleanup on unmount
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: 'lightgreen', padding: '10px' }}>
        <div className="title" style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: 'chartreuse', fontSize: '80px', fontFamily: '-moz-initial' }}>PROXIFY</div>
        <div style={{ marginLeft: '10px' }}>
          <button className='btn'>Home</button>
          <button className='btn'>About</button>
          <button className='btn'>Login/Sign Up</button>
        </div>
      </div>

      {/* SVG Section */}
      <div style={{ position: 'relative', width: '100%', height: '130vh', overflow: 'hidden' }}>
        <img src="/content.jpg" alt="Description" style={{ width: '130%', height: '130%', position: 'absolute', top: '-15%', left: '-15%', filter:'brightness(0.5)' }} />
        <div className='contentText' style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '40%', 
          transform: 'translate(-50%, -50%)', 
          color: textColor, 
          fontSize: '150px', 
          textAlign: 'left', 
          font: '-moz-initial', 
          transition: 'color 0.5s ease' // Smooth transition for color change
        }}>
          SIMPLIFLYING ACCESS, ENHANCING COLLABORATION
        </div>
      </div>

      {/* Main Content */}
      <div className="content" style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <img src="/example.jpg" alt="Description" style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <p>Your description goes here.</p>
        </div>
      </div>

      {/* How to Use Section */}
      <div style={{ marginTop: '20px' }}>
        <h2>How to Use</h2>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/video_id" title="YouTube video" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div style={{ marginTop: '20px' }}>
        <p>Line description goes here.</p>
        <button style={{ backgroundColor: 'lightgreen' }}>Get Started</button>
      </div>
    </div>
  );
};

export default HomePage;
