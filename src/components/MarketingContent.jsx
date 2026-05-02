import React from 'react';
import './MarketingContent.css';
import { Check, Star, Shield, Award, Zap, Heart } from 'lucide-react';

const MarketingContent = () => {
  return (
    <div className="marketing-section">
      <div className="container">
        <h2 className="mkt-title">Why Pick Al Miraal for Perfume Packaging?</h2>
        <div className="mkt-scroll-box">
          {/* Why Pick Al Miraal (Text only) */}
          <div className="mkt-block">
            <p className="mkt-text">
              At Al Miraal, we specialize in offering the finest perfume glass bottles and packaging accessories. 
              Whether you are a new startup or a well-established brand, we ensure your perfumes stand out in the market. 
              Our team is dedicated to providing innovative and creative solutions to enhance your fragrance presentation.
            </p>
          </div>

          {/* ... all other blocks ... */}
          <div className="mkt-block">
            <h3 className="mkt-subtitle">Check Out Our Special Perfume Bottles</h3>
            <p className="mkt-text">Here is what makes us different:</p>
            <ul className="mkt-list">
              <li><Star className="mkt-icon" size={18} /> Luxury perfume glass bottles that add a touch of elegance and sophistication.</li>
              <li><Star className="mkt-icon" size={18} /> Sleek perfume bottles in Dubai, crafted with precision and care.</li>
              <li><Star className="mkt-icon" size={18} /> Decorative perfume bottles UAE designed for premium fragrances.</li>
              <li><Star className="mkt-icon" size={18} /> Custom perfume bottle decoration to create a unique look for your brand.</li>
            </ul>
          </div>

          <div className="mkt-block">
            <h3 className="mkt-subtitle">Top-Quality Perfume Glass Bottles In The UAE</h3>
            <p className="mkt-text">
              As a trusted supplier of perfume bottles wholesale, Al Miraal ensures every product meets the highest quality standards. 
              We use durable and eco-friendly materials to create luxury perfume bottles that not only look great but also last long. 
              From classic designs to modern aesthetics, we offer a wide range of styles to suit your brand’s identity.
            </p>
          </div>

          <div className="mkt-block">
            <h3 className="mkt-subtitle">Why Is Al Miraal Perfume Packaging Important?</h3>
            <p className="mkt-text">
              Perfume packaging plays a huge role in capturing attention and making your fragrance memorable. 
              With our perfume bottles Dubai and perfume bottle wholesale UAE services, you can:
            </p>
            <ul className="mkt-list">
              <li><Check className="mkt-icon" size={18} /> Impress customers at first glance with stunning designs.</li>
              <li><Check className="mkt-icon" size={18} /> Build brand recognition using unique perfume glass bottles.</li>
              <li><Check className="mkt-icon" size={18} /> Stand out in the competitive market with custom packaging solutions.</li>
            </ul>
          </div>

          <div className="mkt-grid">
            <div className="mkt-block">
              <h3 className="mkt-subtitle">How We Make Wholesale Easy</h3>
              <ul className="mkt-bullet-list">
                <li><strong>Variety of designs:</strong> Choose from a wide range of perfume glass bottles and decorative options.</li>
                <li><strong>Customizable solutions:</strong> Personalize your bottles with perfume bottle decoration services.</li>
                <li><strong>Affordable pricing:</strong> Competitive rates for bulk orders without compromising on quality.</li>
                <li><strong>Quick delivery:</strong> Timely shipping to ensure your products are ready when you need them.</li>
              </ul>
            </div>

            <div className="mkt-block">
              <h3 className="mkt-subtitle">Benefits Of Choosing Al Miraal</h3>
              <ul className="mkt-bullet-list">
                <li><Award className="mkt-icon-small" size={16} /> <strong>Expertise:</strong> Years of experience in the packaging industry.</li>
                <li><Shield className="mkt-icon-small" size={16} /> <strong>Quality Assurance:</strong> Every product undergoes strict quality checks.</li>
                <li><Zap className="mkt-icon-small" size={16} /> <strong>Creative Designs:</strong> Unique styles to help your brand stand out.</li>
                <li><Heart className="mkt-icon-small" size={16} /> <strong>Customer Support:</strong> Dedicated team ready to assist you at every step.</li>
              </ul>
            </div>
          </div>

          <div className="mkt-block mkt-luxury-callout">
            <h3 className="mkt-subtitle">The Role Of Luxury In Al Miraal Perfume Bottles</h3>
            <p className="mkt-text">
              Luxury is about more than just looks; it is about the feeling your product gives to the customer. 
              Our luxury perfume glass bottles are designed to convey elegance and refinement, making them perfect for high-end brands.
            </p>
          </div>

          <div className="mkt-block">
            <h3 className="mkt-subtitle">Work With Al Miraal For Your Packaging Needs</h3>
            <p className="mkt-text">
              At Al Miraal, we believe in delivering more than just products. We offer a seamless experience from start to finish. 
              Whether it is perfume bottle decoration or perfume bottle packaging, custom designs, or bulk orders, 
              our team is here to make the process easy and stress-free.
            </p>
          </div>

          <div className="mkt-services-grid">
            <div className="mkt-service-card">
              <h4>Glass Bottle</h4>
              <p>Discover our exquisite collection of perfume glass bottles designed to reflect elegance and sophistication. Perfect for creating a luxury perfume bottle, each piece combines premium quality with timeless style to elevate your brand.</p>
            </div>
            <div className="mkt-service-card">
              <h4>Bottle Decoration</h4>
              <p>At Al Miraal, we specialize in perfume bottle decoration that adds a touch of elegance to every design. Ideal for brands and perfume bottle wholesale, our decoration services ensure stunning finishes that elevate your products.</p>
            </div>
            <div className="mkt-service-card">
              <h4>Private Label</h4>
              <p>Al Miraal offers expert private label services to help you create a signature collection with ease. From designing a luxury perfume bottle to delivering exceptional quality, we cater to brands across the perfume bottle UAE market.</p>
            </div>
          </div>

          <div className="mkt-closing">
            <h3>Your Trusted Partner In Luxury Perfume Packaging Solutions</h3>
            <p>
              At Al Miraal, we take pride in offering a complete range of premium solutions, from glass bottles and serum bottles to diffusers, 
              caps to exceptional perfume packaging.
            </p>
          </div>

          <div className="mkt-final-cta">
            <h2>Upgrade Your Brand with Al Miraal Perfume Packaging</h2>
            <p>Choose Al Miraal today and transform your fragrances into works of art. Contact us now to discuss your Perfume Packaging needs!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingContent;
