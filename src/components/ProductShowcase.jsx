import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProductShowcase.css';

const PRODUCTS = [
  { id: 0, label: 'Glass Bottles', subtitle: 'PERFUME PACKAGING', heading: 'PERFUME GLASS BOTTLES', desc: 'Al Miraal designs exquisite glass bottles to showcase your fragrance with elegance. We offer a variety of shapes and sizes to suit every brand in the UAE.', icon: '/svgs/bottles.svg', image: 'https://i.pinimg.com/736x/f4/88/e8/f488e87e4b6991d7f06dd1f68b3713d3.jpg', link: '/products/perfume-bottle' },
  { id: 1, label: 'Perfume Caps', subtitle: 'BOTTLE FINISHING', heading: 'PERFUME CAPS', desc: 'Our luxury perfume caps are crafted with precision engineering to deliver a perfect seal and stunning aesthetic. Choose from zinc, ABS, acrylic and wood.', icon: '/svgs/caps.svg', image: 'https://i.pinimg.com/736x/fd/bf/a8/fdbfa88b1b21e2f970fd006d3161198b.jpg', link: '/products/perfume-cap' },
  { id: 2, label: 'Pumps & Collars', subtitle: 'DISPENSING SYSTEMS', heading: 'PUMPS & COLLARS', desc: 'From fine mist sprayers to robust pump assemblies, our dispensing solutions ensure smooth, consistent performance for every fragrance application.', icon: '/svgs/valf1.svg', image: 'https://i.pinimg.com/736x/31/b7/34/31b73439df3523563339c15cde8950ee.jpg', link: '/products/pumps-collar' },
  { id: 3, label: 'Mini Sets', subtitle: 'TRAVEL & SAMPLE', heading: 'MINI PERFUME SETS', desc: 'Compact and elegant mini sets perfect for travel, gifting, or sampling. High-quality small volumes with the same luxury feel as our full-sized bottles.', icon: '/svgs/bottlepainting.svg', image: 'https://i.pinimg.com/736x/a4/28/26/a42826666fda3c73af9189ff70acf77e.jpg', link: '/products/mini-set' },
  { id: 4, label: 'Cream Jars', subtitle: 'COSMETIC PACKAGING', heading: 'CREAM JARS', desc: 'Wide-mouth cream jars ideal for luxury skincare brands. Available in glass and acrylic with various closure options and custom decoration.', icon: '/productIcon/creamicon.png', image: 'https://i.pinimg.com/736x/49/38/60/4938609843c845553d10008e89e3af84.jpg', link: '/products/cream-Jar' },
  { id: 5, label: 'Serum Bottles', subtitle: 'SKINCARE PACKAGING', heading: 'SERUM BOTTLES', desc: 'Sleek dropper and pump serum bottles for premium skincare lines. Available in amber, clear and frosted glass with gold or silver hardware.', icon: '/productIcon/serumicon.png', image: 'https://i.pinimg.com/736x/c3/b7/a0/c3b7a06ab567a1730a8ac35ca83bc08d.jpg', link: '/products/serum-bottle' },
  { id: 6, label: 'Diffusers', subtitle: 'HOME FRAGRANCE', heading: 'DIFFUSER BOTTLES', desc: 'Elegant diffuser bottles that blend seamlessly with any interior. Available in a range of volumes, neck sizes and glass textures for reed diffuser applications.', icon: '/productIcon/diffuser.png', image: 'https://i.pinimg.com/736x/b7/b0/94/b7b094f22668ce668e4f57877504e0e4.jpg', link: '/products/diffuser' },
];

/* Half-circle positions (left side of a circle, C-shape opening right)
   Circle center at (200, 210), R=175  viewBox: "0 0 220 420" */
const R = 175, CX = 200, CY = 210;
const SLOT_ANGLES_DEG = [120, 180, 240]; // top→bottom through left
const SLOT_CONFIGS = SLOT_ANGLES_DEG.map((a, i) => {
  const rad = (a * Math.PI) / 180;
  const x = CX + R * Math.cos(rad);
  const y = CY - R * Math.sin(rad);        // flip Y for SVG
  const size = [38, 48, 38][i];
  const opacity = [0.65, 1, 0.65][i];
  return { x, y, size, opacity, isCenter: i === 1 };
});

const AUTO_MS = 2000;
const N = PRODUCTS.length;
const VISIBLE = SLOT_CONFIGS.length; // 3
const HALF = Math.floor(VISIBLE / 2); // 1

export default function ProductShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgKey, setImgKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = (i) => { setActiveIdx(i); setImgKey(k => k + 1); };

  const tick = () => setActiveIdx(prev => { setImgKey(k => k + 1); return (prev + 1) % N; });

  useEffect(() => {
    timerRef.current = setInterval(tick, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  const active = PRODUCTS[activeIdx];

  // Build 7 visible items, activeIdx maps to slot 3 (center)
  const visible = SLOT_CONFIGS.map((slot, si) => {
    const offset = si - HALF;
    const idx = ((activeIdx + offset) % N + N) % N;
    return { ...slot, product: PRODUCTS[idx], isActive: si === HALF };
  });

  return (
    <section className="ps-section">
      <div className="ps-inner">

        {/* LEFT: clickable image — no banner */}
        <Link to={active.link} className="ps-img-link" key={imgKey}>
          <img src={active.image} alt={active.heading} className="ps-main-img" />
        </Link>

        {/* CENTER: text */}
        <div className="ps-text-col" key={`t${activeIdx}`}>
          <span className="ps-kicker">{active.subtitle}</span>
          <h2 className="ps-h2">PRODUCTS</h2>
          <p className="ps-intro">
            As a leading brand in perfume and cosmetics, we offer unique experiences that appeal
            to every taste. Each product stands out with aesthetic designs and quality materials.
          </p>
          <div className="ps-divider" />
          <h3 className="ps-h3">{active.heading}</h3>
          <p className="ps-body">{active.desc}</p>
        </div>

        {/* RIGHT: half-circle orbit */}
        <div className="ps-orbit-wrap">
          <svg
            viewBox="0 0 220 420"
            xmlns="http://www.w3.org/2000/svg"
            className="ps-orbit-svg"
          >
            {/* Dashed C-arc: from top (200,35) through left (25,210) to bottom (200,385) */}
            <path
              d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 0 ${CX} ${CY + R}`}
              fill="none"
              stroke="#c8dda8"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            {visible.map((slot, si) => (
              <g
                key={si}
                transform={`translate(${slot.x}, ${slot.y})`}
                className="ps-orbit-item"
                onClick={() => {
                  clearInterval(timerRef.current);
                  goTo(((activeIdx + (si - HALF)) % N + N) % N);
                  timerRef.current = setInterval(tick, AUTO_MS);
                }}
              >
                {/* outer glow ring for center/active */}
                {slot.isActive && (
                  <circle r={slot.size + 12} fill="rgba(133,179,68,0.12)" stroke="none" />
                )}
                {/* main circle */}
                <circle
                  r={slot.size}
                  fill={slot.isActive ? '#85B344' : '#fff'}
                  stroke={slot.isActive ? '#85B344' : '#ddd'}
                  strokeWidth={slot.isActive ? 0 : 1.5}
                  strokeDasharray={slot.isActive ? 'none' : '4 3'}
                  opacity={slot.opacity}
                />
                {/* icon */}
                <image
                  href={slot.product.icon}
                  x={-slot.size * 0.55}
                  y={-slot.size * 0.55}
                  width={slot.size * 1.1}
                  height={slot.size * 1.1}
                  opacity={slot.opacity}
                  style={{ filter: slot.isActive ? 'brightness(0) invert(1)' : 'none' }}
                />
              </g>
            ))}
          </svg>
        </div>

      </div>
    </section>
  );
}
