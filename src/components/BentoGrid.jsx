import React from 'react';
import { Link } from 'react-router-dom';
import './BentoGrid.css';
import CardSwap, { Card } from './CardSwap/CardSwap';

const BentoGrid = () => {
  return (
    <section className="bento-section">
      <div className="container">
        <div className="bento-grid">
          
          {/* Item 1: Feature Video (Large) */}
          <div className="bento-item item-1">
            <div className="video-container">
              <video autoPlay loop muted playsInline>
                <source src="/card5.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="bento-overlay">
              <h3>Precision Manufacturing</h3>
              <p>State-of-the-art glass production with unmatched clarity.</p>
            </div>
          </div>

          {/* Item 2: CardSwap (Tall) */}
          <div className="bento-item item-2" style={{ overflow: 'hidden', background: '#f0f4eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardSwap
              width={240}
              height={300}
              cardDistance={15}
              verticalDistance={10}
              delay={3500}
              pauseOnHover={true}
            >
              <Card>
                <img src="/glasspackaging/glassbottle.png" alt="Bottle 1" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </Card>
              <Card>
                <img src="/glasspackaging/bottledecoration.png" alt="Bottle 2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </Card>
              <Card>
                <img src="/glasspackaging/privatelabel.png" alt="Bottle 3" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </Card>
            </CardSwap>
          </div>

          {/* Item 3: Service Badge (Small) */}
          <div className="bento-item item-3">
            <div className="bento-content-inner">
              <div className="badge-tag">Service</div>
              <div className="light-text">Hot Stamping</div>
            </div>
          </div>

          {/* Item 4: Dark Accent (Small) */}
          <div className="bento-item item-4">
            <div className="bento-content-inner">
              <div className="accent-text">99%</div>
              <p style={{ color: '#8da6a0', fontSize: '12px', marginTop: '5px' }}>Clarity Grade</p>
            </div>
          </div>

          {/* Item 5: Wide Content (Wide) */}
          <Link to="/contact" className="bento-item item-5" style={{ textDecoration: 'none' }}>
            <div className="bento-content-inner">
              <h2 style={{ color: '#1a3311', fontSize: '2.2rem', fontWeight: 800 }}>Ready to Start?</h2>
              <p style={{ color: '#555', maxWidth: '300px' }}>Join 500+ global fragrance brands who trust Al Miraal.</p>
            </div>
            <div className="bento-overlay">
              <h3>Contact Us</h3>
              <p>Get a quote for your custom project today.</p>
            </div>
          </Link>

          {/* Item 6: Small Image (Small) */}
          <div className="bento-item item-6">
            <img src="/card1.png" alt="Product" className="main-img" />
            <div className="bento-overlay">
              <h3>Global Shipping</h3>
              <p>Delivering quality worldwide.</p>
            </div>
          </div>

          {/* Item 7: New Small Card */}
          <div className="bento-item item-7">
            <div className="bento-content-inner">
              <div className="badge-tag">New</div>
              <div style={{ color: '#1a3311', fontWeight: 700, fontSize: '1.4rem' }}>Sustainable Materials</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
