import React from 'react';
import { Link } from 'react-router-dom';
import './PrivateLabel.css';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PrivateLabelMarketing from '../components/PrivateLabelMarketing';

const FEATURES = [
  {
    title: 'Custom Branding',
    desc: 'Offer tailored labels featuring your brand name, logo, and unique design elements that make your product stand out on the shelf.',
  },
  {
    title: 'Small to Large Batches',
    desc: 'Flexible production for businesses of all sizes — from startup MOQs to large-scale enterprise manufacturing runs.',
  },
  {
    title: 'Market-Ready Packaging',
    desc: 'Deliver beautifully branded bottles that are ready to impress customers and strengthen your brand presence.',
  },
  {
    title: 'Full Design Support',
    desc: 'Our in-house design team works with you to create stunning, print-ready artwork that perfectly represents your brand.',
  },
];

const STEPS = [
  { num: '01', title: 'Consultation',   desc: 'Share your vision and requirements with our packaging experts.' },
  { num: '02', title: 'Design & Sample', desc: 'We craft custom samples and artwork for your approval.' },
  { num: '03', title: 'Production',     desc: 'Large-scale manufacturing with strict quality control at every step.' },
  { num: '04', title: 'Delivery',       desc: 'Market-ready, beautifully packaged bottles delivered to your door.' },
];

const PrivateLabel = () => (
  <div className="pl-page">


    {/* ── MAIN SPLIT SECTION ── */}
    <div className="pl-split container">

      {/* Left: text */}
      <div className="pl-split-text">
        <span className="pl-tag">PRIVATE LABELING</span>
        <h2 className="pl-h2">Private Labeling</h2>

        <ul className="pl-features">
          {FEATURES.map((f, i) => (
            <li key={i} className="pl-feature-item">
              <div className="pl-dot" />
              <div>
                <strong className="pl-feature-title">{f.title}:</strong>{' '}
                <span className="pl-feature-desc">{f.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="pl-cta-btn">
          Get a Free Quote <ArrowRight size={15} />
        </Link>
      </div>

      {/* Right: image */}
      <div className="pl-split-image">
        <img
          src="https://i.pinimg.com/1200x/e4/f4/f1/e4f4f1a6836f1912ef491e216eba7a4a.jpg"
          alt="Private Label Perfume Packaging"
        />
      </div>
    </div>

    {/* ── PROCESS STEPS ── */}
    <div className="pl-steps-section">
      <div className="container">
        <h2 className="pl-steps-heading">Our Process</h2>
        <div className="pl-steps-grid">
          {STEPS.map((s) => (
            <div key={s.num} className="pl-step-card">
              <div className="pl-step-num">{s.num}</div>
              <h3 className="pl-step-title">{s.title}</h3>
              <p className="pl-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── MARKETING CONTENT ── */}
    <PrivateLabelMarketing />

    {/* ── CTA BANNER ── */}
    <div className="pl-banner">
      <div className="container pl-banner-inner">
        <h2 className="pl-banner-h2">Ready to Build Your Brand?</h2>
        <p className="pl-banner-sub">
          Partner with Al Miraal and launch a premium fragrance line that stands out.
        </p>
        <Link to="/contact" className="pl-banner-btn">
          Contact Us Today <ArrowRight size={15} />
        </Link>
      </div>
    </div>

  </div>
);

export default PrivateLabel;
