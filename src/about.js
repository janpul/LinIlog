import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import './Homepage.css';

function About(props) {
  useEffect(() => {
    // Make the header visible immediately (no animation)
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
      headerContainer.style.opacity = '1';
      headerContainer.style.transform = 'translateY(0)';
    }
    
    // First, add the visible class to the main containers, but NOT the header
    setTimeout(() => {
      // Make sure all containers get the visible class
      const aboutContent = document.querySelector('.about-content-wrapper');
      if (aboutContent) {
        aboutContent.classList.add('visible');
      }
      
      const aboutPage = document.querySelector('.about-page-content');
      if (aboutPage) {
        aboutPage.classList.add('visible');
      }
      
      const teamSection = document.querySelector('.team-section');
      if (teamSection) {
        teamSection.classList.add('visible');
      }
      
      // Get all animated elements on the page EXCEPT the header
      const animatedElements = document.querySelectorAll('.about-content-wrapper .fade-in, .about-content-wrapper .slide-up, .about-content-wrapper .team-member, .about-content-wrapper .ripple-effect-small');
      
      // First remove the animation classes and reset animations
      animatedElements.forEach(element => {
        // Reset animation
        element.style.animation = 'none';
        void element.offsetHeight;
        element.style.transition = 'none';
        void element.offsetHeight;
        
        // Reset transform state
        if (element.classList.contains('team-member')) {
          element.style.transform = 'translateY(20px)';
          element.style.opacity = '0';
          void element.offsetHeight;
        }
      });
      
      // Then add animations back after a tiny delay
      setTimeout(() => {
        // Re-enable transitions
        animatedElements.forEach(element => {
          element.style.transition = '';
        });
        
        // Apply team member animations with a staggered delay
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
          setTimeout(() => {
            member.style.transform = 'translateY(0)';
            member.style.opacity = '1';
          }, index * 150); // Stagger each team member
        });
        
        // Re-enable all animations
        animatedElements.forEach(element => {
          element.style.animation = '';
          
          // Force restart by re-applying the original class
          const classes = element.className.split(' ');
          
          if (classes.includes('fade-in')) {
            element.classList.remove('fade-in');
            setTimeout(() => element.classList.add('fade-in'), 10);
          }
          
          if (classes.includes('slide-up')) {
            const hasDelay = classes.includes('delay-1') || classes.includes('delay-2');
            element.classList.remove('slide-up');
            setTimeout(() => {
              element.classList.add('slide-up');
              if (hasDelay && !element.classList.contains('delay-1') && !element.classList.contains('delay-2')) {
                if (classes.includes('delay-1')) element.classList.add('delay-1');
                if (classes.includes('delay-2')) element.classList.add('delay-2');
              }
            }, 10);
          }
          
          if (classes.includes('ripple-effect-small')) {
            element.style.animation = 'none';
            void element.offsetHeight;
            element.style.animation = 'ripple 4s ease-in-out infinite';
          }
        });
      }, 50);
      
    }, 100);
    
    // Cleanup function when component unmounts
    return () => {
      const aboutContent = document.querySelector('.about-content-wrapper');
      if (aboutContent) {
        aboutContent.classList.remove('visible');
      }
      const aboutPage = document.querySelector('.about-page-content');
      if (aboutPage) {
        aboutPage.classList.remove('visible');
      }
      const teamSection = document.querySelector('.team-section');
      if (teamSection) {
        teamSection.classList.remove('visible');
      }
    };
  }, []);

  return (
    <div className="about-page">
      {/* Header - outside the animated content wrapper */}
      <div className="header-container">
        <Header navigateTo={props.navigateTo} currentPage="about" />
      </div>

      {/* Main content with animation - wrapped in a separate div */}
      <div className="about-page-content">
        <div className="about-content-wrapper">
          {/* Hero Section - styled like the homepage hero */}
          <section className="about-hero hero">
            <div className="hero-content">
              <h1 className="fade-in">Meet Our Developers</h1>
              <p className="slide-up delay-1">The talented team behind the LinIlog Movement website</p>
            </div>
          </section>

          {/* Team Members Section */}
          <section className="team-section about">
            <h2>Our Team</h2>
            <div className="divider"><div className="water-drop"></div></div>
            <div className="team-container about-content">
              {/* Developer 1 */}
              <div className="team-member">
                <div className="member-image placeholder-image">
                  <img 
                    src="./dev1.jpg" 
                    alt="Lead Developer" 
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('placeholder-image');
                      const ripple = document.createElement('div');
                      ripple.className = 'ripple-effect-small';
                      e.target.parentNode.appendChild(ripple);
                    }}
                  />
                </div>
                <h3>Lead Developer</h3>
                <p className="member-title">Frontend & UX Specialist</p>
                <p className="member-bio">
                  Responsible for creating the user interface and ensuring a seamless user experience.
                  Specializes in responsive design and interactive elements.
                </p>
              </div>

              {/* Developer 2 */}
              <div className="team-member">
                <div className="member-image placeholder-image">
                  <img 
                    src="./dev2.jpg" 
                    alt="Backend Developer" 
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('placeholder-image');
                      const ripple = document.createElement('div');
                      ripple.className = 'ripple-effect-small';
                      e.target.parentNode.appendChild(ripple);
                    }}
                  />
                </div>
                <h3>Backend Developer</h3>
                <p className="member-title">System Architecture Expert</p>
                <p className="member-bio">
                  Handles server-side logic, database management, and API integration.
                  Ensures the website performs efficiently and securely.
                </p>
              </div>

              {/* Developer 3 */}
              <div className="team-member">
                <div className="member-image placeholder-image">
                  <img 
                    src="./dev3.jpg" 
                    alt="UI/UX Designer" 
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('placeholder-image');
                      const ripple = document.createElement('div');
                      ripple.className = 'ripple-effect-small';
                      e.target.parentNode.appendChild(ripple);
                    }}
                  />
                </div>
                <h3>UI/UX Designer</h3>
                <p className="member-title">Creative Director</p>
                <p className="member-bio">
                  Designs intuitive and visually appealing interfaces for the website.
                  Passionate about creating engaging digital experiences that inspire action.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer navigateTo={props.navigateTo} />
    </div>
  );
}

export default About;