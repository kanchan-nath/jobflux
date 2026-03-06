import './BlogCard.css';

const icons = ['📝', '💡', '🚀', '🎯', '📊'];

export default function BlogCard({ post, index = 0 }) {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <div className="blog-image-placeholder">
          {icons[index % icons.length]}
        </div>
        <span className="blog-cat-badge">{post.category}</span>
      </div>
      <div className="blog-body">
        <div className="blog-meta">
          <span className="blog-date">📅 {post.date}</span>
          <span className="blog-read">⏱ {post.readTime}</span>
        </div>
        <div className="blog-title">{post.title}</div>
        <div className="blog-excerpt">{post.excerpt}</div>
        <div className="blog-read-more">Read More →</div>
      </div>
    </div>
  );
}
