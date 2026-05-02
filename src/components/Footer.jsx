import React from 'react';
import { MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>Leave an Email and We Will Contact You</h3>
        <p>Send email to get in touch</p>
        <div className="email-form">
          <input type="text" placeholder="Your Name - Surname" />
          <input type="email" placeholder="Email" />
          <button className="btn-send">Send</button>
        </div>
      </div>

      <div className="footer-middle">
        <div className="contact-info">
          <MapPin className="contact-icon" size={24} />
          <div className="contact-text">
            <h4>Address UAE</h4>
            <p>Tel: +971 52 274 8866</p>
            <p>P.O. Box: 323, Sharjah, U.A.E.</p>
          </div>
        </div>

        <div className="social-media">
          <h4>Social Media</h4>
          <div className="social-icons">
            <a href="#" className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="social-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        <div className="contact-info" style={{ justifyContent: 'flex-end' }}>
          <MapPin className="contact-icon" size={24} />
          <div className="contact-text">
            <h4>Address USA</h4>
            <p>Tel: +1 410 600 7800</p>
            <p>911 N Charles St, Baltimore, MD 21201, USA</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-wrapper">
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <div className="footer-login">
            <a href="/login">Login</a>
          </div>
          <div className="footer-copyright">
            Leopard Leads IT Solution &copy; Copyright2024| All rights reserved
          </div>
        </div>
      </div>

      <div className="whatsapp-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
