import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FlaskConical, 
  CircleDot, 
  Waves, 
  Boxes, 
  Wind, 
  Pipette, 
  Droplets, 
  Container, 
  Car,
  Package,
  Briefcase,
  Search,
  Filter
} from 'lucide-react';
import './Products.css';
import ProductMarketing from '../components/ProductMarketing';

const Products = () => {
  const { category: slug } = useParams();
  const navigate = useNavigate();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  
  const [activeSize, setActiveSize] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mapping slugs to Display Names
  const slugToCategory = {
    'perfume-bottle': 'Perfume Bottle',
    'perfume-cap': 'Perfume Cap',
    'pumps-collar': 'Pump & Collar',
    'mini-set': 'Mini Set',
    'diffuser': 'Diffuser',
    'plastic-spray': 'Plastic Sprayer',
    'serum-bottle': 'Serum Bottle',
    'cream-Jar': 'Cream Jar',
    'car-perfume': 'Car Perfume',
    'perfume-bottle-set': 'Perfume Bottle Set',
    'screw-neck': 'Screw Neck Bottle'
  };

  const categoryToSlug = Object.fromEntries(
    Object.entries(slugToCategory).map(([k, v]) => [v, k])
  );

  const activeCategory = slugToCategory[slug] || 'Perfume Bottle';

  const categories = [
    { name: 'Perfume Bottle', icon: <FlaskConical /> },
    { name: 'Perfume Cap', icon: <CircleDot /> },
    { name: 'Pump & Collar', icon: <Waves /> },
    { name: 'Mini Set', icon: <Boxes /> },
    { name: 'Diffuser', icon: <Wind /> },
    { name: 'Plastic Sprayer', icon: <Pipette /> },
    { name: 'Serum Bottle', icon: <Droplets /> },
    { name: 'Cream Jar', icon: <Container /> },
    { name: 'Car Perfume', icon: <Car /> },
    { name: 'Perfume Bottle Set', icon: <Briefcase /> },
    { name: 'Screw Neck Bottle', icon: <Package /> },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/products?category=${encodeURIComponent(activeCategory)}`);
        if (response.ok) {
          const data = await response.json();
          setItems(Array.isArray(data) ? data : []);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    setCurrentPage(1); // Reset page on category change
    setActiveSize('All');
    setSearchQuery('');
  }, [activeCategory]);

  const uniqueSizes = ['All', ...new Set(items.filter(i => i.size && i.size !== 'N/A').map(i => i.size))];

  const filteredItems = items.filter(item => {
    const matchesSize = activeSize === 'All' || item.size === activeSize;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSize && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (catName) => {
    const newSlug = categoryToSlug[catName];
    navigate(`/products/${newSlug}`);
  };

  return (
    <div className="container products-page fade-in">
      <div className="products-header">
        <h1>OUR PERFUME PACKAGING PRODUCTS</h1>
        <p>As a premier brand in the perfume packaging industry, we provide exceptional experiences that cater to every preference with our diverse product range.</p>
      </div>

      <div className="products-content">
        <div className="products-sidebar">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`sidebar-item ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="sidebar-icon">
                {cat.icon}
              </div>
              <span className="sidebar-text">{cat.name}</span>
            </div>
          ))}
        </div>

        <div className="products-main">
          <div className="products-top-filter-bar">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <div className="size-filters">
              <span className="filter-label"><Filter size={14} /> Size:</span>
              {uniqueSizes.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${activeSize === size ? 'active' : ''}`}
                  onClick={() => { setActiveSize(size); setCurrentPage(1); }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <span>Loading {activeCategory}...</span>
            </div>
          ) : filteredItems.length > 0 ? (
            <>
              <div className="products-grid">
                {paginatedItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="product-item-card"
                    onClick={() => navigate(`/product/${item.slug || item._id}`)}
                  >
                    <div className="product-img-wrapper">
                      <img src={item.imageUrl} alt={item.name} className="primary-img" />
                      {item.hoverImageUrl && <img src={item.hoverImageUrl} alt={item.name} className="hover-img" />}
                      <div className="product-card-overlay">
                        <div className="product-info-overlay">
                          <h4>{item.name}</h4>
                          <p>{item.filter} {item.size && item.size !== 'N/A' ? `· ${item.size}` : ''}</p>
                        </div>
                        <div className="view-details-action">
                          <img src="/detail.svg" alt="Details" />
                          <span>View Details</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination-controls">
                  <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="product-no-items">
              <p>No products available in this category yet.</p>
            </div>
          )}

          {/* Dynamic Marketing Content moved to bottom */}
          <ProductMarketing category={activeCategory} />
        </div>
      </div>
    </div>
  );
};

export default Products;
