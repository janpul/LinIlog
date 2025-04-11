// app.js
import React, { useState } from 'react';
import Homepage from './homepage';
import About from './about'; // This will now work with the default export
import Signup from './signup';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="App">
      {currentPage === 'home' && <Homepage navigateTo={navigateTo} />}
      {currentPage === 'about' && <About navigateTo={navigateTo} />}
      {currentPage === 'signup' && <Signup navigateTo={navigateTo} />}
    </div>
  );
}

export default App;