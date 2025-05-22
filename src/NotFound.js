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
        {/* Simple Hero Section */}
      <section id="notfound" className="simple-hero">
        <div className="simple-hero-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            You've been washed away to a place that may have been moved, deleted, 
            or perhaps doesn't exist.
          </p>
          <Link to="/" className="cta-button">
            Return to Homepage
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default NotFound;
