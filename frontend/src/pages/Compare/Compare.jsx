import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, AlertCircle } from 'lucide-react';
import { getProducts } from '../../services/api';

const Compare = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('CPU');
  const [item1, setItem1] = useState(null);
  const [item2, setItem2] = useState(null);

  const fetchCompareProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
      const cpus = data.filter((p) => (p.categoryName || p.category || '').toUpperCase() === 'CPU');
      if (cpus.length >= 2) {
        setItem1(cpus[0]);
        setItem2(cpus[1]);
      } else if (data.length >= 2) {
        setItem1(data[0]);
        setItem2(data[1]);
      }
    } catch (err) {
      console.error("Failed to load products for comparison", err);
      setError("Unable to connect to Product Service via Gateway.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompareProducts();
  }, []);

  const itemsForCategory = React.useMemo(() => {
    return products.filter((p) => (p.categoryName || p.category || '').toUpperCase() === category);
  }, [products, category]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const filtered = products.filter((p) => (p.categoryName || p.category || '').toUpperCase() === newCat);
    if (filtered.length >= 2) {
      setItem1(filtered[0]);
      setItem2(filtered[1]);
    } else {
      setItem1(filtered[0] || null);
      setItem2(filtered[1] || null);
    }
  };

  return (
    <div style={{ padding: '0 20px', maxWidth: '1100px', margin: '30px auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#fff' }} className="brand-font">
          Hardware <span className="neon-text-cyan">Compare</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
          Side-by-side specification & price benchmark comparison from MySQL database.
        </p>

        {/* Category Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          {['CPU', 'GPU', 'MOTHERBOARD', 'RAM'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={category === cat ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <RefreshCw size={28} color="var(--accent-cyan)" className="spin" style={{ marginBottom: '12px' }} />
          <div>Loading comparison data from MySQL...</div>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--accent-red)' }}>
          <AlertCircle size={36} color="var(--accent-red)" style={{ marginBottom: '12px' }} />
          <div>{error}</div>
        </div>
      ) : (
        <div>
          {/* Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '30px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Select Component 1</label>
              <select
                value={item1?.id || ''}
                onChange={(e) => setItem1(itemsForCategory.find((i) => i.id === Number(e.target.value)))}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-card)', background: 'rgba(10,12,16,0.9)', color: '#fff' }}
              >
                {itemsForCategory.map((i) => (
                  <option key={i.id} value={i.id}>{i.brand} - {i.name}</option>
                ))}
              </select>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Select Component 2</label>
              <select
                value={item2?.id || ''}
                onChange={(e) => setItem2(itemsForCategory.find((i) => i.id === Number(e.target.value)))}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-card)', background: 'rgba(10,12,16,0.9)', color: '#fff' }}
              >
                {itemsForCategory.map((i) => (
                  <option key={i.id} value={i.id}>{i.brand} - {i.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Side by Side Comparison Table */}
          {item1 && item2 && (
            <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-muted)' }}>Specification</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-cyan)' }}>{item1.name}</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-purple)' }}>{item2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>Image</td>
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      <img
                        src={item1.imageUrl || '/products/product-placeholder.jpg'}
                        alt={item1.name}
                        onError={(e) => { e.currentTarget.src = '/products/product-placeholder.jpg'; }}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </td>
                    <td style={{ padding: '14px', textAlign: 'center' }}>
                      <img
                        src={item2.imageUrl || '/products/product-placeholder.jpg'}
                        alt={item2.name}
                        onError={(e) => { e.currentTarget.src = '/products/product-placeholder.jpg'; }}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>Brand</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontWeight: 700 }}>{item1.brand}</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontWeight: 700 }}>{item2.brand}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>Price</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontWeight: 800, color: item1.price <= item2.price ? 'var(--accent-green)' : '#fff' }}>
                      ₹{item1.price?.toLocaleString('en-IN')} {item1.price <= item2.price && '★ Best Price'}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'center', fontWeight: 800, color: item2.price <= item1.price ? 'var(--accent-green)' : '#fff' }}>
                      ₹{item2.price?.toLocaleString('en-IN')} {item2.price <= item1.price && '★ Best Price'}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>Rating</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontWeight: 700 }}>{item1.rating || 5.0} / 5.0</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontWeight: 700 }}>{item2.rating || 5.0} / 5.0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>Availability</td>
                    <td style={{ padding: '14px', textAlign: 'center', color: 'var(--accent-green)' }}>In Stock ({item1.stockQuantity ?? 10})</td>
                    <td style={{ padding: '14px', textAlign: 'center', color: 'var(--accent-green)' }}>In Stock ({item2.stockQuantity ?? 10})</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px', color: 'var(--text-muted)' }}>Description</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item1.description}</td>
                    <td style={{ padding: '14px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item2.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Compare;
