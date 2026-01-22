import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/LandingPage.css';
import bgVideo from '../assets/4427479-hd_1080_1920_30fps.mp4';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      {/* Video Background */}
      <div className="video-overlay"></div>
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="hero-content">
        <h1 className="logo-text">UMMAHSQUARE</h1>
        <h2 className="main-title">Shape Your Future at the Internship Hub</h2>
        <p className="subtitle">A professional platform for aspiring developers, designers, and creators.</p>
        
        <div className="cta-group">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/login" className="btn-outline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;