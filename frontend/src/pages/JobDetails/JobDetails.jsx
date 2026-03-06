import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import JobCard from '../../components/JobCard/JobCard';
import { jobs } from '../../data';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const job = jobs.find(j => j.id === Number(id));

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="not-found-wrap">
          <div style={{ fontSize: '3rem' }}>😕</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>Job Not Found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>This listing may have expired or been removed.</p>
          <Link to="/jobs" className="btn-primary" style={{ marginTop: '0.5rem' }}>Browse All Jobs</Link>
        </div>
      </div>
    );
  }

  const related = jobs.filter(j => j.category === job.category && j.id !== job.id).slice(0, 3);

  return (
    <div>
      <div className="job-details-page">
        {/* Breadcrumb */}
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto 1.5rem', display: 'flex', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', transition: 'var(--transition)' }}>Home</Link>
          <span>›</span>
          <Link to="/jobs" style={{ color: 'var(--text-secondary)' }}>Jobs</Link>
          <span>›</span>
          <span>{job.title}</span>
        </div>

        <div className="job-details-inner">
          {/* Main */}
          <div className="job-details-main">
            {/* Job Header */}
            <div className="job-header-card">
              <div className="job-header-top">
                <div className="job-header-logo">{job.companyLogo}</div>
                <div className="job-header-info">
                  <h1 className="job-header-title">{job.title}</h1>
                  <div className="job-header-company">
                    <strong>{job.company}</strong>
                    <span>·</span>
                    <span>{job.category}</span>
                    {job.featured && <span className="badge badge-orange">⭐ Featured</span>}
                  </div>
                </div>
                <div className="job-header-actions">
                  <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.375rem' }}>Apply Now →</button>
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '0.875rem', padding: '0.625rem 1.125rem' }}
                    onClick={() => setSaved(!saved)}
                  >
                    {saved ? '🔖 Saved' : '📌 Save'}
                  </button>
                </div>
              </div>

              <div className="job-header-meta">
                <span className="meta-pill"><span className="icon">📍</span>{job.location}</span>
                <span className="meta-pill"><span className="icon">💼</span>{job.type}</span>
                <span className="meta-pill"><span className="icon">⏱</span>{job.experience}</span>
                <span className="meta-pill"><span className="icon">💰</span>{job.salary}</span>
                <span className="meta-pill"><span className="icon">📅</span>Posted {job.postedDate}</span>
                <span className="meta-pill"><span className="icon">⏰</span>Deadline: {job.deadline}</span>
              </div>
            </div>

            {/* Description */}
            <div className="content-block">
              <div className="content-block-title">Job Description</div>
              <p className="job-description-text">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="content-block">
              <div className="content-block-title">Top Responsibilities</div>
              <div className="responsibilities-list">
                {job.responsibilities.map((r, i) => (
                  <div key={i} className="responsibility-item">
                    <span className="responsibility-dot">✓</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="content-block">
              <div className="content-block-title">Professional Skills</div>
              <div className="skills-grid">
                {job.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="content-block">
              <div className="content-block-title">Benefits & Perks</div>
              <div className="benefits-grid">
                {job.benefits.map((b, i) => (
                  <span key={i} className="benefit-item">✦ {b}</span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="content-block" style={{ padding: '1.25rem 2rem' }}>
              <div className="share-row">
                <span className="share-label">Share this job:</span>
                <div className="share-btns">
                  {['𝕏', 'in', 'f', '🔗'].map((s, i) => (
                    <button key={i} className="share-btn">{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="job-details-sidebar">
            {/* Apply Card */}
            <div className="apply-card">
              <div className="apply-card-title">Job Salary</div>
              <div>
                <div className="apply-salary">{job.salary}</div>
                <div className="apply-salary-period">per year · negotiable</div>
              </div>
              <div className="apply-deadline">
                <span>⏰</span>
                <span>Application deadline: <strong>{job.deadline}</strong></span>
              </div>
              <button className="apply-btn-full">Apply For This Job →</button>
              <button className="save-btn-full" onClick={() => setSaved(!saved)}>
                {saved ? '🔖 Saved to Profile' : '📌 Save Job'}
              </button>
            </div>

            {/* Company Overview */}
            <div className="company-overview-card">
              <div className="content-block-title" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>Company Overview</div>
              <div className="company-ov-header">
                <div className="company-ov-logo">{job.companyLogo}</div>
                <div>
                  <div className="company-ov-name">{job.company}</div>
                  <div className="company-ov-industry">{job.category}</div>
                </div>
              </div>
              <div className="company-ov-stats">
                <div className="ov-stat">
                  <div className="ov-stat-val">500+</div>
                  <div className="ov-stat-label">Employees</div>
                </div>
                <div className="ov-stat">
                  <div className="ov-stat-val">2012</div>
                  <div className="ov-stat-label">Founded</div>
                </div>
                <div className="ov-stat">
                  <div className="ov-stat-val">12</div>
                  <div className="ov-stat-label">Open Roles</div>
                </div>
                <div className="ov-stat">
                  <div className="ov-stat-val">4.8★</div>
                  <div className="ov-stat-label">Rating</div>
                </div>
              </div>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.825rem', padding: '0.5rem' }}>
                View Company Profile
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Jobs */}
      {related.length > 0 && (
        <section className="related-section">
          <div className="related-inner">
            <div className="section-label">💡 Similar Roles</div>
            <h2 className="section-title">Related Jobs</h2>
            <div className="related-grid">
              {related.map(j => <JobCard key={j.id} job={j} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
