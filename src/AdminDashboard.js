import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './Admin.css';
import './AdminStatus.css';
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
    other: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  
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
          other: 0,
          pending: 0,
          accepted: 0,
          rejected: 0
        };
        
        data.submissions.forEach(submission => {
          // Count by interest
          if (submission.interest in stats) {
            stats[submission.interest]++;
          } else {
            stats.other++;
          }
          
          // Count by status
          if (submission.status) {
            stats[submission.status]++;
          } else {
            stats.pending++;
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
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
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
  
  // Function to view submission details
  const viewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };
  
  // Function to update submission status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        navigate('/admin/login');
        return;
      }
      
      const response = await fetch(`${API_URL}/api/admin/submissions/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ status })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Update the submission in the local state
        setSubmissions(prevSubmissions => 
          prevSubmissions.map(sub => 
            sub._id === id ? { ...sub, status: status } : sub
          )
        );
        
        // Update the selected submission if it's currently being viewed
        if (selectedSubmission && selectedSubmission._id === id) {
          setSelectedSubmission({ ...selectedSubmission, status: status });
        }
        
        // Update the stats
        const oldStatus = submissions.find(s => s._id === id)?.status || 'pending';
        setStats(prevStats => ({
          ...prevStats,
          [oldStatus]: prevStats[oldStatus] > 0 ? prevStats[oldStatus] - 1 : 0,
          [status]: prevStats[status] + 1
        }));
        
        // Show success message
        alert(`Submission status updated to ${status}`);
      } else {
        setError(data.message || 'Failed to update submission status');
      }
    } catch (error) {
      console.error('Error updating submission status:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };
  
  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'accepted':
        return 'admin-badge-success';
      case 'rejected':
        return 'admin-badge-error';
      default:
        return 'admin-badge-pending';
    }
  };
  
  // Function to filter submissions by status
  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(sub => (sub.status || 'pending') === statusFilter);
    
  return (
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
          <>
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
            
            <div className="admin-status-stats">
              <div className="admin-status-stat-card pending">
                <div className="admin-status-stat-value">{stats.pending || 0}</div>
                <div className="admin-status-stat-label">Pending</div>
              </div>
              <div className="admin-status-stat-card accepted">
                <div className="admin-status-stat-value">{stats.accepted || 0}</div>
                <div className="admin-status-stat-label">Accepted</div>
              </div>
              <div className="admin-status-stat-card rejected">
                <div className="admin-status-stat-value">{stats.rejected || 0}</div>
                <div className="admin-status-stat-label">Rejected</div>
              </div>
            </div>
          </>
        )}
          <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Signup Form Submissions</div>
            <div className="admin-filter-controls">
              <label htmlFor="statusFilter" style={{ marginRight: '0.5rem' }}>Filter by status:</label>
              <select 
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '4px', 
                  border: '1px solid #ddd',
                  background: 'white' 
                }}
              >
                <option value="all">All Submissions</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
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
            </div>          ) : submissions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#7f8c8d" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <p>No submissions found.</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#7f8c8d" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
              <p>No {statusFilter} submissions found.</p>
              <button 
                className="admin-button"
                onClick={() => setStatusFilter('all')}
                style={{ width: "auto", marginTop: "1rem", padding: "0.5rem 1rem" }}
              >
                Show All Submissions
              </button>
            </div>
          ) : (
            <div className="admin-table-wrapper">              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Interest</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>                <tbody>
                  {filteredSubmissions.map((submission) => (
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
                      <td>
                        <div className={`admin-badge ${getStatusBadgeClass(submission.status)}`}>
                          {submission.status || 'pending'}
                        </div>
                      </td>
                      <td 
                        className={`message-cell ${expandedMessages[submission._id] ? 'expanded' : ''}`}
                        onClick={() => toggleMessage(submission._id)}
                        style={{ cursor: 'pointer' }}
                        title={expandedMessages[submission._id] ? "Click to collapse" : "Click to expand"}
                      >
                        {submission.message || '-'}
                      </td>                      <td>
                        <div className="admin-action-buttons">
                          <button 
                            className="admin-action-btn view"
                            onClick={() => viewSubmission(submission)}
                            title="View details"
                          >
                            👁️
                          </button>
                          {submission.status !== 'accepted' && (
                            <button 
                              className="admin-action-btn accept"
                              onClick={() => updateStatus(submission._id, 'accepted')}
                              title="Accept submission"
                            >
                              ✓
                            </button>
                          )}
                          {submission.status !== 'rejected' && (
                            <button 
                              className="admin-action-btn reject"
                              onClick={() => updateStatus(submission._id, 'rejected')}
                              title="Reject submission"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>          )}
        </div>
      </div>
      
      {/* Modal for viewing submission details */}
      {showModal && selectedSubmission && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-title">Submission Details</div>
              <button className="admin-modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="admin-detail-row">
                <div className="admin-detail-label">Date:</div>
                <div className="admin-detail-value">{formatDate(selectedSubmission.createdAt)}</div>
              </div>
              
              <div className="admin-detail-row">
                <div className="admin-detail-label">Name:</div>
                <div className="admin-detail-value">{selectedSubmission.name}</div>
              </div>
              
              <div className="admin-detail-row">
                <div className="admin-detail-label">Email:</div>
                <div className="admin-detail-value">
                  <a href={`mailto:${selectedSubmission.email}`}>{selectedSubmission.email}</a>
                </div>
              </div>
              
              <div className="admin-detail-row">
                <div className="admin-detail-label">Interest:</div>
                <div className="admin-detail-value">
                  <div className={`admin-badge admin-badge-${selectedSubmission.interest || 'other'}`}>
                    {getInterestType(selectedSubmission.interest)}
                  </div>
                </div>
              </div>
              
              <div className="admin-detail-row">
                <div className="admin-detail-label">Status:</div>
                <div className="admin-detail-value">
                  <div className={`admin-badge ${getStatusBadgeClass(selectedSubmission.status)}`}>
                    {selectedSubmission.status || 'pending'}
                  </div>
                </div>
              </div>
              
              <div className="admin-detail-row" style={{ borderBottom: 'none' }}>
                <div className="admin-detail-label">Message:</div>
                <div className="admin-detail-value">
                  {selectedSubmission.message ? (
                    <div className="admin-message-box">{selectedSubmission.message}</div>
                  ) : (
                    <em>No message provided</em>
                  )}
                </div>
              </div>
            </div>
              <div className="admin-modal-footer">              {selectedSubmission.status !== 'accepted' && (
                <button 
                  className="admin-action-btn accept"
                  onClick={() => updateStatus(selectedSubmission._id, 'accepted')}
                  title="Accept submission"
                >
                  ✓ Accept
                </button>
              )}
              
              {selectedSubmission.status !== 'rejected' && (
                <button 
                  className="admin-action-btn reject"
                  onClick={() => updateStatus(selectedSubmission._id, 'rejected')}
                  title="Reject submission"
                >
                  ✕ Reject
                </button>
              )}
                {(selectedSubmission.status === 'accepted' || selectedSubmission.status === 'rejected') && (
                <button 
                  className="admin-action-btn view"
                  onClick={() => updateStatus(selectedSubmission._id, 'pending')}
                  title="Reset to pending"
                >
                  ↺ Reset
                </button>
              )}
              
              <button 
                className="admin-button"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;