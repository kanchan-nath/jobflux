import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../../components/JobCard/JobCard';
import { jobs, jobTypes, experienceLevels, jobCategories } from '../../data';
import './Jobs.css';

export default function Jobs() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const toggleFilter = (arr, setArr, val) => {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedCats([]);
    setSelectedExp([]);
    setSearch('');
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...jobs];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
      );
    }
    if (selectedTypes.length) result = result.filter(j => selectedTypes.includes(j.type));
    if (selectedCats.length) result = result.filter(j => selectedCats.includes(j.category));
    if (selectedExp.length) result = result.filter(j => selectedExp.includes(j.experience));

    if (sortBy === 'newest') result.sort((a, b) => a.id - b.id);
    else if (sortBy === 'salary') result.sort((a, b) => b.salary.localeCompare(a.salary));
    else if (sortBy === 'featured') result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return result;
  }, [search, selectedTypes, selectedCats, selectedExp, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const activeFilterCount = selectedTypes.length + selectedCats.length + selectedExp.length;

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Find Jobs</span>
          </div>
          <h1 className="page-hero-title">Browse All Jobs</h1>
          <p className="page-hero-sub">Explore {jobs.length}+ opportunities from leading companies worldwide</p>
        </div>
      </div>

      <div className="jobs-page">
        <div className="jobs-page-inner">
          {/* Sidebar */}
          <aside className={`jobs-sidebar${sidebarOpen ? ' mobile-open' : ''}`}>
            <div className="filter-header">
              <span className="filter-title">🎛 Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              {activeFilterCount > 0 && (
                <button className="filter-clear" onClick={clearFilters}>Clear All</button>
              )}
            </div>

            <div className="filter-group">
              <div className="filter-group-title">Job Type</div>
              <div className="filter-options">
                {jobTypes.map(type => (
                  <label key={type} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                    />
                    <span className="filter-option-label">{type}</span>
                    <span className="filter-option-count">
                      {jobs.filter(j => j.type === type).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-divider" />

            <div className="filter-group">
              <div className="filter-group-title">Category</div>
              <div className="filter-options">
                {jobCategories.slice(0, 5).map(cat => (
                  <label key={cat} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCats.includes(cat)}
                      onChange={() => toggleFilter(selectedCats, setSelectedCats, cat)}
                    />
                    <span className="filter-option-label">{cat}</span>
                    <span className="filter-option-count">
                      {jobs.filter(j => j.category === cat).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-divider" />

            <div className="filter-group">
              <div className="filter-group-title">Experience</div>
              <div className="filter-options">
                {experienceLevels.slice(0, 5).map(exp => (
                  <label key={exp} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedExp.includes(exp)}
                      onChange={() => toggleFilter(selectedExp, setSelectedExp, exp)}
                    />
                    <span className="filter-option-label">{exp}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="jobs-main">
            {/* Search Bar */}
            <div className="jobs-search-bar">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search by title, company, or keyword..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
              {search && <button onClick={() => setSearch('')} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }}>×</button>}
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="active-filters">
                {selectedTypes.map(t => (
                  <span key={t} className="active-filter-chip" onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)}>
                    {t} ×
                  </span>
                ))}
                {selectedCats.map(c => (
                  <span key={c} className="active-filter-chip" onClick={() => toggleFilter(selectedCats, setSelectedCats, c)}>
                    {c} ×
                  </span>
                ))}
                {selectedExp.map(e => (
                  <span key={e} className="active-filter-chip" onClick={() => toggleFilter(selectedExp, setSelectedExp, e)}>
                    {e} ×
                  </span>
                ))}
              </div>
            )}

            {/* Toolbar */}
            <div className="jobs-toolbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button className="mobile-filter-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  🎛 Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <p className="jobs-count">
                  Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> jobs
                </p>
              </div>
              <div className="jobs-toolbar-right">
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="featured">Featured First</option>
                  <option value="salary">Highest Salary</option>
                </select>
                <div className="view-toggle">
                  <button className={`view-btn${viewMode === 'list' ? ' active' : ''}`} onClick={() => setViewMode('list')}>☰</button>
                  <button className={`view-btn${viewMode === 'grid' ? ' active' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
                </div>
              </div>
            </div>

            {/* Jobs List */}
            {paginated.length > 0 ? (
              <div className={`jobs-list${viewMode === 'grid' ? ' grid-view' : ''}`}>
                {paginated.map(job => (
                  <JobCard key={job.id} job={job} compact={viewMode === 'list'} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No jobs found</div>
                <div style={{ fontSize: '0.875rem' }}>Try adjusting your filters or search term.</div>
                <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={clearFilters}>Clear Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
