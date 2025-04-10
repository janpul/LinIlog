import React from 'react';
import './Homepage.css';

function Header(props) {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="water-drop"></div>
        <h1>LinIlog<span>Movement</span></h1>
      </div>
      <ul className="nav-links">
        <li><a href="#" onClick={(e) => {
          e.preventDefault();
          props.navigateTo('home');
        }}>Home</a></li>
        <li><a href="about.js" onClick={(e) => {
          e.preventDefault();
          props.navigateTo('about');
        }} className={props.currentPage === 'about' ? 'active' : ''}>About</a></li>
        <li><a href="#" onClick={(e) => {
          e.preventDefault();
          props.navigateTo('home');
        }}>Initiatives</a></li>
        <li><a href="#" onClick={(e) => {
          e.preventDefault();
          props.navigateTo('home');
        }}>Impact</a></li>
        <li><a href="#" onClick={(e) => {
          e.preventDefault();
          props.navigateTo('home');
        }} className="cta-button">Join Us</a></li>
      </ul>
    </nav>
  );
}

export default Header;