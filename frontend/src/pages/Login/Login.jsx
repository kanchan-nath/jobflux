import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="auth-page">
      {/* ===== FORM SIDE ===== */}
      <div className="auth-form-side">
        <Link to="/" className="auth-back-link">← Back to Home</Link>

        <div className="auth-form-inner">
          <Link to="/" className="auth-logo">
            <div className="auth-logo-icon">💼</div>
            Job<span>Flux</span>
          </Link>

          <h1 className="auth-heading">Welcome back!</h1>
          <p className="auth-subheading">
            Sign in to your account to continue your job search journey.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-field">
              <label className="form-label">Email Address <span>*</span></label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  className={`form-input${errors.email ? ' error' : ''}`}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="field-error">⚠ {errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-field">
              <label className="form-label">Password <span>*</span></label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  className={`form-input has-toggle${errors.password ? ' error' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(s => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <span className="field-error">⚠ {errors.password}</span>}
            </div>

            {/* Remember + Forgot */}
            <div className="login-options">
              <label className="remember-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(r => !r)}
                />
                <span className="remember-check-label">Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`auth-submit${loading ? ' loading' : ''}`}
              disabled={loading}
            >
              {loading ? <><span className="spin">⟳</span> Signing In...</> : 'Sign In →'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Create one free</Link>
          </p>
        </div>
      </div>

      {/* ===== VISUAL SIDE ===== */}
      <div className="auth-visual-side">
        <div className="auth-visual-grid" />
        <div className="auth-visual-glow" />
        <div className="auth-visual-inner">
          <div className="auth-visual-emoji">💼</div>

          <div>
            <div className="auth-visual-title">
              Your Next <span>Big Opportunity</span><br />Awaits You
            </div>
          </div>

          <p className="auth-visual-desc">
            Join thousands of professionals who found their dream roles through JobFlux every single day.
          </p>

          <div className="auth-visual-stats">
            <div className="auth-vis-stat">
              <div className="auth-vis-stat-val">12k+</div>
              <div className="auth-vis-stat-label">Live Jobs</div>
            </div>
            <div className="auth-vis-stat">
              <div className="auth-vis-stat-val">200k+</div>
              <div className="auth-vis-stat-label">Professionals</div>
            </div>
            <div className="auth-vis-stat">
              <div className="auth-vis-stat-val">98%</div>
              <div className="auth-vis-stat-label">Satisfaction</div>
            </div>
          </div>

          <div className="auth-visual-features">
            {[
              'Access 12,000+ verified job listings',
              'Get matched with roles that fit you',
              'Track all your applications in one place',
              'Connect directly with top employers',
            ].map((f, i) => (
              <div key={i} className="auth-visual-feat">
                <span className="feat-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
