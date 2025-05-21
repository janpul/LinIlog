import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Admin.css';

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('adminToken');
  
  // Determine which page is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-logo">
          <Link to={isLoggedIn ? "/admin/dashboard" : "/admin/login"}>
            LinIlog<span>Admin</span>
          </Link>
        </div>
        
        <div className="admin-navbar-links">
          {isLoggedIn ? (
            <>
              <Link 
                to="/admin/dashboard" 
                className={`admin-navbar-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <button 
                className="admin-navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/admin/login" 
                className={`admin-navbar-link ${isActive('/admin/login') ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/admin/register" 
                className={`admin-navbar-link ${isActive('/admin/register') ? 'active' : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
