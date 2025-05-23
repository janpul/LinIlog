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
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Set hero loaded with delay for animation
    const heroTimer = setTimeout(() => {
      setHeroLoaded(true);
    }, 1000);
    
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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(heroTimer);
    };
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
      <Header navigateTo={props.navigateTo} currentPage="home" />      {/* Updated Hero Section - Mobile Responsive */}
      <section id="home" className="hero">
        <div className="water-waves"></div>
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className={`hero-content ${heroLoaded ? 'loaded' : ''}`}>
          <div className="hero-badge">
            <span>Philippine River Conservation</span>
          </div>
          <h1 className="hero-title">
            <div className="reveal-text">Clean Waters,</div>
            <div className="reveal-text delay-1">Better Future</div>
            <div className="hero-title-accent reveal-text delay-2">"Alon ng Pagbabago"</div>
          </h1>
          <p className="hero-subtitle">Join our mission to restore river health through cleanup operations, 
            public awareness, and community partnerships.</p>
          <div className="hero-buttons">
            <a href="/signup" className="cta-button primary-btn">
              <span>Get Involved</span>
              <i className="arrow-icon">→</i>
            </a>
            <a href="/about" className="cta-button secondary-btn">
              <span>Learn More</span>
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">12+</span>
              <span className="hero-stat-label">Rivers</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">500+</span>
              <span className="hero-stat-label">Volunteers</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">5+</span>
              <span className="hero-stat-label">Communities</span>
            </div>
          </div>
        </div>
      </section>

            <section id="about" className={`about ${isVisible.about ? 'visible' : ''}`}>
              <h2>Our Mission</h2>
              <div className="divider"><div className="water-drop"></div></div>
              <div className="about-content" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem'}}>
                <div className="about-text" style={{flex: '2 1 350px', minWidth: 0}}>
                  <p style={{fontSize: '1.15rem', fontWeight: 500, color: '#0369a1'}}>
                    LinIlog is pioneering a new era of river restoration in the Philippines. Our mission: to intercept plastic waste, empower local communities, and create a cleaner, more sustainable future for our waterways.
                  </p>
                  <ul style={{margin: '1.2rem 0 1.2rem 1.2rem', color: '#0ea5e9', fontWeight: 500}}>
                    <li>Innovative river cleanup systems remove plastic before it reaches the sea</li>
                    <li>Community engagement and education drive lasting change</li>
                    <li>Partnerships with foundations and local governments amplify our impact</li>
                  </ul>
                  <div style={{margin: '1.5rem 0'}}>
                    <span style={{
                      display: 'inline-block',
                      background: 'linear-gradient(90deg, #0ea5e9 60%, #38bdf8 100%)',
                      color: 'white',
                      borderRadius: '2rem',
                      padding: '0.5rem 1.5rem',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 8px rgba(14,165,233,0.10)'
                    }}>
                      Over 2,500 kg of waste collected and counting!
                    </span>
                  </div>
                  <p style={{marginTop: '1rem', color: '#0369a1'}}>
                    Together, we’re turning the tide on river pollution—one community, one river at a time.
                  </p>
                  <div style={{marginTop: '1.5rem'}}>
                    <a href="/signup" className="cta-button primary-btn" style={{fontSize: '1.1rem', padding: '0.7rem 2rem'}}>Join the Movement</a>
                  </div>
                </div>
                <div className="about-image" style={{flex: '1 1 300px', minWidth: 0, display: 'flex', justifyContent: 'center'}}>
                  <div className="ripple-effect" style={{maxWidth: '340px', width: '100%'}}>
                    <div className="image-container" style={{borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 24px rgba(3,105,161,0.10)'}}>
                      <img 
                        src="./SanJuanRiver.jpg" 
                        alt="River cleanup volunteers" 
                        className="about-featured-image"
                        style={{width: '100%', display: 'block'}}
                        onError={(e) => {
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
          <div className="sdg-card" style={{background: '#e0f7fa'}}>
            <img
              src="/sdg6.png"
              alt="SDG 6"
              className="sdg-icon"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                objectFit: 'cover',
                marginBottom: '1.5rem'
              }}
            />
            <h3 style={{ color: '#009de0' }}>SDG 6</h3>
            <p style={{ color: '#0369a1' }}>Clean Water and Sanitation</p>
          </div>
          <div className="sdg-card" style={{background: '#fff3e0'}}>
            <img
              src="/sdg11.png"
              alt="SDG 11"
              className="sdg-icon"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                objectFit: 'cover',
                marginBottom: '1.5rem'
              }}
            />
            <h3 style={{ color: '#f9a825' }}>SDG 11</h3>
            <p style={{ color: '#b45309' }}>Sustainable Cities and Communities</p>
          </div>
          <div className="sdg-card" style={{background: '#e8f5e9'}}>
            <img
              src="/sdg15.png"
              alt="SDG 15"
              className="sdg-icon"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                objectFit: 'cover',
                marginBottom: '1.5rem'
              }}
            />
            <h3 style={{ color: '#43a047' }}>SDG 15</h3>
            <p style={{ color: '#166534' }}>Life on Land</p>
          </div>
          <div className="sdg-card" style={{background: '#ede7f6'}}>
            <img
              src="/sdg17.png"
              alt="SDG 17"
              className="sdg-icon"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                objectFit: 'cover',
                marginBottom: '1.5rem'
              }}
            />
            <h3 style={{ color: '#5e35b1' }}>SDG 17</h3>
            <p style={{ color: '#3730a3' }}>Partnerships for the Goals</p>
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