import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <div className="category-card" onClick={() => navigate('/jobs')}>
      <div className="category-icon-wrap">{category.icon}</div>
      <div className="category-name">{category.name}</div>
      <div className="category-jobs">{category.jobs} open positions</div>
      <span className="category-arrow">↗</span>
    </div>
  );
}
