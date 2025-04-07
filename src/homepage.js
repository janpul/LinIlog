import React, { useState, useEffect } from 'react';
import './Homepage.css';

function Homepage(props) {
  const [isVisible, setIsVisible] = useState({
    home: true, // Add this line to make home visible by default
    about: false,
    initiatives: false,
    impact: false,
    join: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'initiatives', 'impact', 'join'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const position = element.getBoundingClientRect();
          if (position.top < window.innerHeight - 100) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    // Initialize state with home visible
    setIsVisible(prev => ({ ...prev, home: true }));

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial positions
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
            <div className="water-drop"></div>
            <h1>LinIlog<span>Movement</span></h1>
        </div>
        <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#" onClick={(e) => {
            e.preventDefault();
            props.navigateTo('about');
            }}>About</a></li>
            <li><a href="#initiatives">Initiatives</a></li>
            <li><a href="#impact">Impact</a></li>
            <li><a href="#join" className="cta-button">Join Us</a></li>
        </ul>
    </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="water-waves"></div>
        <div className="hero-content">
          <h1 className="fade-in">The LinIlog Movement</h1>
          <h2 className="slide-up delay-1">"Alon ng Pagbabago"</h2>
          <p className="slide-up delay-2">
            Join our mission to restore river health through cleanup operations, 
            public awareness, and community partnerships.
          </p>
          <a href="#join" className="cta-button pulse">Join The Movement</a>
        </div>
        <div className="floating-elements">
          <div className="floating-leaf leaf-1"></div>
          <div className="floating-leaf leaf-2"></div>
          <div className="floating-leaf leaf-3"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`about ${isVisible.about ? 'visible' : ''}`}>
        <h2>Our Mission</h2>
        <div className="divider"><div className="water-drop"></div></div>
        <div className="about-content">
          <div className="about-text">
            <p>
              The LinIlog Movement is an information and advocacy platform that aims to 
              raise awareness and mobilize support for long-term river cleanup initiatives. 
              We work to restore river health through organized cleanup operations, raising 
              public awareness, and partnerships with environmental organizations, 
              local governments, and individuals.
            </p>
          </div>
          <div className="about-image">
            <div className="ripple-effect"></div>
          </div>
        </div>
      </section>

      {/* SDGs Section */}
      <section id="sdgs" className={`sdgs ${isVisible.about ? 'visible' : ''}`}>
        <h2>Supporting Sustainable Development Goals</h2>
        <div className="divider"><div className="water-drop"></div></div>
        <div className="sdg-container">
          <div className="sdg-card">
            <div className="sdg-icon sdg-6"></div>
            <h3>SDG 6</h3>
            <p>Clean Water and Sanitation</p>
          </div>
          <div className="sdg-card">
            <div className="sdg-icon sdg-15"></div>
            <h3>SDG 15</h3>
            <p>Life on Land</p>
          </div>
          <div className="sdg-card">
            <div className="sdg-icon sdg-11"></div>
            <h3>SDG 11</h3>
            <p>Sustainable Cities and Communities</p>
          </div>
          <div className="sdg-card">
            <div className="sdg-icon sdg-17"></div>
            <h3>SDG 17</h3>
            <p>Partnerships for the Goals</p>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className={`initiatives ${isVisible.initiatives ? 'visible' : ''}`}>
        <h2>Our Initiatives</h2>
        <div className="divider"><div className="water-drop"></div></div>
        <div className="initiative-cards">
          <div className="initiative-card">
            <div className="initiative-icon cleanup-icon"></div>
            <h3>River Cleanup Operations</h3>
            <p>Regular volunteer-driven cleanup activities targeting local rivers and their surrounding areas.</p>
          </div>
          <div className="initiative-card">
            <div className="initiative-icon awareness-icon"></div>
            <h3>Public Awareness Campaigns</h3>
            <p>Educational programs and media campaigns to raise awareness about river pollution and conservation.</p>
          </div>
          <div className="initiative-card">
            <div className="initiative-icon partnership-icon"></div>
            <h3>Community Partnerships</h3>
            <p>Collaborating with local governments, schools, and organizations to create sustainable solutions.</p>
          </div>
          <div className="initiative-card">
            <div className="initiative-icon monitoring-icon"></div>
            <h3>Water Quality Monitoring</h3>
            <p>Regular testing and reporting on water quality to track improvement and identify problem areas.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className={`impact ${isVisible.impact ? 'visible' : ''}`}>
        <h2>Our Impact</h2>
        <div className="divider"><div className="water-drop"></div></div>
        <div className="impact-stats">
          <div className="stat-card">
            <div className="stat-number counter">500+</div>
            <p>Volunteers Engaged</p>
          </div>
          <div className="stat-card">
            <div className="stat-number counter">12</div>
            <p>River Cleanup Events</p>
          </div>
          <div className="stat-card">
            <div className="stat-number counter">2,500</div>
            <p>kg of Waste Collected</p>
          </div>
          <div className="stat-card">
            <div className="stat-number counter">5</div>
            <p>Local Communities Impacted</p>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className={`join-us ${isVisible.join ? 'visible' : ''}`}>
        <h2>Join the Movement</h2>
        <div className="divider"><div className="water-drop"></div></div>
        <div className="join-container">
          <div className="join-text">
            <p>
              Be part of the solution! Join the LinIlog Movement today and help us create 
              cleaner, healthier rivers for future generations. Whether you want to volunteer 
              for cleanup events, donate to support our work, or spread awareness in your community, 
              there's a place for you in our movement.
            </p>
          </div>
          <div className="signup-form">
            <h3>Sign Up Now</h3>
            <form>
              <div className="form-group">
                <input type="text" id="name" placeholder="Your Name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" placeholder="Your Email" required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <select id="interest" required>
                  <option value="">I'm interested in...</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donate">Donating</option>
                  <option value="partner">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Join Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
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
    </div>
  );
}

export default Homepage;