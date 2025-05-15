import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './Homepage.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
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
      const response = await fetch('http://localhost:5000/api/admin/login', {
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
  };

  return (
    <div className="admin-login-page">
      <Header currentPage="admin" />
      
      <div className="admin-login-content">
        <div className="admin-login-form-container">
          <div className="admin-login-form-wrapper">
            <h2>Admin Login</h2>
            <div className="divider"><div className="water-drop"></div></div>
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
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
              
              <div className="form-group">
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
                className="submit-button"
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