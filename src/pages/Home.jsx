import React, { useState, useEffect } from 'react';
import './Home.css';
import { ArrowDown, ArrowRight } from 'lucide-react';
import BentoGrid from '../components/BentoGrid';
import SplitText from '../components/SplitText/SplitText';

import ProductShowcase from '../components/ProductShowcase';
import BlogSection from '../components/BlogSection';
import MarketingContent from '../components/MarketingContent';

/* -------------------------------------------------------
   Hero thumbnail data
------------------------------------------------------- */
const heroItems = [
  {
    id: 1,
    label: 'Premium Bottles',
    thumb: '/customize/bottles-100ml/Mira.png',
    preview: '/customize/bottles-100ml/Mira.png',
    desc: 'High-quality glass bottles designed to showcase your fragrance in style.'
  },
  {
    id: 2,
    label: 'Luxury Caps',
    thumb: '/customize/caps/Amour.png',
    preview: '/customize/caps/Amour.png',
    desc: 'Elegant caps that add a touch of sophistication to any perfume bottle.'
  },
  {
    id: 3,
    label: 'Precision Pumps',
    thumb: '/customize/pumps/5.png',
    preview: '/customize/pumps/5.png',
    desc: 'Reliable and high-performance pumps for a perfect mist every time.'
  }
];

const serviceCards = [
  {
    badge: 'GLASS BOTTLE',
    img: '/glasspackaging/glassbottle.png',
    title: 'Glass Bottle',
    desc: "Al Miraal's high-quality, transparent perfume glass bottles combine elegance and durability, elevating your fragrance brand."
  },
  {
    badge: 'BOTTLE DECORATION',
    img: '/glasspackaging/bottledecoration.png',
    title: 'Bottle Decoration',
    desc: 'Al Miraal specialized in glass bottle decoration, offering hot stamping, screen printing, and colour coating.'
  },
  {
    badge: 'PRIVATE LABEL',
    img: '/glasspackaging/privatelabel.png',
    title: 'Private Label',
    desc: 'We offer comprehensive private label solutions to help you build your unique fragrance brand.'
  }
];

const CYCLE_WORDS = ['HOT STAMPING', 'SCREEN PRINTING', 'COLOUR COATING'];

const Home = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [cycleIdx, setCycleIdx]       = useState(0);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [countryCode, setCountryCode] = useState('+971');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const countryCodes = [
    { code: '+971', name: 'UAE' },
    { code: '+966', name: 'KSA' },
    { code: '+965', name: 'KW' },
    { code: '+968', name: 'OM' },
    { code: '+974', name: 'QA' },
    { code: '+973', name: 'BH' },
    { code: '+1',   name: 'USA' },
    { code: '+44',  name: 'UK' },
    { code: '+91',  name: 'IN' },
    { code: '+92',  name: 'PK' }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIdx(prev => (prev + 1) % CYCLE_WORDS.length);
    }, 2000);

    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: `${countryCode} ${formData.phone}` })
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="home-page fade-in">

      {/* ===== HERO ===== */}
      <div className="hero-section">
        <div className="hero-content container">
          <div className="hero-text">
                        <SplitText
              text="Discover The Art of Glass Perfume Packaging"
              className="hero-title"
              delay={50}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign={isMobile ? "center" : "left"}
              tag="h1"
            />

            <p>Welcome to Al Miraal! We are the top choice for perfume packaging that combines high quality with great design. Our collection of perfume bottles has everything you need to make your brand shine. From stylish designs to durable materials, we provide the best options to suit your needs and budget.</p>
          </div>
          <div className="hero-thumbnails">
            {heroItems.map(item => (
              <div
                key={item.id}
                className={`thumbnail-item ${hoveredItem === item.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img src={item.thumb} alt={item.label} />
              </div>
            ))}
          </div>
          <div className={`hero-preview-card ${hoveredItem ? 'visible' : ''}`}>
            {hoveredItem && (() => {
              const item = heroItems.find(i => i.id === hoveredItem);
              return (
                <>
                  <img src={item.preview} alt={item.label} />
                  <div className="preview-body">
                    <h4>{item.label}</h4>
                    <p>{item.desc}</p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
        <div className="explore-services">
          <span>EXPLORE OUR SERVICES</span>
          <ArrowDown size={16} />
        </div>
      </div>

      <div className="services-section">
        <div className="container">
          <div className="services-header">
            <h2 className="green-text">PERFUME PACKAGING</h2>
            <div className="cycling-text-wrap">
              <span key={cycleIdx} className="cycling-word">{CYCLE_WORDS[cycleIdx]}</span>
            </div>
          </div>
          <div className="services-grid">
            {serviceCards.map((card, i) => (
              <div key={i} className="service-card">
                <div className="card-badge">{card.badge}</div>
                <div className="card-image-full"><img src={card.img} alt={card.title} /></div>
                <div className="card-footer-banner">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductShowcase />
      <BentoGrid />
      <MarketingContent />
      <BlogSection />

      <div className="reach-out-section-v2">
        <div className="container reach-out-container">
          <div className="reach-out-form-wrapper">
            <h2 className="reach-out-title">Reach out to us now</h2>
            <div className="contact-card">
              {submitted ? (
                <div className="home-success-msg">
                  <h3>Message Sent!</h3>
                  <p>Our team will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-reset">Send Another</button>
                </div>
              ) : (
                <form className="contact-form-v2" onSubmit={handleInquirySubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <input type="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                    </div>
                  </div>
                  <div className="phone-row">
                    <div className="country-code">
                      <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                        {countryCodes.map(c => (
                          <option key={c.code} value={c.code}>{c.name} {c.code}</option>
                        ))}
                      </select>
                    </div>
                    <input type="text" placeholder="Enter phone number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required></textarea>
                  </div>
                  <button type="submit" className="btn-send-message" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={16} style={{ marginLeft: 8 }} />
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="reach-out-graphic-v2">
            <img src="/contact-section.png" alt="Al Miraal" className="floating-logo" />
          </div>
        </div>
      </div>

      <a href="https://wa.me/971000000000" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
};

export default Home;
