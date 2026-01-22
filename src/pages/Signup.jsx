import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TEAMS } from '../utils/mockData';
import '../CSS/Auth.css';
import bgVideo from '../assets/4427479-hd_1080_1920_30fps.mp4';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth(); 
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    role: 'intern', team: 'frontend-dev', internCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const normalizedInput = formData.internCode.trim().toUpperCase().replace(/\s+/g, ' ');
    const validCodes = ["UMMAHSQUARE INTERNSHIP HUB", "UMMAH SQUARE INTERNSHIP HUB"];

    if (!validCodes.includes(normalizedInput)) {
      setError('Invalid Internship Verification Code.');
      return;
    }

    const result = signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        team: formData.role === 'admin' ? 'Management' : formData.team
    });
    
    if (result.success) {
      alert('Account created successfully!');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      {/* Video Background Layer */}
      <video autoPlay loop muted playsInline className="auth-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <p>Join the UmmahSquare Internship Hub.</p>
          
          {error && <p className="error-text">{error}</p>}
          
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Select Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="intern">Intern</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {formData.role === 'intern' && (
            <div className="form-group">
              <label>Select Your Track</label>
              <select name="team" value={formData.team} onChange={handleChange}>
                {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>
          )}
          
          <div className="form-group">
            <label>Internship Hub Name</label>
            <input 
              name="internCode" 
              type="text" 
              placeholder="Full Hub Name"
              value={formData.internCode} 
              onChange={handleChange} 
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">Sign Up</button>
          
          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;