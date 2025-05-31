import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
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
  
  // Calculate left offset for About nav item
  const aboutNavRef = React.useRef(null);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  useEffect(() => {
    if (aboutDropdownOpen && aboutNavRef.current) {
      const rect = aboutNavRef.current.getBoundingClientRect();
      setDropdownLeft(rect.left);
    }
  }, [aboutDropdownOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-water-drops">
        <div className="navbar-drop"></div>
        <div className="navbar-drop"></div>
        <div className="navbar-drop"></div>
      </div>
        <div 
        className="logo" 
        onClick={(e) => handleNavigation('/', e)} 
        style={{ cursor: 'pointer' }}
      >
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
            href="/problem" 
            className={props.currentPage === 'problem' ? 'active' : ''}
            onClick={(e) => handleNavigation('/problem', e)}
          >
            Plastic Pollution Crisis
          </a>
        </li>
        <li style={{ position: "relative" }}>
          <a
            href="/about"
            className={props.currentPage === 'about' || props.currentPage === 'cleanups' ? 'active' : ''}
            ref={aboutNavRef}
            onClick={e => {
              e.preventDefault();
              setAboutDropdownOpen(open => !open);
            }}
            aria-haspopup="true"
            aria-expanded={aboutDropdownOpen}
            style={{ cursor: 'pointer' }}
          >
            About <span className="dropdown-arrow"> ▼</span>
          </a>
          {aboutDropdownOpen && (
            <div
              className="about-dropdown-menu"
              style={{
                position: "fixed",
                top: 70,
                left: dropdownLeft,
                minWidth: aboutNavRef.current ? aboutNavRef.current.offsetWidth : 180,
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                borderRadius: 10,
                zIndex: 2000,
                padding: "0.5em 0"
              }}
            >
              <button
                className="about-dropdown-item"
                style={{
                  padding: "0.75em 1.5em",
                  color: "#0369a1",
                  fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif",
                  fontWeight: 500,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  fontSize: "1rem",
                  outline: "none",
                  display: "block",
                  transition: "background-color 0.3s ease, color 0.3s ease"
                }}
                onClick={e => {
                  setAboutDropdownOpen(false);
                  handleNavigation('/about', e);
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#c2e0f1"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#fff"}
                type="button"
              >
                About Us
              </button>
              <button
                className="about-dropdown-item"
                style={{
                  padding: "0.75em 1.5em",
                  color: "#0369a1",
                  fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif",
                  fontWeight: 500,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  fontSize: "1rem",
                  outline: "none",
                  display: "block",
                  transition: "background-color 0.3s ease, color 0.3s ease"
                }}
                onClick={e => {
                  setAboutDropdownOpen(false);
                  handleNavigation('/cleanups', e);
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#c2e0f1"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#fff"}
                type="button"
              >
                Clean Ups
              </button>
            </div>
          )}
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