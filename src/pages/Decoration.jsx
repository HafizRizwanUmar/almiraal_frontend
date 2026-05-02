import React from 'react';
import { Palette, Zap, Type, CheckCircle2 } from 'lucide-react';
import './Decoration.css';

const Decoration = () => {
  return (
    <div className="deco-page fade-in">
      
      {/* ── HERO SECTION ── */}
      <div className="deco-hero">
        <div className="container">
          <span className="deco-tag">PERFUME DECORATION IN UAE</span>
          <h1 className="deco-title">Elevate Your Fragrance Brand’s Aesthetic</h1>
          <p className="deco-sub">
            At Al Miraal, we specialize in perfume decoration in UAE, offering world-class solutions 
            to enhance the appeal of your fragrance products. Perfume bottle decoration plays a 
            vital role in creating an unforgettable customer experience.
          </p>
        </div>
      </div>

      {/* ── COLOR COATING ── */}
      <div className="deco-section">
        <div className="container deco-grid">
          <div className="deco-text-side">
            <div className="deco-service-icon"><Palette /></div>
            <h2>Color Coating</h2>
            <h3>Transforming Aesthetics</h3>
            <p>Enhance the visual appeal of perfume bottles with smooth, vibrant, and durable color coatings.</p>
            <ul className="deco-features">
              <li><CheckCircle2 size={18} /> <strong>Custom Shades:</strong> Choose from a wide range of custom colors to align with your brand's identity.</li>
              <li><CheckCircle2 size={18} /> <strong>Premium Finish:</strong> Ensure a sleek, uniform, and scratch-resistant finish that exudes luxury.</li>
            </ul>
          </div>
          <div className="deco-image-side">
            <img src="/decoration/colorcoating.jpg" alt="Color Coating" className="full-view-img" />
          </div>
        </div>
      </div>

      {/* ── HOT STAMPING ── */}
      <div className="deco-section bg-light">
        <div className="container deco-grid reverse">
          <div className="deco-text-side">
            <div className="deco-service-icon"><Zap /></div>
            <h2>Hot Stamping / Foils</h2>
            <h3>Elegant Designs</h3>
            <p>Add metallic accents like gold or silver for a luxurious and eye-catching appearance.</p>
            <ul className="deco-features">
              <li><CheckCircle2 size={18} /> <strong>High Durability:</strong> Foil stamping resists wear and tear, maintaining its brilliance over time.</li>
              <li><CheckCircle2 size={18} /> <strong>Brand Enhancement:</strong> Highlight logos, patterns, or text with precision and sophistication.</li>
            </ul>
          </div>
          <div className="deco-image-side">
            <img src="/decoration/Hotstamping.svg" alt="Hot Stamping" className="full-view-img" />
          </div>
        </div>
      </div>

      {/* ── SCREEN PRINTING ── */}
      <div className="deco-section">
        <div className="container deco-grid">
          <div className="deco-text-side">
            <div className="deco-service-icon"><Type /></div>
            <h2>Screen Printing</h2>
            <h3>Sharp Detailing</h3>
            <p>Achieve bold, clear, and vibrant prints directly on the bottle surface.</p>
            <ul className="deco-features">
              <li><CheckCircle2 size={18} /> <strong>Versatile Application:</strong> Print intricate designs, logos, or text with high accuracy on curved and flat surfaces.</li>
              <li><CheckCircle2 size={18} /> <strong>Cost-Effective Branding:</strong> A reliable and economical method to personalize bottles with durable prints.</li>
            </ul>
          </div>
          <div className="deco-image-side">
            <img src="/decoration/private.png" alt="Screen Printing" className="full-view-img" />
          </div>
        </div>
      </div>

      {/* ── FOOTER INFO ── */}
      <div className="deco-footer-banner">
        <div className="container">
          <h2>Bringing Your Vision to Life</h2>
          <p>
            Whether it’s through perfume glass bottle decoration, perfume bottle screen printing, 
            perfume bottle colour coating, or perfume bottle hot stamping, we bring your vision 
            to life with precision and artistry.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Decoration;
