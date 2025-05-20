import React from 'react';
import Header from './header';
import Footer from './footer';
import { Link } from 'react-router-dom';
import './Homepage.css';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <Header currentPage="404" />
      
      {/* Hero Section */}
      <section id="notfound" className="hero">
        <div className="hero-content">
          <h1 className="fade-in">404</h1>
          <h2 className="slide-up delay-1">Page Not Found</h2>
          <p className="slide-up delay-2">
            You've been washed away to a place that may have been moved, deleted, 
            or perhaps doesn't exist.
          </p>
          <Link to="/" className="cta-button slide-up delay-3 pulse">
            Return to Homepage
          </Link>
        </div>
        <div className="floating-elements">
          <div className="floating-leaf leaf-1"></div>
          <div className="floating-leaf leaf-2"></div>
          <div className="floating-leaf leaf-3"></div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default NotFound;
