import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Find Jobs', path: '/jobs' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">💼</div>
            <div className="logo-text">Job<span>Flux</span></div>
          </Link>

          <div className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <button className="btn-login">Log In</button>
            <button className="btn-post-job">Post a Job</button>
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <div className="mobile-menu-actions">
          <Link to="/login" >
          
          <button className="btn-login">Log In</button>
          </Link>
          <Link to="/signup" >

            <button className="btn-login">Sign Up</button>
          </Link>
          <button className="btn-post-job">Post a Job</button>
        </div>
      </div>
    </>
  );
}
