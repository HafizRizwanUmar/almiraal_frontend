import React from 'react';
import './BlogSection.css';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      image: "/blog/blog1.png",
      day: "15",
      month: "May",
      date: "May 15, 2024",
      author: "Admin",
      title: "The Evolution of Luxury Perfume Packaging",
      excerpt: "Explore how glass bottle designs have transformed from simple containers to works of art in the modern era."
    },
    {
      id: 2,
      image: "/blog/blog2.png",
      day: "10",
      month: "May",
      date: "May 10, 2024",
      author: "Marketing",
      title: "How to Choose the Right Cap for Your Fragrance",
      excerpt: "Selecting the perfect cap is crucial for both functionality and aesthetic appeal. Learn about our latest collections."
    },
    {
      id: 3,
      image: "/blog/blog3.png",
      day: "05",
      month: "May",
      date: "May 05, 2024",
      author: "Design Team",
      title: "Sustainable Packaging: The Future of Cosmetics",
      excerpt: "Discover Al Miraal's commitment to eco-friendly glass manufacturing and sustainable design practices."
    }
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header">
          <span className="blog-header-sub">LATEST NEWS</span>
          <h2 className="blog-header-title">OUR BLOGS</h2>
          <div className="blog-header-line"></div>
        </div>

        <div className="blog-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
                <div className="blog-date">
                  <span className="day">{blog.day}</span>
                  <span className="month">{blog.month}</span>
                </div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span><Calendar size={13} /> {blog.date}</span>
                  <span><User size={13} /> {blog.author}</span>
                </div>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <button className="read-more">
                  READ MORE <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
