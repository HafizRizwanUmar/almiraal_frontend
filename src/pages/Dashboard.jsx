import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, Edit, Save, X, Package, Box, Cylinder, FileText,
  LayoutDashboard, LogOut, ChevronRight, BarChart3, Users, Clock, RotateCcw, Menu
} from 'lucide-react';
import './Dashboard.css';

const API = import.meta.env.VITE_API_URL || '';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Data
  const [products, setProducts] = useState([]);
  const [customizeItems, setCustomizeItems] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [assetTab, setAssetTab] = useState('bottle'); // Sub-tab for Customize Studio

  // Forms
  const [productForm, setProductForm] = useState({
    name: '', category: 'Perfume Bottle', filter: 'Standard', description: '', imageUrl: '', hoverImageUrl: '', specifications: '', pdfUrl: '', size: '100ml'
  });
  const [customizeForm, setCustomizeForm] = useState({
    type: 'bottle', name: '', size: '100ml', imageUrl: '', isActive: true
  });
  const [editId, setEditId] = useState(null);

  const categories = [
    'Perfume Bottle', 'Perfume Cap', 'Pump & Collar', 'Mini Set',
    'Diffuser', 'Plastic Sprayer', 'Serum Bottle', 'Cream Jar', 'Car Perfume'
  ];

  useEffect(() => {
    // Security Check
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [activeTab, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const pRes = await fetch(`${API}/api/products`);
      if (pRes.ok) {
        const data = await pRes.json();
        setProducts(Array.isArray(data) ? data : []);
      }

      const cRes = await fetch(`${API}/api/customize-items`);
      if (cRes.ok) {
        const data = await cRes.json();
        setCustomizeItems(Array.isArray(data) ? data : []);
      }

      const qRes = await fetch(`${API}/api/quotes`);
      if (qRes.ok) {
        const data = await qRes.json();
        setQuotes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // --- CRUD Logic ---
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.imageUrl) {
      alert('Please upload a primary product image before saving.');
      return;
    }
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/api/products/${editId}` : `${API}/api/products`;
    const payload = { ...productForm };
    delete payload._id;
    delete payload.__v;
    delete payload.createdAt;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchData();
        resetProductForm();
      } else {
        const errorData = await res.json();
        alert(`Failed to save product: ${errorData.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred while saving the product.');
    }
  };

  const resetProductForm = () => {
    setProductForm({ name: '', category: 'Perfume Bottle', filter: 'Standard', description: '', imageUrl: '', hoverImageUrl: '', specifications: '', pdfUrl: '', size: '100ml' });
    setEditId(null);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await fetch(`${API}/api/products/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const updateQuoteStatus = async (id, status) => {
    await fetch(`${API}/api/quotes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchData();
  };

  const deleteQuote = async (id) => {
    if (window.confirm('Delete this quote record?')) {
      await fetch(`${API}/api/quotes/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const handleFileUpload = async (file, field, formType = 'product') => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API}/api/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const { url } = await res.json();
        if (formType === 'product') {
          setProductForm(prev => ({ ...prev, [field]: url }));
        } else {
          setCustomizeForm(prev => ({ ...prev, [field]: url }));
        }
      }
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="db-layout">
      {/* ── SIDEBAR ── */}
      <aside className={`db-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="db-logo">
          <img src="/logo-final.png" alt="Al Miraal" />
          <span>ADMIN</span>
          <button className="mobile-close" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
        </div>

        <nav className="db-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}>
            <LayoutDashboard size={20} /> <span>Overview</span>
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}>
            <Package size={20} /> <span>Product Catalog</span>
          </button>
          <button className={activeTab === 'customize' ? 'active' : ''} onClick={() => { setActiveTab('customize'); setIsSidebarOpen(false); }}>
            <Box size={20} /> <span>Custom Studio</span>
          </button>
          <button className={activeTab === 'quotes' ? 'active' : ''} onClick={() => { setActiveTab('quotes'); setIsSidebarOpen(false); }}>
            <FileText size={20} /> <span>Quote Requests</span>
          </button>
        </nav>

        <button className="db-logout" onClick={handleLogout}>
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="db-main">
        <header className="db-header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="header-info">
              <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              <p>Welcome back, Admin</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-refresh" onClick={fetchData}><RotateCcw size={16} /></button>
          </div>
        </header>

        <div className="db-scroll-area">

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="overview-container fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon p-bg"><Package /></div>
                  <div className="stat-data">
                    <h3>{products.length}</h3>
                    <span>Total Products</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon q-bg"><FileText /></div>
                  <div className="stat-data">
                    <h3>{quotes.length}</h3>
                    <span>New Quotes</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon c-bg"><Box /></div>
                  <div className="stat-data">
                    <h3>{customizeItems.length}</h3>
                    <span>Studio Assets</span>
                  </div>
                </div>
              </div>

              <div className="recent-quotes">
                <h2>Recent Quote Inquiries</h2>
                <div className="db-table-wrap">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.slice(0, 5).map(q => (
                        <tr key={q._id}>
                          <td><strong>{q.customerName}</strong><br /><small>{q.email}</small></td>
                          <td>{q.bottleName}</td>
                          <td>{q.quantity}</td>
                          <td><span className={`badge ${q.status}`}>{q.status}</span></td>
                          <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="products-container fade-in">
              <div className="db-form-card">
                <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleProductSubmit} className="db-form">
                  <div className="form-row">
                    <input type="text" placeholder="Product Name" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
                    <input type="text" placeholder="Filter/Sub-category (e.g. Standard)" value={productForm.filter} onChange={e => setProductForm({ ...productForm, filter: e.target.value })} required />
                  </div>
                  <div className="form-item">
                    <label>Category</label>
                    <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group-wrap">
                    <div className="form-item">
                      <label>Primary Product Image</label>
                      <div className="file-input-group">
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files[0], 'imageUrl')} />
                        {productForm.imageUrl && <span className="file-status">✓ Uploaded</span>}
                      </div>
                    </div>
                    <div className="form-item">
                      <label>Hover Image (Optional)</label>
                      <div className="file-input-group">
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files[0], 'hoverImageUrl')} />
                        {productForm.hoverImageUrl && <span className="file-status">✓ Uploaded</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group-wrap">
                    <div className="form-item">
                      <label>Technical Specs (PDF)</label>
                      <div className="file-input-group">
                        <input type="file" accept=".pdf" onChange={e => handleFileUpload(e.target.files[0], 'pdfUrl')} />
                        {productForm.pdfUrl && <span className="file-status">✓ PDF Uploaded</span>}
                      </div>
                    </div>
                    <div className="form-item">
                      <label>Bottle Size</label>
                      <select value={productForm.size || '100ml'} onChange={e => setProductForm({ ...productForm, size: e.target.value })}>
                        <option value="100ml">100ml</option>
                        <option value="50ml">50ml</option>
                        <option value="N/A">N/A (Non-bottle)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-item">
                    <label>Product Description</label>
                    <textarea placeholder="Write product details here..." value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} rows="4"></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">{editId ? 'Update Product' : 'Save Product'}</button>
                    {editId && <button type="button" onClick={resetProductForm} className="btn-secondary">Cancel</button>}
                  </div>
                </form>
              </div>

              <div className="db-table-wrap">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td><img src={p.imageUrl} className="row-img" alt="" /></td>
                        <td>{p.name}</td>
                        <td><span className="cat-tag">{p.category}</span></td>
                        <td>
                          <div className="row-actions">
                            <button onClick={() => { setEditId(p._id); setProductForm(p); window.scrollTo(0, 0); }}><Edit size={16} /></button>
                            <button onClick={() => deleteProduct(p._id)} className="text-red"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* QUOTES TAB */}
          {activeTab === 'quotes' && (
            <div className="quotes-container fade-in">
              <div className="db-table-wrap">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer Info</th>
                      <th>Selection</th>
                      <th>Qty</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map(q => (
                      <tr key={q._id}>
                        <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                        <td>
                          <strong>{q.customerName}</strong><br />
                          <small>{q.email}</small><br />
                          <small>{q.phone}</small>
                        </td>
                        <td>
                          <div className="config-mini">
                            <span>Bottle: {q.bottleName}</span>
                            <span>Cap: {q.capName}</span>
                          </div>
                        </td>
                        <td>{q.quantity}</td>
                        <td>
                          <select
                            value={q.status}
                            onChange={e => updateQuoteStatus(q._id, e.target.value)}
                            className={`status-select ${q.status}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <button onClick={() => deleteQuote(q._id)} className="text-red"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOMIZE TAB */}
          {activeTab === 'customize' && (
            <div className="customize-container fade-in">
              <div className="db-form-card">
                <h2>{editId ? 'Edit Asset' : 'Add New Studio Asset'}</h2>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!customizeForm.imageUrl) {
                    alert('Please upload an asset image before saving.');
                    return;
                  }
                  const method = editId ? 'PUT' : 'POST';
                  const url = editId ? `${API}/api/customize-items/${editId}` : `${API}/api/customize-items`;
                  const payload = { ...customizeForm };
                  delete payload._id;
                  delete payload.__v;
                  delete payload.createdAt;

                  try {
                    const res = await fetch(url, {
                      method,
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                      fetchData();
                      setCustomizeForm({ type: 'bottle', name: '', size: '100ml', imageUrl: '', isActive: true });
                      setEditId(null);
                    } else {
                      const errorData = await res.json();
                      alert(`Failed to save asset: ${errorData.error}`);
                    }
                  } catch (err) {
                    console.error(err);
                    alert('An unexpected error occurred while saving the asset.');
                  }
                }} className="db-form">
                  <div className="form-group-wrap">
                    <div className="form-item">
                      <label>Asset Type</label>
                      <select value={customizeForm.type} onChange={e => setCustomizeForm({ ...customizeForm, type: e.target.value })}>
                        <option value="bottle">Bottle</option>
                        <option value="cap">Cap</option>
                        <option value="pump">Pump</option>
                      </select>
                    </div>
                    <div className="form-item">
                      <label>Asset Name</label>
                      <input type="text" placeholder="e.g. Luxury Gold Cap" value={customizeForm.name} onChange={e => setCustomizeForm({ ...customizeForm, name: e.target.value })} required />
                    </div>
                  </div>

                  <div className="form-group-wrap">
                    <div className="form-item">
                      <label>Asset Image (Transparent PNG)</label>
                      <div className="file-input-group">
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files[0], 'imageUrl', 'customize')} />
                        {customizeForm.imageUrl && <span className="file-status">✓ Image Ready</span>}
                      </div>
                    </div>
                    <div className="form-item">
                      <label>Default Size (for Bottles)</label>
                      <select value={customizeForm.size} onChange={e => setCustomizeForm({ ...customizeForm, size: e.target.value })}>
                        <option value="100ml">100ml</option>
                        <option value="50ml">50ml</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">{editId ? 'Update Asset' : 'Add Asset'}</button>
                    {editId && <button type="button" onClick={() => { setEditId(null); setCustomizeForm({ type: 'bottle', name: '', size: '100ml', imageUrl: '', isActive: true }); }} className="btn-secondary">Cancel</button>}
                  </div>
                </form>
              </div>

              <div className="asset-tabs">
                <button className={assetTab === 'bottle' ? 'active' : ''} onClick={() => setAssetTab('bottle')}>Bottles</button>
                <button className={assetTab === 'pump' ? 'active' : ''} onClick={() => setAssetTab('pump')}>Pumps</button>
                <button className={assetTab === 'cap' ? 'active' : ''} onClick={() => setAssetTab('cap')}>Caps</button>
              </div>

              <div className="asset-section">
                <h3 className="section-title">{assetTab.charAt(0).toUpperCase() + assetTab.slice(1)}s</h3>
                <div className="db-table-wrap">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customizeItems.filter(item => item.type === assetTab).map(item => (
                        <tr key={item._id}>
                          <td><img src={item.imageUrl} className="row-img" alt="" /></td>
                          <td>{item.name}</td>
                          <td>{item.size || 'N/A'}</td>
                          <td>
                            <div className="row-actions">
                              <button onClick={() => { setEditId(item._id); setCustomizeForm(item); window.scrollTo(0, 0); }}><Edit size={16} /></button>
                              <button onClick={async () => { if (window.confirm('Delete asset?')) { await fetch(`${API}/api/customize-items/${item._id}`, { method: 'DELETE' }); fetchData(); } }} className="text-red"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {customizeItems.filter(item => item.type === assetTab).length === 0 && (
                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No {assetTab}s added yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
