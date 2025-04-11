import React from 'react';
import './Homepage.css';

function Header(props) {
  return (
    <nav className="navbar">
      <div className="navbar-water-drops">
        <div className="navbar-drop"></div>
        <div className="navbar-drop"></div>
        <div className="navbar-drop"></div>
      </div>
      
      <div className="logo">
        <div className="water-drop"></div>
        <h1>LinIlog<span>Movement</span></h1>
      </div>
      
      <ul className="nav-links">
        <li>
          <a 
            href="#home" 
            onClick={(e) => {
              if (props.currentPage !== 'home') {
                e.preventDefault();
                props.navigateTo('home');
              }
            }}
            className={props.currentPage === 'home' ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              props.navigateTo('about');
            }}
            className={props.currentPage === 'about' ? 'active' : ''}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              // Always force a complete remount for the signup page
              if (props.currentPage === 'signup') {
                props.navigateTo('home');
                setTimeout(() => {
                  props.navigateTo('signup');
                }, 50); // Slightly longer delay to ensure complete unmount
              } else {
                props.navigateTo('signup');
              }
            }}
            className="cta-button"
          >
            Join Us
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;