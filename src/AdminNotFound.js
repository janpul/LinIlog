import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './Admin.css';

function AdminNotFound() {
  // Check if user is logged in to determine redirect destination
  const isLoggedIn = localStorage.getItem('adminToken');
  const redirectPath = isLoggedIn ? '/admin/dashboard' : '/admin/login';
  
  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content">
        <div className="admin-not-found-container">
          <div className="admin-not-found-content admin-fade-in">
            <div className="admin-not-found-code">404</div>
            <h1>Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div className="admin-not-found-actions">
              <Link to={redirectPath} className="admin-button">
                Return to {isLoggedIn ? 'Dashboard' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>  );
}

export default AdminNotFound;
