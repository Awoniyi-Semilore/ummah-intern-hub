import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/Dashboard.css';

const Profile = () => {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  // Calculate Stats
  const teamTasks = tasks.filter(t => t.team === user.team);
  const completedCount = teamTasks.filter(t => t.status === 'Completed').length;
  const pendingCount = teamTasks.length - completedCount;
  const progressPercent = teamTasks.length > 0 
    ? Math.round((completedCount / teamTasks.length) * 100) 
    : 0;

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>My Profile</h1>
            <p style={{ color: '#64748b', margin: 0 }}>Internship Identity & Progress</p>
          </div>
        </div>

        <div className="user-details-grid">
          <div className="detail-item">
            <label>Full Name</label>
            <span>{user.name}</span>
          </div>
          <div className="detail-item">
            <label>Email Address</label>
            <span>{user.email}</span>
          </div>
          <div className="detail-item">
            <label>Assigned Track</label>
            <span className="tag" style={{ fontSize: '0.9rem' }}>{user.team}</span>
          </div>
          <div className="detail-item">
            <label>Portfolio</label>
            <a href={user.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>
              View Work ↗
            </a>
          </div>
        </div>

        <div className="stats-section" style={{ borderTop: '1px solid #eee', paddingTop: '30px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Internship Progress</h2>
          
          <div className="stats-grid">
            <div className="stat-box">
              <h3>{teamTasks.length}</h3>
              <p>Total Tasks</p>
            </div>
            <div className="stat-box">
              <h3 style={{ color: '#16a34a' }}>{completedCount}</h3>
              <p>Completed</p>
            </div>
            <div className="stat-box">
              <h3 style={{ color: '#f59e0b' }}>{pendingCount}</h3>
              <p>Pending</p>
            </div>
          </div>

          <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>
            COMPLETION RATE
          </label>
          <div className="progress-container">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            >
              {progressPercent}%
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
            {progressPercent === 100 ? "🎉 Congratulations! You've cleared your track!" : "Keep pushing to reach 100%!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;