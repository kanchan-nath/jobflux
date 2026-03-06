import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>📬 Get In Touch</div>
          <h1 className="contact-hero-title">
            We're Here to <span>Help You</span><br />Succeed
          </h1>
          <p className="contact-hero-sub">
            Have a question, partnership inquiry, or just want to say hello?
            Our team responds within 24 hours — usually much sooner.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <div className="contact-cards">
        <div className="contact-cards-inner">
          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <div>
              <div className="contact-info-title">Our Office</div>
              <div className="contact-info-value">123 Tech Avenue, Suite 400</div>
              <div className="contact-info-sub">San Francisco, CA 94107</div>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <div>
              <div className="contact-info-title">Phone</div>
              <div className="contact-info-value">+1 (415) 555-0192</div>
              <div className="contact-info-sub">Mon – Fri, 9am – 6pm PST</div>
            </div>
          </div>
          <div className="contact-info-card">
            <div className="contact-info-icon">✉️</div>
            <div>
              <div className="contact-info-title">Email</div>
              <div className="contact-info-value">hello@jobflux.io</div>
              <div className="contact-info-sub">We reply within 24 hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form + Map */}
      <div className="contact-main">
        <div className="contact-main-inner">
          {/* Form */}
          <div className="contact-form-card">
            <div className="form-title">Send Us a Message</div>
            <p className="form-subtitle">Fill out the form and we'll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Full Name <span>*</span></label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Email Address <span>*</span></label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Subject <span>*</span></label>
                  <select
                    className="form-select"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option>Job Seeker Support</option>
                    <option>Employer Inquiry</option>
                    <option>Partnership</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-field full">
                  <label className="form-label">Message <span>*</span></label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={`form-submit${sent ? ' sent' : ''}`}>
                {sent ? '✓ Message Sent!' : 'Send Message →'}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="contact-map-col">
            <div className="map-card">
              <div className="map-placeholder">
                <div className="map-pin">
                  <span className="map-pin-inner">📍</span>
                </div>
                <div className="map-address">123 Tech Ave, San Francisco, CA</div>
              </div>
            </div>

            {/* Hours */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                🕐 Office Hours
              </div>
              {[
                { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM PST' },
                { day: 'Saturday', hours: '10:00 AM – 3:00 PM PST' },
                { day: 'Sunday', hours: 'Closed' },
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{h.day}</span>
                  <span style={{ color: h.hours === 'Closed' ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: '500' }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By */}
      <section className="contact-trusted">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>🤝 Trusted By</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Companies That Trust Us</h2>
          <div className="trusted-logos">
            {['🎵 Spotify', '💬 Slack', '🎨 Adobe', '⚡ Linear', '▲ Vercel', '💳 Stripe'].map(c => (
              <div key={c} className="trusted-logo">{c}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
