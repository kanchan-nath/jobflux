import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobCard from '../../components/JobCard/JobCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import BlogCard from '../../components/BlogCard/BlogCard';
import FAQItem from '../../components/FAQ/FAQ';
import { jobs, categories, topCompanies, testimonials, blogPosts, stats, faqs } from '../../data';
import './Home.css';

const suggestions = ['UI/UX Designer', 'React Developer', 'Data Scientist', 'Product Manager', 'DevOps Engineer'];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${searchQuery}&loc=${searchLocation}`);
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-grid" />
          <div className="hero-bg-glow" />
          <div className="hero-bg-orb1" />
          <div className="hero-bg-orb2" />
        </div>
        <div className="hero-inner">
          <div className="hero-eyebrow">✦ 12,000+ Jobs Available Now</div>
          <h1 className="hero-title">
            Find Your <span>Dream Job</span><br />Today!
          </h1>
          <p className="hero-subtitle">
            Connect with top employers and discover opportunities that match your skills, passion, and ambitions.
          </p>

          <div className="hero-search">
            <form className="search-box" onSubmit={handleSearch}>
              <div className="search-field">
                <span className="search-field-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="search-divider" />
              <div className="search-field">
                <span className="search-field-icon">📍</span>
                <input
                  type="text"
                  placeholder="City, state or remote"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                />
              </div>
              <button type="submit" className="search-submit">Search Jobs</button>
            </form>

            <div className="hero-suggestions">
              <span>Popular:</span>
              {suggestions.map(s => (
                <span
                  key={s}
                  className="suggestion-chip"
                  onClick={() => { setSearchQuery(s); navigate('/jobs'); }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-companies">
            <span className="hero-companies-label">Trusted by</span>
            {['🎵 Spotify', '💬 Slack', '🎨 Adobe', '⚡ Linear', '▲ Vercel'].map(c => (
              <div key={c} className="company-chip">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RECENT JOBS ===== */}
      <section className="home-section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-label">🔥 Fresh Listings</div>
              <h2 className="section-title">Recent Jobs Available</h2>
              <p className="section-subtitle">Handpicked opportunities updated daily from top companies worldwide.</p>
            </div>
            <Link to="/jobs" className="view-all-link">View All Jobs →</Link>
          </div>
          <div className="jobs-grid">
            {jobs.slice(0, 6).map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="home-section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-label">✦ Simple Process</div>
              <h2 className="section-title">How It Works</h2>
            </div>
          </div>
          <div className="how-grid">
            {[
              { icon: '👤', title: 'Create Account', desc: 'Sign up in seconds with your email or social account. Complete your profile to stand out.' },
              { icon: '🔍', title: 'Search Jobs', desc: 'Use smart filters to find roles that match your skills, location, and salary expectations.' },
              { icon: '📄', title: 'Apply Online', desc: 'Submit your application with one click. Track status in your personalized dashboard.' },
              { icon: '🎉', title: 'Get Hired', desc: 'Receive offers, negotiate terms, and start your next chapter with confidence.' },
            ].map((step, i) => (
              <div key={i} className="how-card">
                <span className="how-step-num">0{i + 1}</span>
                <div className="how-icon">{step.icon}</div>
                <div className="how-title">{step.title}</div>
                <div className="how-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="home-section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-label">🗂 Explore</div>
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">Find roles in industries you love from a curated selection of top fields.</p>
            </div>
            <Link to="/jobs" className="view-all-link">All Categories →</Link>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="home-section-alt">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-text">
              <div className="cta-banner-label">✦ For Employers</div>
              <div className="cta-banner-title">Create A Better<br />Future For Yourself!</div>
              <div className="cta-banner-sub">Post a job today and reach 200,000+ qualified candidates.</div>
            </div>
            <div className="cta-banner-actions">
              <button className="btn-primary">Post a Job Now →</button>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOP COMPANIES ===== */}
      <section className="home-section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-label">🏆 Leading Brands</div>
              <h2 className="section-title">Top Companies Hiring</h2>
            </div>
            <Link to="/jobs" className="view-all-link">All Companies →</Link>
          </div>
          <div className="companies-grid">
            {topCompanies.map(c => (
              <div key={c.id} className="company-card">
                <div className="company-logo-box">{c.logo}</div>
                <div>
                  <div className="company-info-name">{c.name}</div>
                  <div className="company-info-sub">{c.industry}</div>
                </div>
                <div className="company-jobs-count">
                  <div className="num">{c.jobs}</div>
                  <div className="lbl">open roles</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="home-section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-label">💬 Social Proof</div>
              <h2 className="section-title">Testimonials from Our Customers</h2>
              <p className="section-subtitle">Real stories from professionals who found their dream roles through JobFlux.</p>
            </div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role} at {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="home-section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-label">📰 Insights</div>
              <h2 className="section-title">News and Blog</h2>
              <p className="section-subtitle">Stay ahead with the latest industry insights, career tips, and hiring trends.</p>
            </div>
            <a href="#" className="view-all-link">View All Posts →</a>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
