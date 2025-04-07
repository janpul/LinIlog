import React from 'react';
import Navigation from './Navigation';
import './Header.css'; // Assuming you have a separate CSS file for header styles

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Save Our Rivers</h1>
      <Navigation />
    </header>
  );
};

export default Header;