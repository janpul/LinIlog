import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Custom navigation handler that scrolls to top
  const handleNavigation = (path, e) => {
    e.preventDefault();
    
    // First scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if it's open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Then navigate after a short delay to ensure smooth scroll completes
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-water-drops">
        <div className="navbar-drop"></div>
        <div className="navbar-drop"></div>
        <div className="navbar-drop"></div>
      </div>
      
      <div className="logo">
        <div className="water-drop"></div>
        <h1>LinIlog<span>Movement</span></h1>
      </div>
      
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span className={mobileMenuOpen ? 'open' : ''}></span>
        <span className={mobileMenuOpen ? 'open' : ''}></span>
        <span className={mobileMenuOpen ? 'open' : ''}></span>
      </div>
      
      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
        <li>
          <a 
            href="/" 
            className={props.currentPage === 'home' ? 'active' : ''}
            onClick={(e) => handleNavigation('/', e)}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            className={props.currentPage === 'about' ? 'active' : ''}
            onClick={(e) => handleNavigation('/about', e)}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="/admin/login" 
            className={props.currentPage === 'admin' ? 'active' : ''}
            onClick={(e) => handleNavigation('/admin/login', e)}
          >
            Admin
          </a>
        </li>
        <li>
          <a 
            href="/signup" 
            className="cta-button no-underline"
            onClick={(e) => handleNavigation('/signup', e)}
          >
            Join Us
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;