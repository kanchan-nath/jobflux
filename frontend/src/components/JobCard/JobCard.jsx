import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobCard.css';

export default function JobCard({ job, compact = false }) {
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/jobs/${job.id}`);
  };

  if (compact) {
    return (
      <div className={`job-card compact${job.featured ? ' featured' : ''}`} onClick={handleClick}>
        <div className="company-logo">{job.companyLogo}</div>
        <div className="job-card-body">
          <div className="job-title">{job.title}</div>
          <div className="job-meta">
            <span className="meta-item"><span className="icon">🏢</span>{job.company}</span>
            <span className="meta-item"><span className="icon">📍</span>{job.location}</span>
            <span className="meta-item"><span className="icon">⏱</span>{job.postedDate}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <span className="badge badge-green">{job.type}</span>
          <button className="apply-btn" onClick={handleApply}>Apply</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`job-card${job.featured ? ' featured' : ''}`} onClick={handleClick}>
      <div className="job-card-top">
        <div className="company-logo">{job.companyLogo}</div>
        <div className="job-card-badges">
          {job.featured && <span className="badge badge-orange">⭐ Featured</span>}
          <span className="badge badge-green">{job.type}</span>
        </div>
        <button
          className={`bookmark-btn${bookmarked ? ' bookmarked' : ''}`}
          onClick={handleBookmark}
          title="Save job"
        >
          {bookmarked ? '🔖' : '📌'}
        </button>
      </div>

      <div>
        <div className="job-title">{job.title}</div>
        <div className="job-company">{job.company} · {job.category}</div>
      </div>

      <div className="job-meta">
        <span className="meta-item"><span className="icon">📍</span>{job.location}</span>
        <span className="meta-item"><span className="icon">💼</span>{job.experience}</span>
        <span className="meta-item"><span className="icon">📅</span>{job.postedDate}</span>
      </div>

      <div className="job-tags">
        {job.tags.map(tag => (
          <span key={tag} className="job-tag">{tag}</span>
        ))}
      </div>

      <div className="job-card-footer">
        <div>
          <div className="job-salary">{job.salary}</div>
          <div className="job-date">Deadline: {job.deadline}</div>
        </div>
        <button className="apply-btn" onClick={handleApply}>Apply Now →</button>
      </div>
    </div>
  );
}
