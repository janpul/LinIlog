import React from 'react';
import './Homepage.css';

function Footer(props) {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <div className="water-drop"></div>
          <h3>LinIlog Movement</h3>
          <p>Alon ng Pagbabago</p>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a 
                  href="#home"
                  onClick={(e) => {
                    if (props.currentPage !== 'home') {
                      e.preventDefault();
                      props.navigateTo('home');
                    }
                  }}
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
                >
                  About Us
                </a>
              </li>
              <li><a href="#initiatives">Initiatives</a></li>
              <li><a href="#impact">Impact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Email Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 LinIlog Movement. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;