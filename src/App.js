// app.js
import React, { useState } from 'react';
import Homepage from './homepage';
import About from './about'; // Make sure the path is correct
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <Homepage navigateTo={navigateTo} />
      ) : currentPage === 'about' ? (
        <About navigateTo={navigateTo} />
      ) : (
        <Homepage navigateTo={navigateTo} />
      )}
    </div>
  );
}

export default App;