import React from 'react';
import './HeroSection.css'; // Assuming you will create a CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Save Our Rivers</h1>
        <p>Join us in our mission to protect and preserve the rivers of the Philippines.</p>
        <button className="hero-button">Get Involved</button>
      </div>
      <div className="water-animation">
        {/* Water animation component can be placed here */}
      </div>
    </div>
  );
};

export default HeroSection;