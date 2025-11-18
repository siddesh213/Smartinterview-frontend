import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="landing-logo">InterviewPrep</div>
        <div className="landing-nav-links">
          <button onClick={() => navigate('/login')} className="nav-link login-link">Login</button>
          <button onClick={() => navigate('/register')} className="nav-link register-link">Sign Up</button>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-section">
          <h1>Master Interview Preparation</h1>
          <p>Your complete platform for cracking technical interviews with DSA, System Design, and DBMS practice</p>
          <button onClick={() => navigate('/register')} className="cta-button">Get Started</button>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Daily Practice Plans</h3>
              <p>Personalized interview preparation based on your timeline and interview date</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>DSA Mastery</h3>
              <p>Comprehensive data structures and algorithms problems with detailed solutions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏗️</div>
              <h3>System Design</h3>
              <p>Learn scalability, architecture, and real-world system design patterns</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h3>DBMS Fundamentals</h3>
              <p>Master database concepts, SQL, optimization, and transaction management</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your learning progress with detailed analytics and completion rates</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Interview-Focused</h3>
              <p>Content designed specifically for students and professionals preparing for tech roles</p>
            </div>
          </div>
        </section>

        <section className="why-section">
          <h2>Why Choose InterviewPrep?</h2>
          <div className="why-content">
            <p>We've built this platform to help students and working professionals prepare effectively for technical interviews.</p>
            <ul>
              <li>✓ Structured learning paths based on interview dates</li>
              <li>✓ Real interview questions and patterns</li>
              <li>✓ Progress tracking to stay motivated</li>
              <li>✓ Comprehensive coverage of all major topics</li>
              <li>✓ Community-driven content and updates</li>
            </ul>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to ace your interview?</h2>
          <button onClick={() => navigate('/register')} className="cta-button-large">Start Learning Today</button>
          <p className="login-prompt">Already have an account? <button onClick={() => navigate('/login')} className="text-link">Login here</button></p>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 InterviewPrep. Empowering tech professionals worldwide.</p>
      </footer>
    </div>
  );
};

export default Landing;