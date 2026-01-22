import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../CSS/Auth.css'; 
import bgVideo from '../assets/4427479-hd_1080_1920_30fps.mp4';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
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
          <h1>Login</h1>
          <p>Welcome back! Please enter your details.</p>
          
          {error && <p className="error-text">{error}</p>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="intern@test.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>
          
          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;