import React from 'react';
import './About.css';

function About(props) {
  return (
    <div className="about-page">
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
          <li><a href="#" className="active">About</a></li>
          <li><a href="#" onClick={(e) => {
            e.preventDefault();
            props.navigateTo('initiatives');
          }}>Initiatives</a></li>
          <li><a href="#" onClick={(e) => {
            e.preventDefault();
            props.navigateTo('impact');
          }}>Impact</a></li>
          <li><a href="#" onClick={(e) => {
            e.preventDefault();
            props.navigateTo('join');
          }} className="cta-button">Join Us</a></li>
        </ul>
      </nav>

      <section className="about-hero">
        <h1>Our Team</h1>
        <p>Meet the passionate individuals behind the LinIlog Movement</p>
      </section>

      <section className="team-section">
        <div className="team-container">
          <div className="team-member">
            <div className="member-image placeholder-image">
              <div className="ripple-effect-small"></div>
            </div>
            <h3>Jane Rivera</h3>
            <p className="member-title">Founder & Environmental Scientist</p>
            <p className="member-bio">
              Jane leads our scientific research efforts and cleanup operations strategy. 
              With over 10 years of experience in water conservation, she is passionate about 
              restoring the health of our river ecosystems.
            </p>
            <div className="member-social">
              <a href="#" className="social-icon linkedin-icon"></a>
              <a href="#" className="social-icon email-icon"></a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-image placeholder-image">
              <div className="ripple-effect-small"></div>
            </div>
            <h3>Marco Santos</h3>
            <p className="member-title">Community Outreach Director</p>
            <p className="member-bio">
              Marco coordinates our volunteer programs and builds partnerships with local 
              communities. His background in community development helps us create sustainable 
              solutions that benefit both rivers and people.
            </p>
            <div className="member-social">
              <a href="#" className="social-icon linkedin-icon"></a>
              <a href="#" className="social-icon email-icon"></a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-image placeholder-image">
              <div className="ripple-effect-small"></div>
            </div>
            <h3>Lina Cruz</h3>
            <p className="member-title">Education & Advocacy Coordinator</p>
            <p className="member-bio">
              Lina develops our educational programs and advocacy campaigns. Her expertise in 
              environmental education helps raise awareness about river conservation among 
              students and communities throughout the region.
            </p>
            <div className="member-social">
              <a href="#" className="social-icon linkedin-icon"></a>
              <a href="#" className="social-icon email-icon"></a>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <p>
            At LinIlog Movement, we envision a future where rivers flow clean and healthy, 
            supporting thriving ecosystems and communities. We believe that by working together, 
            we can restore and protect our waterways for generations to come.
          </p>
        </div>
      </section>

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
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/#initiatives">Initiatives</a></li>
                <li><a href="/#impact">Impact</a></li>
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

export default About;