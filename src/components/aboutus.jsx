import './aboutus.css';
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      {/* Main Content Section */}
      <section className="main-content1">
        <div className="container text-center">
          <h2 className="title">Welcome to MoodMuse</h2>
          <p className="subtitle">
            A personalized music recommendation platform designed to match your mood with the perfect songs.
          </p>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <h3 className="feature-title">🎵 Mood-Based Recommendations</h3>
            <p className="feature-description">Get songs that match your current mood with personalized suggestions.</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">📂 Playlist Management</h3>
            <p className="feature-description">Create, manage, and share custom playlists easily.</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">🧠 Mood Tracking</h3>
            <p className="feature-description">AI-powered mood detection for better recommendations.</p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">🚀 Smart User Experience</h3>
            <p className="feature-description">Enjoy a seamless and engaging interface that adapts to your needs.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p className="footer-text">For inquiries, contact us at: <a href="mailto:moodbased@moodmuse.com">moodbased@moodmuse.com</a></p>
          <p className="footer-text">© 2025 MoodMuse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
