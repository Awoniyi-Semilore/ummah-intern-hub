import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';
import '../CSS/Dashboard.css';

const InternDashboard = () => {
  const { user, logout } = useAuth();
  const { tasks } = useTasks();
  
  // Filter States
  const [filterTeam, setFilterTeam] = useState('My Team'); 
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  // Logic for the new filters
  const filteredTasks = tasks.filter(task => {
    // 1. Team Filter Logic
    const matchesTeam = filterTeam === 'My Team' 
      ? task.team === user.team 
      : true; // 'All Tasks' shows everything

    // 2. Status Filter Logic
    const matchesStatus = filterStatus === 'All' 
      ? true 
      : task.status === filterStatus;

    return matchesTeam && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage, 
    currentPage * tasksPerPage
  );

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Welcome, {user.name}</h1>
          <p>Internship Track: <span className="tag">{user.team}</span></p>
        </div>
        <div className="header-actions">
          <Link to="/profile"><button className="btn btn-outline">Profile</button></Link>
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      </header>

      {/* Simplified Controls: No Search Bar */}
      <section className="controls">
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <select 
            className="filter-select" 
            value={filterTeam} 
            onChange={handleFilterChange(setFilterTeam)}
          >
            <option value="My Team">My Team Tasks</option>
            <option value="All Tasks">All Hub Tasks</option>
          </select>

          <select 
            className="filter-select" 
            value={filterStatus} 
            onChange={handleFilterChange(setFilterStatus)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </section>

      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Track</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map(task => (
                <tr key={task.id}>
                  <td style={{ fontWeight: '600' }}>{task.title}</td>
                  <td><span className="tag">{task.team}</span></td>
                  <td>
                    <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.deadline}</td>
                  <td>
                    <Link to={`/tasks/${task.id}`} className="btn btn-primary" style={{fontSize: '0.8rem', textDecoration: 'none'}}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  No tasks found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="btn btn-outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default InternDashboard;