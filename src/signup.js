import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import './Homepage.css';

function Signup(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });

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
      const signupContent = document.querySelector('.signup-content-wrapper');
      if (signupContent) {
        signupContent.classList.add('visible');
      }
      
      const signupPage = document.querySelector('.signup-page-content');
      if (signupPage) {
        signupPage.classList.add('visible');
      }
      
      const formSection = document.querySelector('.signup-form-section');
      if (formSection) {
        formSection.classList.add('visible');
      }
    }, 100);
    
    // Cleanup function when component unmounts
    return () => {
      const signupContent = document.querySelector('.signup-content-wrapper');
      if (signupContent) {
        signupContent.classList.remove('visible');
      }
      
      const signupPage = document.querySelector('.signup-page-content');
      if (signupPage) {
        signupPage.classList.remove('visible');
      }
      
      const formSection = document.querySelector('.signup-form-section');
      if (formSection) {
        formSection.classList.remove('visible');
      }
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for joining the LinIlog Movement! We will be in touch soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      interest: '',
      message: ''
    });
  };

  return (
    <div className="signup-page">
      <div className="header-container">
        <Header navigateTo={props.navigateTo} currentPage="signup" />
      </div>
      
      <div className="signup-page-content">
        <div className="signup-content-wrapper">
          {/* Hero Section */}
            <section className="about-hero hero">
            <div className="water-drops">
              <div className="drop"></div>
              <div className="drop"></div>
              <div className="drop"></div>
            </div>
            <div className="hero-content">
              <h1 className="fade-in">Join The Movement</h1>
              <p className="slide-up delay-1">Be part of the solution for cleaner rivers and a healthier environment</p>
            </div>
          </section>

          <section className="signup-form-section">
            <div className="container">
              <div className="signup-intro fade">
                <h2>Get Involved Today</h2>
                <div className="divider"><div className="water-drop"></div></div>
                <p>
                  Join the LinIlog Movement and help us make a difference in our community's 
                  water resources. Whether you want to volunteer for cleanup events, contribute 
                  financial support, or partner with us on environmental initiatives, your 
                  involvement matters.
                </p>
              </div>

              {/* Enhanced signup form comes first for better flow */}
              <div className="enhanced-signup-form fade-in">
                <form onSubmit={handleSubmit}>
                  <h3>Sign Up Now</h3>
                  <div className="divider"><div className="water-drop"></div></div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                    
                    <div className="form-group">
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    
                    <div className="form-group">
                      <select 
                        id="interest" 
                        value={formData.interest}
                        onChange={handleChange}
                        required
                      >
                        <option value="">I'm interested in...</option>
                        <option value="volunteer">Volunteering for Cleanup Events</option>
                        <option value="donate">Making a Donation</option>
                        <option value="education">Educational Programs</option>
                        <option value="partner">Corporate Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      <label htmlFor="interest">Area of Interest</label>
                    </div>
                    
                    <div className="form-group full-width">
                      <textarea 
                        id="message" 
                        placeholder="Your Message (Optional)" 
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  
                  <div className="form-terms">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                      I agree to receive updates from the LinIlog Movement about events, volunteer opportunities, and environmental initiatives.
                    </label>
                  </div>
                  
                  <button type="submit" className="submit-button">Join The Movement</button>
                </form>
              </div>
              
              {/* Benefits section moved below the form */}
              <div className="signup-benefits fade-in">
                <h3>How Your Participation Makes a Difference</h3>
                <div className="divider"><div className="water-drop"></div></div>
                <ul>
                  <li>
                    <div className="volunteer-icon"></div>
                    <div className="benefit-text">
                      <h4>Volunteer Impact</h4>
                      <p>Our volunteers have collectively removed over 5 tons of waste from local rivers and helped restore natural habitats.</p>
                    </div>
                  </li>
                  <li>
                    <div className="benefit-icon education-icon"></div>
                    <div className="benefit-text">
                      <h4>Community Education</h4>
                      <p>Through educational programs, we've reached thousands of people and raised awareness about water conservation.</p>
                    </div>
                  </li>
                  <li>
                    <div className="benefit-icon partner-icon"></div>
                    <div className="benefit-text">
                      <h4>Corporate Partnerships</h4>
                      <p>Partner with us to enhance your company's environmental initiatives and make a lasting impact on our natural resources.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer navigateTo={props.navigateTo} />
    </div>
  );
}

export default Signup;