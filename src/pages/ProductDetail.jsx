import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, ExternalLink, Shield, Truck } from 'lucide-react';
import './ProductDetail.css';

const API = import.meta.env.VITE_API_URL || '';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API}/api/products/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="pd-loading">Loading product details...</div>;
  if (!product) return <div className="pd-error">Product not found.</div>;

  return (
    <div className="pd-container fade-in">
      <div className="pd-top-bar">
        <button onClick={() => navigate(-1)} className="pd-back-btn">
          <ChevronLeft size={20} /> Back to Catalog
        </button>
      </div>

      <div className="pd-main-grid">
        {/* Left: Images */}
        <div className="pd-visuals">
          <div className="pd-main-img-wrap">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          {product.hoverImageUrl && (
            <div className="pd-secondary-img-wrap">
              <img src={product.hoverImageUrl} alt="Alternative view" />
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="pd-content">
          <div className="pd-badge">{product.category}</div>
          <h1 className="pd-title">{product.name}</h1>
          
          <div className="pd-meta">
            {product.size && <div className="pd-size-tag">Capacity: <span>{product.size}</span></div>}
            <div className="pd-filter-tag">Type: <span>{product.filter}</span></div>
          </div>

          <div className="pd-description">
            <h3>Product Overview</h3>
            <p>{product.description || "A premium packaging solution designed for elegance and functionality. Perfect for luxury perfume brands looking for high-quality glass containers and accessories."}</p>
          </div>

          {/* Details SVG integration */}
          <div className="pd-svg-highlights">
             <img src="/detail.svg" alt="Product Details" className="pd-details-svg" />
          </div>

          <div className="pd-actions">
            {product.pdfUrl && (
              <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer" className="pd-download-btn">
                <Download size={20} /> Download Technical Specs (PDF)
              </a>
            )}
          </div>

          <div className="pd-perks">
            <div className="pd-perk">
              <Shield size={20} />
              <div>
                <strong>Quality Guaranteed</strong>
                <p>Triple-checked premium materials</p>
              </div>
            </div>
            <div className="pd-perk">
              <Truck size={20} />
              <div>
                <strong>Global Shipping</strong>
                <p>Express delivery to USA & UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
