import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';
import './Signup.css';

// Password strength calculator
function getStrength(pwd) {
  if (!pwd) return { score: 0, label: '', key: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = ['', 'weak', 'fair', 'good', 'strong'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score], key: map[score] };
}

// Step indicator
function Steps({ current }) {
  const steps = ['Account', 'Verify', 'Profile'];
  return (
    <div className="auth-steps">
      {steps.map((s, i) => (
        <>
          <div key={s} className={`auth-step${current === i ? ' active' : ''}${current > i ? ' done' : ''}`}>
            <div className="step-circle">{current > i ? '✓' : i + 1}</div>
            <span className="step-label">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div key={`conn-${i}`} className={`step-connector${current > i ? ' done' : ''}`} />
          )}
        </>
      ))}
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=account, 1=otp, 2=profile
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'seeker',
  });

  const strength = getStrength(form.password);

  // OTP countdown timer
  useEffect(() => {
    if (step !== 1) return;
    setTimer(60);
    const id = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(id);
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  // ===== STEP 0 VALIDATION =====
  const validateStep0 = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Minimum 8 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!agreed) errs.terms = 'You must agree to the terms';
    return errs;
  };

  const handleStep0 = async (e) => {
    e.preventDefault()
    const errs = validateStep0()
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/signup/email-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({       // ← send the data
          email: form.email,
          password: form.password
        })
      })

      const data = await response.json()  // ← read the response
      console.log(data)                   // ← check what backend returns

      if (response.ok) {
        // ✅ save session_id for next steps
        setSessionId(data.session_id)
        setStep(1)                        // ← only move if success
      } else {
        setErrors({ general: data.message })  // show backend error
      }

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }
  // ===== OTP HANDLERS =====
  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    setOtpError(false);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) otpRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    paste.split('').forEach((c, i) => { newOtp[i] = c; });
    setOtp(newOtp);
    otpRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setOtpError(true); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    // Accept any 6-digit code for demo
    setStep(2);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setOtpError(false);
    setTimer(60);
    otpRefs.current[0]?.focus();
  };

  // ===== STEP 2 VALIDATION =====
  const validateStep2 = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (form.phone && !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    return errs;
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
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

          <Steps current={step} />

          {/* ===== STEP 0 — Account ===== */}
          {step === 0 && (
            <>
              <h1 className="auth-heading">Create your account</h1>
              <p className="auth-subheading">Start your journey to your dream job — it's free.</p>

              <form className="auth-form" onSubmit={handleStep0} noValidate>
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
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(s => !s)} tabIndex={-1}>
                      {showPassword ? '🙈' : '👁'}
                    </button>
                  </div>
                  {form.password && (
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map(n => (
                          <div
                            key={n}
                            className={`strength-bar${strength.score >= n ? ` filled-${strength.key}` : ''}`}
                          />
                        ))}
                      </div>
                      <span className={`strength-label ${strength.key}`}>{strength.label}</span>
                    </div>
                  )}
                  {errors.password && <span className="field-error">⚠ {errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="form-field">
                  <label className="form-label">Confirm Password <span>*</span></label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input
                      className={`form-input has-toggle${errors.confirmPassword ? ' error' : ''}`}
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowConfirm(s => !s)} tabIndex={-1}>
                      {showConfirm ? '🙈' : '👁'}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="field-error">⚠ {errors.confirmPassword}</span>}
                </div>

                {/* Terms */}
                <div className="form-field">
                  <label className="terms-check">
                    <input type="checkbox" checked={agreed} onChange={() => { setAgreed(a => !a); setErrors(e => ({ ...e, terms: '' })); }} />
                    <span className="terms-text">
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.terms && <span className="field-error">⚠ {errors.terms}</span>}
                </div>

                <button type="submit" className={`auth-submit${loading ? ' loading' : ''}`} disabled={loading}>
                  {loading ? <><span className="spin">⟳</span> Sending OTP...</> : 'Continue →'}
                </button>
              </form>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </>
          )}

          {/* ===== STEP 1 — OTP ===== */}
          {step === 1 && (
            <>
              <h1 className="auth-heading">Verify your email</h1>
              <p className="auth-subheading">We've sent a 6-digit code to your inbox.</p>

              <form className="auth-form" onSubmit={handleVerifyOtp} noValidate>
                <div className="otp-step">
                  <div className="otp-info">
                    <span className="otp-info-icon">📨</span>
                    <div className="otp-info-text">
                      Code sent to <span className="otp-info-email">{form.email}</span>. Check your inbox and spam folder.
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label" style={{ textAlign: 'center' }}>Enter 6-digit OTP <span>*</span></label>
                    <div className="otp-inputs" onPaste={handleOtpPaste}>
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => otpRefs.current[idx] = el}
                          className={`otp-input${digit ? ' filled' : ''}${otpError ? ' error' : ''}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(e, idx)}
                          onKeyDown={e => handleOtpKeyDown(e, idx)}
                          autoFocus={idx === 0}
                        />
                      ))}
                    </div>
                    {otpError && <span className="field-error" style={{ justifyContent: 'center' }}>⚠ Please enter all 6 digits</span>}
                  </div>

                  <div className="otp-resend">
                    {timer > 0 ? (
                      <span>Resend code in <span className="otp-timer">{timer}s</span></span>
                    ) : (
                      <>Didn't receive it?{' '}
                        <button type="button" className="otp-resend-btn" onClick={handleResend}>
                          Resend OTP
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <button type="submit" className={`auth-submit${loading ? ' loading' : ''}`} disabled={loading}>
                  {loading ? <><span className="spin">⟳</span> Verifying...</> : 'Verify & Continue →'}
                </button>

                <button type="button" className="back-step-btn" onClick={() => setStep(0)}>
                  ← Change email address
                </button>
              </form>
            </>
          )}

          {/* ===== STEP 2 — Profile ===== */}
          {step === 2 && (
            <>
              <h1 className="auth-heading">Complete your profile</h1>
              <p className="auth-subheading">Tell us a bit about yourself to get started.</p>

              <form className="auth-form" onSubmit={handleStep2} noValidate>
                {/* Name row */}
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">First Name <span>*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">👤</span>
                      <input
                        className={`form-input${errors.firstName ? ' error' : ''}`}
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={form.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                      />
                    </div>
                    {errors.firstName && <span className="field-error">⚠ {errors.firstName}</span>}
                  </div>
                  <div className="form-field">
                    <label className="form-label">Last Name <span>*</span></label>
                    <div className="input-wrap">
                      <span className="input-icon">👤</span>
                      <input
                        className={`form-input${errors.lastName ? ' error' : ''}`}
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                      />
                    </div>
                    {errors.lastName && <span className="field-error">⚠ {errors.lastName}</span>}
                  </div>
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <div className="input-wrap">
                    <span className="input-icon">📞</span>
                    <input
                      className={`form-input${errors.phone ? ' error' : ''}`}
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && <span className="field-error">⚠ {errors.phone}</span>}
                </div>

                {/* Role */}
                <div className="form-field">
                  <label className="form-label">I am a <span>*</span></label>
                  <div className="role-selector">
                    <div className="role-option">
                      <input
                        type="radio"
                        id="role-seeker"
                        name="role"
                        value="seeker"
                        checked={form.role === 'seeker'}
                        onChange={handleChange}
                      />
                      <label className="role-label" htmlFor="role-seeker">
                        <span className="role-icon">🧑‍💼</span>
                        <span className="role-name">Job Seeker</span>
                        <span className="role-desc">Looking for opportunities</span>
                      </label>
                    </div>
                    <div className="role-option">
                      <input
                        type="radio"
                        id="role-employer"
                        name="role"
                        value="employer"
                        checked={form.role === 'employer'}
                        onChange={handleChange}
                      />
                      <label className="role-label" htmlFor="role-employer">
                        <span className="role-icon">🏢</span>
                        <span className="role-name">Employer</span>
                        <span className="role-desc">Hiring talented people</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className={`auth-submit${loading ? ' loading' : ''}`} disabled={loading}>
                  {loading ? <><span className="spin">⟳</span> Creating Account...</> : '🎉 Create My Account'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ===== VISUAL SIDE ===== */}
      <div className="auth-visual-side">
        <div className="auth-visual-grid" />
        <div className="auth-visual-glow" />
        <div className="auth-visual-inner">
          <div className="auth-visual-emoji">🚀</div>

          <div>
            <div className="auth-visual-title">
              Launch Your <span>Career</span><br />in Minutes
            </div>
          </div>

          <p className="auth-visual-desc">
            Create your free account and get instant access to thousands of verified opportunities from world-class companies.
          </p>

          <div className="auth-visual-stats">
            <div className="auth-vis-stat">
              <div className="auth-vis-stat-val">Free</div>
              <div className="auth-vis-stat-label">Always free for job seekers</div>
            </div>
            <div className="auth-vis-stat">
              <div className="auth-vis-stat-val">2min</div>
              <div className="auth-vis-stat-label">Setup time</div>
            </div>
            <div className="auth-vis-stat">
              <div className="auth-vis-stat-val">12k+</div>
              <div className="auth-vis-stat-label">Live jobs now</div>
            </div>
          </div>

          <div className="auth-visual-features">
            {[
              'Instant access to 12,000+ job listings',
              'One-click apply to your top matches',
              'Real-time application status tracking',
              'Personalized job recommendations daily',
              'Direct messaging with recruiters',
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
