// app.js
 import React, { useState } from 'react';
import Homepage from './homepage';
import About from './about';
import './index.css'; 

function App() {
  // State to track current page
  const [currentPage, setCurrentPage] = useState('home');
  
  // Function to navigate between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <Homepage navigateTo={navigateTo} />
      ) : (
        <About navigateTo={navigateTo} />
      )}
    </div>
  );
}

export default App;