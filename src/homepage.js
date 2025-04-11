import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import './Homepage.css';

function Homepage(props) {
  const [isVisible, setIsVisible] = useState({
    home: true,
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

    setIsVisible(prev => ({ ...prev, home: true }));
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        // Get the target number from the text content
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''), 10);
        const duration = 2000; // Animation duration in milliseconds
        const steps = 60; // Number of steps to reach target
        const stepTime = duration / steps;
        let current = 0;
        
        // Reset content to start from 0
        counter.textContent = current + (counter.textContent.includes('+') ? '+' : '');
        
        const updateCounter = () => {
          // Calculate new value based on easing function
          const increment = Math.ceil(target / steps);
          current = Math.min(current + increment, target);
          
          // Update the counter text
          counter.textContent = current + (counter.textContent.includes('+') ? '+' : '');
          
          // Continue animation until target is reached
          if (current < target) {
            setTimeout(updateCounter, stepTime);
          }
        };
        
        updateCounter();
      });
    };
    
    // Use Intersection Observer to start animation when stats are visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect(); // Run animation only once
        }
      });
    }, { threshold: 0.3 });
    
    const statsSection = document.querySelector('.impact-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="homepage">
      {/* Use the Header component instead of inline navbar */}
      <Header navigateTo={props.navigateTo} currentPage="home" />

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
          <a href="#join" className="cta-button slide-up delay-3 pulse">Join The Movement</a>
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
            <div className="ripple-effect">
              <div className="image-container">
                <img 
                  src="./SanJuanRiver.jpg" 
                  alt="River cleanup volunteers" 
                  className="about-featured-image"
                  onError={(e) => {
                    // If image fails to load, hide it but keep the ripple effect
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
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

      {/* Use the Footer component instead of inline footer */}
      <Footer navigateTo={props.navigateTo} />
    </div>
  );
}

export default Homepage;