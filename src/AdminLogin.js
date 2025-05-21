import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './Admin.css';
import API_URL from './config';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      // User already has a token, redirect to dashboard
      navigate('/admin/dashboard');
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
      try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
        if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content">
        <div className="admin-form-container">
          <div className="admin-form-wrapper admin-fade-in">
            <h2>Admin Login</h2>
            
            {error && (
              <div className="admin-error-message">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Username" 
                  value={credentials.username}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                />
                <label htmlFor="username">Username</label>
              </div>
              
              <div className="admin-form-group">
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Password" 
                  value={credentials.password}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                />
                <label htmlFor="password">Password</label>
              </div>
              
              <button 
                type="submit" 
                className="admin-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;