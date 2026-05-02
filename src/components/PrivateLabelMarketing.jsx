import React from 'react';
import './PrivateLabelMarketing.css';
import { CheckCircle2, Zap, ShieldCheck, Globe, Leaf, Clock, Settings, Heart } from 'lucide-react';

const PrivateLabelMarketing = () => {
  return (
    <div className="pl-mkt-section">
      <div className="container">
        
        <div className="pl-mkt-scroll-box">
          
          {/* Intro */}
          <div className="pl-mkt-block">
            <h2 className="pl-mkt-title">Al Miraal Private Label Perfume Packaging Services</h2>
            <p className="pl-mkt-text">
              Private label perfume packaging services empower brands to create distinctive and customized perfume packaging 
              that represents their unique identity. At Al Miraal, we excel in providing exceptional Private label perfume 
              packaging solutions, helping businesses design bespoke bottles and packaging that captivate consumers and 
              elevate brand value.
            </p>
            <p className="pl-mkt-text">
              Our expertise extends to glass perfume bottle private labeling, perfume packaging private label, and perfume 
              packaging products private label, ensuring every element reflects the brand’s ethos. Based in Dubai, we 
              cater to both local and international markets with premium perfume bottle private label in UAE services.
            </p>
          </div>

          {/* Benefits */}
          <div className="pl-mkt-block">
            <h3 className="pl-mkt-subtitle">Why Choose Al Miraal Perfume Bottle Private Label Services?</h3>
            <p className="pl-mkt-text">
              In the competitive fragrance market, customization is key to creating a lasting impression. 
              Perfume bottle private label services allow brands to design bottles and packaging that align with their vision and values.
            </p>
            <div className="pl-mkt-grid">
              <div className="pl-mkt-card">
                <Settings className="pl-mkt-icon" />
                <h4>Exclusive Branding</h4>
                <p>Custom designs create a unique identity for your products.</p>
              </div>
              <div className="pl-mkt-card">
                <Zap className="pl-mkt-icon" />
                <h4>Creative Freedom</h4>
                <p>Select materials, finishes, and design elements to suit your brand.</p>
              </div>
              <div className="pl-mkt-card">
                <ShieldCheck className="pl-mkt-icon" />
                <h4>Cost-Effective</h4>
                <p>Streamlined production offering high-quality results at competitive prices.</p>
              </div>
              <div className="pl-mkt-card">
                <Globe className="pl-mkt-icon" />
                <h4>Market Adaptability</h4>
                <p>Packaging that appeals to both regional (UAE) and global markets.</p>
              </div>
            </div>
          </div>

          {/* Tailored Services */}
          <div className="pl-mkt-block">
            <h3 className="pl-mkt-subtitle">Tailored Services We Offer</h3>
            <ul className="pl-mkt-list">
              <li><strong>Glass Perfume Bottle Private Labeling:</strong> Creating visually stunning bottles that embody sophistication.</li>
              <li><strong>Perfume Packaging Products Private Label:</strong> Cohesive solutions that align the bottle with its outer packaging.</li>
              <li><strong>Design to Production:</strong> From minimalist designs to intricate detailing, we handle it all.</li>
            </ul>
          </div>

          {/* How We Stand Out */}
          <div className="pl-mkt-block">
            <h3 className="pl-mkt-subtitle">How Al Miraal Stands Out</h3>
            <div className="pl-mkt-features">
              <div className="pl-mkt-feat-item">
                <strong>Advanced Technology:</strong> We utilize state-of-the-art machinery to create flawless packaging designs.
              </div>
              <div className="pl-mkt-feat-item">
                <strong>Customization at Its Best:</strong> Unparalleled creative freedom from material selection to final design.
              </div>
              <div className="pl-mkt-feat-item">
                <strong>Commitment to Sustainability:</strong> Eco-friendly solutions that align with modern consumer values.
              </div>
            </div>
          </div>

          {/* Trends */}
          <div className="pl-mkt-block pl-mkt-trends">
            <h3 className="pl-mkt-subtitle">Trends in Perfume Bottle Private Labeling</h3>
            <div className="pl-mkt-pills">
              <span>Sustainable Materials</span>
              <span>Minimalist Aesthetics</span>
              <span>Metallic Accents</span>
              <span>Custom Shapes</span>
              <span>Personalization</span>
            </div>
          </div>

          {/* Process */}
          <div className="pl-mkt-block">
            <h3 className="pl-mkt-subtitle">Our Process</h3>
            <div className="pl-mkt-process">
              <div className="pl-mkt-step">
                <span className="step-num">1</span>
                <div><strong>Consultation:</strong> Understanding your vision and market goals.</div>
              </div>
              <div className="pl-mkt-step">
                <span className="step-num">2</span>
                <div><strong>Design:</strong> Creating customized designs that align with your brand.</div>
              </div>
              <div className="pl-mkt-step">
                <span className="step-num">3</span>
                <div><strong>Production:</strong> Precision manufacturing using advanced technology.</div>
              </div>
              <div className="pl-mkt-step">
                <span className="step-num">4</span>
                <div><strong>Quality:</strong> Rigorous checks to ensure perfection in every bottle.</div>
              </div>
              <div className="pl-mkt-step">
                <span className="step-num">5</span>
                <div><strong>Delivery:</strong> Timely shipping to hit the market without delays.</div>
              </div>
            </div>
          </div>

          {/* Partner Benefits */}
          <div className="pl-mkt-block">
            <h3 className="pl-mkt-subtitle">Partner with Al Miraal</h3>
            <div className="pl-mkt-benefits">
              <div className="benefit-item"><CheckCircle2 className="mkt-check" /> Experienced Professionals</div>
              <div className="benefit-item"><CheckCircle2 className="mkt-check" /> High-Quality Standards</div>
              <div className="benefit-item"><CheckCircle2 className="mkt-check" /> Local & International Reach</div>
              <div className="benefit-item"><CheckCircle2 className="mkt-check" /> Sustainability Commitment</div>
            </div>
          </div>

          {/* Closing */}
          <div className="pl-mkt-footer">
            <h2>Ready to launch your signature collection?</h2>
            <p>Contact us today to explore our tailored perfume bottle private label services in the UAE.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivateLabelMarketing;
