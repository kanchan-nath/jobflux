import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">💼</div>
            <div className="logo-text">Job<span>Flux</span></div>
          </div>
          <p className="footer-desc">
            Connecting ambitious professionals with the world's most exciting companies. 
            Your next opportunity is just one click away.
          </p>
          <div className="footer-socials">
            <button className="social-btn">𝕏</button>
            <button className="social-btn">in</button>
            <button className="social-btn">f</button>
            <button className="social-btn">▶</button>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Press</Link>
            <Link to="/">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Job Categories</h4>
          <div className="footer-links">
            <Link to="/jobs">Technology</Link>
            <Link to="/jobs">Design</Link>
            <Link to="/jobs">Finance</Link>
            <Link to="/jobs">Marketing</Link>
            <Link to="/jobs">Healthcare</Link>
            <Link to="/jobs">Education</Link>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get the latest jobs and industry news directly in your inbox.</p>
          <div className="newsletter-form">
            <input
              className="newsletter-input"
              type="email"
              placeholder="your@email.com"
            />
            <button className="newsletter-btn">Subscribe →</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2025 JobFlux. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
