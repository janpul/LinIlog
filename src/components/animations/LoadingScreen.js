import React from 'react';
import './LoadingScreen.css'; // Assuming you have a CSS file for loading animations

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="water-animation">
        {/* Add your water animation here, e.g., SVG or CSS animation */}
      </div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingScreen;