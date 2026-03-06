import { Link } from 'react-router-dom';
import FAQItem from '../../components/FAQ/FAQ';
import BlogCard from '../../components/BlogCard/BlogCard';
import { faqs, blogPosts, stats } from '../../data';
import './About.css';

const team = [
  { name: 'Jordan Blake', role: 'CEO & Co-Founder', avatar: '👨‍💼' },
  { name: 'Mia Chen', role: 'Head of Design', avatar: '👩‍🎨' },
  { name: 'Alex Torres', role: 'Lead Engineer', avatar: '👨‍💻' },
  { name: 'Sara Patel', role: 'Head of Growth', avatar: '👩‍🚀' },
];

const bestItems = [
  'Flexible Jobs',
  'Responsibility',
  'Top Producers',
  'Top Mentality',
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <div className="about-hero-grid" />
          <div className="about-hero-glow" />
        </div>
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <div className="section-label">✦ About JobFlux</div>
            <h1 className="about-hero-title">
              You Will Grow, You Will<br />Succeed. <span>We Promise That</span>
            </h1>
            <p className="about-hero-desc">
              JobFlux was built with one mission: to make meaningful career connections effortless. 
              We connect talented professionals with companies that value their skills and ambitions.
              Since 2020, we've helped over 200,000 professionals find their next great opportunity.
            </p>
            <div className="about-hero-actions">
              <Link to="/jobs" className="btn-primary">Browse Jobs →</Link>
              <Link to="/contact" className="btn-secondary">Get in Touch</Link>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-visual-inner">🏢</div>
            <div className="about-visual-badge">
              <span className="avb-icon">🏆</span>
              <div>
                <div className="avb-val">200k+</div>
                <div className="avb-label">Professionals hired</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2rem' }}>
        <div className="stats-bar-inner" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', color: 'var(--accent)', letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission / Values */}
      <section className="about-mission">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '0' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>✦ Our Values</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose JobFlux?</h2>
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '0.75rem auto 0' }}>Everything we do is guided by a commitment to connecting people with opportunity.</p>
          </div>
          <div className="mission-grid">
            {[
              { icon: '🎯', title: 'Precision Matching', desc: 'Our AI-powered algorithm matches candidates with roles based on skills, culture fit, and career goals — not just keywords.' },
              { icon: '🤝', title: 'Trusted Network', desc: 'Every company on our platform is verified and reviewed. You will only find legitimate, quality opportunities here.' },
              { icon: '🚀', title: 'Career Growth', desc: 'We dont just help you get a job — we help you build a career with resources, coaching, and community support.' },
            ].map((m, i) => (
              <div key={i} className="mission-card">
                <span className="mission-icon">{m.icon}</span>
                <div className="mission-title">{m.title}</div>
                <p className="mission-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video / CTA */}
      <div className="video-cta">
        <div className="video-cta-inner">
          <button className="play-btn">▶</button>
          <h2 className="video-cta-title">Good Life Begins With<br />A Good Company</h2>
          <p className="video-cta-sub">Join over 200,000 professionals who found their dream role through JobFlux.</p>
          <div className="video-cta-chips">
            {['✓ Flexible Job', '✓ Responsibility', '✓ Top Producers', '✓ Top Mentality'].map((c, i) => (
              <span key={i} className="video-chip">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="section-label">👥 Our People</div>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle">Passionate individuals united by a shared mission to reshape how the world works.</p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <div className="team-body">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-socials">
                    {['𝕏', 'in', 'f'].map((s, j) => (
                      <button key={j} className="team-social-btn">{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>❓ FAQ</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '0.75rem auto 0' }}>Everything you need to know about how JobFlux works.</p>
          </div>
          <div className="faq-list">
            {faqs.map(faq => <FAQItem key={faq.id} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* Only Working With Best */}
      <section className="about-best">
        <div className="about-best-inner">
          <div className="best-images">
            <div className="best-img">🌟</div>
            <div className="best-img">💼</div>
            <div className="best-img">🤝</div>
          </div>
          <div className="best-content">
            <div className="section-label">✦ Our Standard</div>
            <h2 className="section-title">We're Only Working<br />With The Best</h2>
            <p className="section-subtitle">We partner only with companies that maintain exceptional workplace standards and genuine care for their employees.</p>
            <div className="best-list">
              {bestItems.map((item, i) => (
                <div key={i} className="best-item">
                  <span className="best-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/jobs" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>Find Your Role →</Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: '5rem 2rem' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-label">📰 Latest</div>
              <h2 className="section-title">News and Blog</h2>
            </div>
            <a href="#" className="view-all-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: '600', fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>View All →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '2.5rem' }}>
            {blogPosts.slice(0, 2).map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
