import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [showProducts, setShowProducts]   = useState(false);
  const [showDecoration, setShowDecoration] = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${mobileMenuOpen ? ' mobile-open' : ''}`}>
      <div className="nav-left">
        <Link to="/" className="logo-container">
          <img src="/logo-final.png" alt="AL MIRAAL" />
        </Link>
      </div>

      <div className={`nav-center ${mobileMenuOpen ? 'mobile-show' : ''}`}>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link>

        <div
          className="dropdown"
          onMouseEnter={() => setShowProducts(true)}
          onMouseLeave={() => setShowProducts(false)}
        >
          <div className={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}>
            PRODUCTS <ChevronDown size={13} />
          </div>
          {(showProducts || mobileMenuOpen) && (
            <div className="dropdown-menu">
              <Link to="/products/perfume-bottle" className={location.pathname === '/products/perfume-bottle' ? 'active' : ''}>PERFUME BOTTLE</Link>
              <Link to="/products/perfume-cap" className={location.pathname === '/products/perfume-cap' ? 'active' : ''}>PERFUME CAP</Link>
              <Link to="/products/pumps-collar" className={location.pathname === '/products/pumps-collar' ? 'active' : ''}>PUMPS & COLLAR</Link>
              <Link to="/products/diffuser" className={location.pathname === '/products/diffuser' ? 'active' : ''}>DIFFUSER</Link>
              <Link to="/products/cream-Jar" className={location.pathname === '/products/cream-Jar' ? 'active' : ''}>CREAM JAR</Link>
              <Link to="/products/plastic-spray" className={location.pathname === '/products/plastic-spray' ? 'active' : ''}>PLASTIC SPRAY</Link>
              <Link to="/products/serum-bottle" className={location.pathname === '/products/serum-bottle' ? 'active' : ''}>SERUM BOTTLE</Link>
              <Link to="/products/mini-set" className={location.pathname === '/products/mini-set' ? 'active' : ''}>MINI SET</Link>
              <Link to="/products/car-perfume" className={location.pathname === '/products/car-perfume' ? 'active' : ''}>CAR PERFUME</Link>
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowDecoration(true)}
          onMouseLeave={() => setShowDecoration(false)}
        >
          <div className={`nav-link ${location.pathname === '/decoration' ? 'active' : ''}`}>
            DECORATION <ChevronDown size={13} />
          </div>
          {(showDecoration || mobileMenuOpen) && (
            <div className="dropdown-menu">
              <Link to="/decoration">COLOUR COATING</Link>
              <Link to="/decoration">HOT STAMPING</Link>
              <Link to="/decoration">SCREEN PRINTING</Link>
            </div>
          )}
        </div>

        <Link to="/private-label" className={`nav-link ${location.pathname === '/private-label' ? 'active' : ''}`}>PRIVATE LABEL</Link>
        
        {/* Mobile-only links */}
        {mobileMenuOpen && (
          <div className="mobile-only-links">
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>CONTACT US</Link>
            <Link to="/customize" className={`nav-link ${location.pathname === '/customize' ? 'active' : ''}`}>CUSTOMIZE</Link>
          </div>
        )}
      </div>

      <div className="nav-right">
        <Link to="/contact" className={`nav-btn btn-contact ${location.pathname === '/contact' ? 'active' : ''}`}>
          CONTACT US
          <div className="diamond"></div>
          <div className="arrow-circle"><ArrowRight size={14} /></div>
        </Link>
        <Link to="/customize" className={`nav-btn btn-customize ${location.pathname === '/customize' ? 'active' : ''}`}>
          CUSTOMIZE
          <div className="diamond"></div>
          <div className="arrow-circle"><ArrowRight size={14} /></div>
        </Link>
      </div>

      <button className="nav-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;
