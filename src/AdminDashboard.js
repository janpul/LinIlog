import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './Admin.css';
import API_URL from './config';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    volunteer: 0,
    donate: 0,
    education: 0,
    partner: 0,
    other: 0
  });
  
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
        
        // Calculate statistics
        const stats = {
          total: data.submissions.length,
          volunteer: 0,
          donate: 0,
          education: 0,
          partner: 0,
          other: 0
        };
        
        data.submissions.forEach(submission => {
          if (submission.interest in stats) {
            stats[submission.interest]++;
          } else {
            stats.other++;
          }
        });
        
        setStats(stats);
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
  
  const toggleMessage = (id) => {
    setExpandedMessages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
  };  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-dashboard">
        <div className="admin-dashboard-header">
          <div className="admin-dashboard-title">Admin Dashboard</div>
          <div className="admin-dashboard-actions">
            <button 
              className="admin-button"
              onClick={fetchSubmissions}
              style={{ width: "auto", padding: "0.6rem 1.5rem", background: "var(--admin-success)" }}
            >
              <span style={{ marginRight: "0.5rem" }}>↻</span> Refresh Data
            </button>
          </div>
        </div>
        
        {/* Stats Cards Section */}
        {!loading && !error && submissions.length > 0 && (
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-value">{stats.total}</div>
              <div className="admin-stat-label">Total Submissions</div>
            </div>
            <div className="admin-stat-card" style={{ borderTop: "3px solid #27ae60" }}>
              <div className="admin-stat-value" style={{ color: "#27ae60" }}>{stats.volunteer || 0}</div>
              <div className="admin-stat-label">Volunteer Interest</div>
            </div>
            <div className="admin-stat-card" style={{ borderTop: "3px solid #2980b9" }}>
              <div className="admin-stat-value" style={{ color: "#2980b9" }}>{stats.donate || 0}</div>
              <div className="admin-stat-label">Donation Interest</div>
            </div>
            <div className="admin-stat-card" style={{ borderTop: "3px solid #8e44ad" }}>
              <div className="admin-stat-value" style={{ color: "#8e44ad" }}>{stats.education || 0}</div>
              <div className="admin-stat-label">Education Interest</div>
            </div>
          </div>
        )}
        
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Signup Form Submissions</div>
          </div>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
              <p>Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="admin-error-message">
              <p>{error}</p>
              <button 
                className="admin-button"
                onClick={fetchSubmissions}
                style={{ width: "auto", marginTop: "0.5rem", padding: "0.5rem 1rem" }}
              >
                Retry
              </button>
            </div>
          ) : submissions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#7f8c8d" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <p>No submissions found.</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
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
                      <td className="email-cell">
                        <a href={`mailto:${submission.email}`}>
                          {submission.email}
                        </a>
                      </td>
                      <td>
                        <div className={`admin-badge admin-badge-${submission.interest || 'other'}`}>
                          {getInterestType(submission.interest)}
                        </div>
                      </td>
                      <td 
                        className={`message-cell ${expandedMessages[submission._id] ? 'expanded' : ''}`}
                        onClick={() => toggleMessage(submission._id)}
                        style={{ cursor: 'pointer' }}
                        title={expandedMessages[submission._id] ? "Click to collapse" : "Click to expand"}
                      >
                        {submission.message || '-'}
                      </td>
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