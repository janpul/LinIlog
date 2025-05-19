import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './Homepage.css';
import API_URL from './config';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Fetch submissions
    fetchSubmissions();
  }, [navigate]);
    const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken');      
      if (!token) {
        setError('No authentication token found. Please log in again.');
        navigate('/admin/login');
        return;
      }
      
      const response = await fetch(`${API_URL}/api/admin/submissions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmissions(data.submissions);
      } else {
        setError(data.message || 'Failed to fetch submissions');
        // If token is invalid, redirect to login
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getInterestType = (interest) => {
    const interestMap = {
      'volunteer': 'Volunteering for Cleanup Events',
      'donate': 'Making a Donation',
      'education': 'Educational Programs',
      'partner': 'Corporate Partnership',
      'other': 'Other'
    };
    
    return interestMap[interest] || interest;
  };

  return (
    <div className="admin-dashboard-page">
      <Header currentPage="admin" />
      
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h2>Admin Dashboard</h2>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        
        <div className="divider"><div className="water-drop"></div></div>
        
        <div className="admin-submissions-container">
          <h3>Signup Form Submissions</h3>
          
          {loading ? (
            <div className="loading-message">
              <p>Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={fetchSubmissions}
              >
                Retry
              </button>
            </div>
          ) : submissions.length === 0 ? (
            <div className="no-submissions-message">
              <p>No submissions found.</p>
            </div>
          ) : (
            <div className="submissions-table-wrapper">
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Interest</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission._id}>
                      <td>{formatDate(submission.createdAt)}</td>
                      <td>{submission.name}</td>
                      <td>
                        <a href={`mailto:${submission.email}`}>
                          {submission.email}
                        </a>
                      </td>
                      <td>{getInterestType(submission.interest)}</td>
                      <td>{submission.message || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;