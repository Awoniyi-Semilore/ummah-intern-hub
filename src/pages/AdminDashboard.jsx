import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import '../CSS/Dashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { tasks, addTask, deleteTask } = useTasks();
  const [formData, setFormData] = useState({ title: '', description: '', team: 'frontend-dev', deadline: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...formData, status: 'Pending' });
    setFormData({ title: '', description: '', team: 'frontend-dev', deadline: '' });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Admin Panel</h1>
          <p>Task Management Hub</p>
        </div>
        <button onClick={logout} className="btn btn-danger">Logout</button>
      </header>

      <section className="admin-card">
        <h2 style={{marginTop: 0, marginBottom: '20px', fontSize: '1.2rem'}}>Create New Task</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input 
            className="search-input" type="text" placeholder="Task Title" required
            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            className="filter-select" type="date" required
            value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          />
          <select className="filter-select" value={formData.team} onChange={(e) => setFormData({...formData, team: e.target.value})}>
            <option value="frontend-dev">Frontend</option>
            <option value="video-editing">Video</option>
            <option value="graphic-design">Graphics</option>
            <option value="product-design">Product-Design</option>
            <option value="qa-testing">QA-Testing</option>
          </select>
          <textarea 
            placeholder="Detailed description of the task..."
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <button type="submit" className="btn btn-primary">Publish Task</button>
        </form>
      </section>

      <div className="table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Team</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td><span className="tag">{task.team}</span></td>
                <td><span className="status-badge status-pending">{task.status}</span></td>
                <td><button onClick={() => deleteTask(task.id)} className="btn btn-danger" style={{padding: '5px 10px'}}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;