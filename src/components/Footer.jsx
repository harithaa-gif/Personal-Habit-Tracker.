import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-brand-title">HabitFlow</span>
          <p className="footer-tagline">"Small habits. Better days."</p>
        </div>

        <nav className="footer-links" aria-label="Footer Navigation">
          <Link to="/" className="footer-link">Dashboard</Link>
          <Link to="/habits" className="footer-link">My Habits</Link>
          <Link to="/add-habit" className="footer-link">Add Habit</Link>
          <Link to="/progress" className="footer-link">Progress</Link>
        </nav>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; 2026 HabitFlow. Full Stack Web Development Project.
          </p>
          <p className="footer-author">
            Developed by Jai Ganesh R (RA2411003050171)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
