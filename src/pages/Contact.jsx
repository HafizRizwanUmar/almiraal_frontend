import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page fade-in">
      <div className="contact-header">
        <h1>CONTACT US</h1>
        <p>
          As a leading brand in the perfume and cosmetics world, we offer unique experiences that appeal to every taste. Each of our products stands out with their aesthetic designs and quality materials.
        </p>
      </div>

      <div className="contact-hero">
        <div className="contact-hero-text">
          <h2>Let's Get Started</h2>
          <p>
            We're here to help you create lasting memories with our premium fragrances. Reach out to us for any inquiries, collaborations, or custom scent creations.
          </p>
        </div>
        
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="contact-success-msg">
              <CheckCircle size={48} color="#85B344" />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We will get back to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="btn-reset">Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-input-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-input-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="phone-input">
                <div className="prefix">+971</div>
                <input 
                  type="text" 
                  placeholder="Phone number" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="form-input-group">
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-contact-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="global-operations">
        <h2>Global Operations</h2>
        <div className="maps-container">
          <div className="map-card">
            <div className="map-iframe-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.653457161726!2d-76.6178356846377!3d39.30058897951235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c804be8f75b8a5%3A0x60b72a44d0f7d5c7!2s911%20N%20Charles%20St%2C%20Baltimore%2C%20MD%2021201%2C%20USA!5e0!3m2!1sen!2sae!4v1714570000000!5m2!1sen!2sae" 
                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <h3>USA OFFICE:</h3>
            <p>911 N Charles St, Baltimore, MD 21201, USA</p>
          </div>
          
          <div className="map-card">
            <div className="map-iframe-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115448.24345318103!2d55.33306857187146!3d25.32232709292556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sSharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1714570000000!5m2!1sen!2sae" 
                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <h3>SHARJAH OFFICE:</h3>
            <p>P.O. Box: 323, Sharjah, U.A.E.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
