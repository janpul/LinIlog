import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './Homepage.css';
import API_URL from './config';

function AdminRegister() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
      try {
      const response = await fetch(`${API_URL}/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Admin account created successfully!');
        navigate('/admin/login');
      } else {
        setError(data.message || 'Error creating admin account');
      }
    } catch (error) {
      console.error('Error registering admin:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-register-page">
      <Header currentPage="admin" />
      
      <div className="admin-register-content">
        <div className="admin-register-form-container">
          <div className="admin-register-form-wrapper">
            <h2>Admin Registration</h2>
            <div className="divider"><div className="water-drop"></div></div>
            
            <p className="admin-register-notice">
              This page is for creating a new admin account. Use this only if you are authorized to create admin accounts.
            </p>
            
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
                  value={formData.username}
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
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                />
                <label htmlFor="password">Password</label>
              </div>
              
              <div className="form-group">
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register Admin'}
              </button>
              
              <div className="admin-login-link">
                <p>
                  Already have an admin account? <a href="/admin/login">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;