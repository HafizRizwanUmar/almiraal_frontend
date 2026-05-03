import React, { useState, useEffect, useRef } from 'react';
import './Customize.css';
import { Check, ChevronRight, Send, RotateCcw } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';
const STEPS = ['Choose Bottle', 'Choose Pump', 'Choose Cap', 'Get Quote'];

/* ── Small reusable item grid ── */
const ItemGrid = ({ items, selected, onSelect, loading, currentPage, pageSize, onPageChange, showSections = false }) => {
  if (loading) return <div className="cz-loading">Loading…</div>;
  if (!items.length) return <div className="cz-empty">No items available.</div>;

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = items.slice(startIndex, startIndex + pageSize);

  // Group items by size if sections are requested
  const groups = showSections 
    ? currentItems.reduce((acc, item) => {
        const key = item.size || 'Other';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {})
    : { 'Default': currentItems };

  return (
    <div className="cz-grid-container">
      {Object.entries(groups).map(([groupName, groupItems]) => (
        <div key={groupName} className="cz-group-section">
          {showSections && <h3 className="cz-section-title">{groupName} Bottles</h3>}
          <div className="cz-item-grid">
            {groupItems.map(item => (
              <div
                key={item._id}
                className={`cz-item-card ${selected?._id === item._id ? 'selected' : ''}`}
                onClick={() => onSelect(item)}
                title={item.name}
              >
                <div className="cz-item-img-wrap">
                  <img src={item.imageUrl} alt={item.name} loading="lazy" />
                  <div className="cz-item-overlay">
                    <span className="cz-item-name">{item.name}</span>
                    {item.size && <span className="cz-item-size">{item.size}</span>}
                  </div>
                </div>
                {selected?._id === item._id && (
                  <div className="cz-check"><Check size={12} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="cz-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="cz-pag-btn"
          >
            Previous
          </button>
          <span className="cz-pag-info">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="cz-pag-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default function Customize() {
  const [step, setStep] = useState(0);
  const [sizeFilter, setSizeFilter] = useState('all');

  // Data from API
  const [bottles, setBottles]   = useState([]);
  const [caps, setCaps]         = useState([]);
  const [pumps, setPumps]       = useState([]);
  const [loadingBottles, setLB] = useState(true);
  const [loadingCaps, setLC]    = useState(true);
  const [loadingPumps, setLP]   = useState(true);

  // Selections
  const [bottle, setBottle] = useState(null);
  const [cap, setCap]       = useState(null);
  const [pump, setPump]     = useState(null);

  // Quote form
  const [qty, setQty]         = useState(100);
  const [bottleQty, setBottleQty] = useState(100);
  const [capQty, setCapQty]       = useState(100);
  const [pumpQty, setPumpQty]     = useState(100);
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+971');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]       = useState(window.innerWidth < 768 ? 9 : 30);

  // Resize listener for pagination page size
  useEffect(() => {
    const handleResize = () => setPageSize(window.innerWidth < 768 ? 9 : 30);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when step or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [step, sizeFilter]);

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

  // Sync individual quantities when main qty changes (as a default)
  useEffect(() => {
    setBottleQty(qty);
    setCapQty(qty);
    setPumpQty(qty);
  }, [qty]);

  // Load all items on mount
  useEffect(() => {
    fetch(`${API}/api/customize-items?type=bottle`)
      .then(r => r.json()).then(setBottles).catch(() => setBottles([]))
      .finally(() => setLB(false));
    fetch(`${API}/api/customize-items?type=cap`)
      .then(r => r.json()).then(setCaps).catch(() => setCaps([]))
      .finally(() => setLC(false));
    fetch(`${API}/api/customize-items?type=pump`)
      .then(r => r.json()).then(setPumps).catch(() => setPumps([]))
      .finally(() => setLP(false));
  }, []);

  const filteredBottles = bottles.filter(b => b.size === sizeFilter);

  const canNext = () => {
    if (step === 0) return !!bottle;
    if (step === 1) return true; // pump is optional
    if (step === 2) return !!cap;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    setSubmitting(true);
    try {
      await fetch(`${API}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bottleName: bottle?.name, bottleSize: bottle?.size, bottleImage: bottle?.imageUrl,
          capName: cap?.name, capImage: cap?.imageUrl,
          pumpName: pump?.name, pumpImage: pump?.imageUrl,
          quantity: qty, bottleQty, capQty, pumpQty,
          customerName: name, email, phone: `${countryCode} ${phone}`, message
        })
      });
      setSubmitted(true);
    } catch {
      alert('Failed to submit. Please try again.');
    } finally { setSubmitting(false); }
  };

  const reset = () => {
    setStep(0); setBottle(null); setCap(null); setPump(null);
    setQty(100); setBottleQty(100); setCapQty(100); setPumpQty(100);
    setName(''); setEmail(''); setPhone(''); setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="cz-page">
      {/* ── Step bar ── */}
      <div className="cz-stepbar">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={`cz-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => i < step && setStep(i)}
          >
            <div className="cz-step-num">{i < step ? <Check size={14} /> : i + 1}</div>
            <span className="cz-step-label">{s}</span>
            {i < STEPS.length - 1 && <div className="cz-step-line" />}
          </div>
        ))}
      </div>

      <div className="cz-body">
        {/* ── LEFT: selector panel ── */}
        <div className="cz-panel">

          {/* STEP 0 — Bottle */}
          {step === 0 && (
            <>
              <div className="cz-panel-header">
                <h2>Select a Bottle</h2>
                <div className="cz-size-tabs">
                  <button className={`cz-size-tab ${sizeFilter === 'all' ? 'active' : ''}`} onClick={() => setSizeFilter('all')}>All Sizes</button>
                  <button className={`cz-size-tab ${sizeFilter === '100ml' ? 'active' : ''}`} onClick={() => setSizeFilter('100ml')}>100ml</button>
                  <button className={`cz-size-tab ${sizeFilter === '50ml' ? 'active' : ''}`} onClick={() => setSizeFilter('50ml')}>50ml</button>
                </div>
              </div>
              <ItemGrid
                items={sizeFilter === 'all' ? bottles : bottles.filter(b => b.size === sizeFilter)}
                selected={bottle}
                onSelect={setBottle}
                loading={loadingBottles}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                showSections={sizeFilter === 'all'}
              />
            </>
          )}

          {/* STEP 1 — Pump (optional) */}
          {step === 1 && (
            <>
              <div className="cz-panel-header">
                <h2>Select a Pump <span className="cz-optional">(optional)</span></h2>
              </div>
              <ItemGrid 
                items={pumps} 
                selected={pump} 
                onSelect={setPump} 
                loading={loadingPumps} 
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </>
          )}

          {/* STEP 2 — Cap */}
          {step === 2 && (
            <>
              <div className="cz-panel-header"><h2>Select a Cap</h2></div>
              <ItemGrid 
                items={caps} 
                selected={cap} 
                onSelect={setCap} 
                loading={loadingCaps} 
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </>
          )}

          {/* STEP 3 — Quote Form */}
          {step === 3 && !submitted && (
            <div className="cz-quote-form-wrap">
              <h2>Your Configuration</h2>
              <div className="cz-config-summary">
                <div className="cz-config-row"><span>Bottle</span><strong>{bottle?.name} ({bottle?.size})</strong></div>
                {pump && <div className="cz-config-row"><span>Pump</span><strong>{pump.name}</strong></div>}
                {cap  && <div className="cz-config-row"><span>Cap</span><strong>{cap.name}</strong></div>}
              </div>
              <form className="cz-quote-form" onSubmit={handleSubmit}>
                <div className="cz-quantities-grid">
                  <label>
                    Bottle Qty
                    <input type="number" min="0" value={bottleQty} onChange={e => setBottleQty(+e.target.value)} />
                  </label>
                  {cap && (
                    <label>
                      Cap Qty
                      <input type="number" min="0" value={capQty} onChange={e => setCapQty(+e.target.value)} />
                    </label>
                  )}
                  {pump && (
                    <label>
                      Pump Qty
                      <input type="number" min="0" value={pumpQty} onChange={e => setPumpQty(+e.target.value)} />
                    </label>
                  )}
                </div>
                <label>Your Name *
                  <input required placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>Email
                  <input type="email" placeholder="email@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                  Phone
                  <div className="cz-phone-input">
                    <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                      {countryCodes.map(c => (
                        <option key={c.code} value={c.code}>{c.name} {c.code}</option>
                      ))}
                    </select>
                    <input placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </label>
                <label>Message
                  <textarea rows="3" placeholder="Any special requirements…" value={message} onChange={e => setMessage(e.target.value)} />
                </label>
                <button type="submit" className="cz-submit-btn" disabled={submitting}>
                  <Send size={15} /> {submitting ? 'Sending…' : 'Send Quote Request'}
                </button>
              </form>
            </div>
          )}

          {/* Success */}
          {step === 3 && submitted && (
            <div className="cz-success">
              <div className="cz-success-icon">✓</div>
              <h2>Quote Submitted!</h2>
              <p>Thank you {name}! Our team will contact you within 24 hours with pricing details for your configuration.</p>
              <button className="cz-reset-btn" onClick={reset}><RotateCcw size={15} /> Start New Design</button>
            </div>
          )}

          {/* Nav buttons */}
          <div className="cz-nav-btns sticky">
            {step > 0 && !submitted && (
              <button className="cz-btn-back" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            {step === 1 && (
              <button className="cz-btn-skip" onClick={() => setStep(2)}>Skip Pump →</button>
            )}
            {step < 3 && (
              <button
                className="cz-btn-next"
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
              >
                {step === 2 ? 'Review & Quote' : 'Next'} <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT: Assembly preview ── */}
        <div 
          className="cz-preview" 
          style={{ 
            backgroundImage: `url(${pump ? '/bg2.png' : bottle ? '/bg1.png' : '/bg.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="cz-preview-content">
            <div className="cz-assembly">
            {/* Cap layer — top */}
            <div className={`cz-layer cz-layer-cap ${cap ? 'has-item' : ''}`}>
              {cap
                ? <img src={cap.imageUrl} alt={cap.name} />
                : <div className="cz-placeholder">Cap</div>}
            </div>

            {/* Pump layer — middle */}
            <div className={`cz-layer cz-layer-pump ${pump ? 'has-item' : ''}`}>
              {pump
                ? <img src={pump.imageUrl} alt={pump.name} />
                : <div className="cz-placeholder-sm">Pump (optional)</div>}
            </div>

            {/* Bottle layer — main */}
            <div className={`cz-layer cz-layer-bottle ${bottle ? 'has-item' : ''}`}>
              {bottle
                ? <img src={bottle.imageUrl} alt={bottle.name} />
                : <div className="cz-placeholder-lg">Select a Bottle</div>}
            </div>
          </div>
          </div>

          {/* Labels */}
          {(bottle || cap || pump) && (
            <div className="cz-preview-labels">
              {bottle && <span className="cz-label-tag">{bottle.name} · {bottle.size}</span>}
              {pump   && <span className="cz-label-tag">{pump.name}</span>}
              {cap    && <span className="cz-label-tag">{cap.name} cap</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
