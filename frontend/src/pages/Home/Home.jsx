import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight, Zap, RefreshCw, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { getProducts } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Section 13 Curated Product Groupings
  const featured = products.slice(0, 4);
  const bestSellers = products.filter(p => p.price > 10000).slice(0, 4);
  const budgetPicks = products.filter(p => p.price <= 2000);
  const pcComponents = products.filter(p => ['CPU', 'GPU', 'MOTHERBOARD', 'RAM', 'SSD', 'HDD', 'PSU', 'CASE'].includes(p.categoryName)).slice(0, 4);
  const peripherals = products.filter(p => ['MONITOR', 'KEYBOARD', 'MOUSE', 'HEADSET', 'ACCESSORIES'].includes(p.categoryName)).slice(0, 4);

  return (
    <div style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      
      {/* Premium Hero Banner */}
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '16px',
          padding: '44px 40px',
          color: '#ffffff',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(15,23,42,0.12)'
        }}
      >
        <div>
          <span style={{ backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.8rem', fontWeight: 800, padding: '4px 12px', borderRadius: '6px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '14px', letterSpacing: '0.5px' }}>
            Curated PC Hardware Marketplace
          </span>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Build Your Custom PC with Precision
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px', maxWidth: '500px' }}>
            Shop verified authentic hardware starting from ₹199. Fully tested compatibility, official warranty, and express shipping across India.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/pc-builder" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              <Cpu size={18} /> Launch PC Builder
            </Link>
            <Link to="/products" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              Browse Catalog <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
          <img
            src="/products/case/nzxt-h9-flow.jpg"
            alt="PCForge Custom Gaming Desktop PC"
            onError={(e) => { e.currentTarget.src = '/products/accessories/ant-esports-mousepad.jpg'; }}
            style={{ width: '100%', maxWidth: '340px', height: 'auto', borderRadius: '12px', backgroundColor: '#ffffff', padding: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
          <RefreshCw size={28} color="#2563eb" className="spin" style={{ marginBottom: '14px' }} />
          <div>Loading curated PC hardware catalog...</div>
        </div>
      ) : (
        <>
          {/* Section 13: Featured Products */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800 }}>Featured Products</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Hand-picked top tier components for your build</p>
              </div>
              <Link to="/products" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                View All Catalog
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Section 13: Budget Picks (₹199 – ₹2,000) */}
          {budgetPicks.length > 0 && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ padding: '8px', backgroundColor: '#dcfce7', borderRadius: '8px', color: '#16a34a' }}>
                    <Tag size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800 }}>Budget Picks (From ₹199)</h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Affordable gear, mousepads, cables & peripherals</p>
                  </div>
                </div>
                <Link to="/products?category=ACCESSORIES" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                  Shop Accessories
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {budgetPicks.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Section 13: PC Components */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800 }}>Core PC Components</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>CPUs, GPUs, Motherboards, RAM & NVMe SSDs</p>
              </div>
              <Link to="/products?category=CPU" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                Explore Components
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {pcComponents.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Section 13: Monitors & Peripherals */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 800 }}>Monitors & Peripherals</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Displays, mechanical keyboards, gaming mice & headsets</p>
              </div>
              <Link to="/products?category=MONITOR" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                Shop Gear
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {peripherals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Value Proposition Badges */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <ShieldCheck size={32} color="#2563eb" />
          <div>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>100% Original Products</strong>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Official manufacturer brand warranty</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Zap size={32} color="#eab308" />
          <div>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>Express Insured Delivery</strong>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Fast 3-day delivery across India</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Cpu size={32} color="#16a34a" />
          <div>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>PC Builder Tool</strong>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Live socket & wattage compatibility</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
