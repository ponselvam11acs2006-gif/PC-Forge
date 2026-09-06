import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, RotateCcw } from 'lucide-react';
import { getProducts } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState('DEFAULT');

  const categories = ['ALL', 'CPU', 'GPU', 'MOTHERBOARD', 'MONITOR', 'RAM', 'SSD', 'HDD', 'PSU', 'CASE', 'KEYBOARD', 'MOUSE', 'HEADSET', 'ACCESSORIES'];
  const brands = ['ALL', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte', 'ZOTAC', 'Dell', 'Lenovo', 'Corsair', 'G.Skill', 'Kingston', 'Samsung', 'WD', 'Seagate', 'Cooler Master', 'NZXT', 'Logitech', 'Zebronics', 'HyperX', 'Razer', 'Ant Esports', 'PCForge'];

  const fetchProductsFromApi = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.warn("Fallback to catalog data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  // Update selectedCategory if URL search parameter changes
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setSelectedCategory(catFromUrl);
    }
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchKeyword(searchFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const catName = (product.categoryName || product.category || '').toUpperCase();
      const selCat = selectedCategory.toUpperCase();

      const matchCategory = selCat === 'ALL' || catName === selCat || catName.includes(selCat);
      const matchBrand = selectedBrand === 'ALL' || (product.brand || '').toUpperCase() === selectedBrand.toUpperCase();
      const matchSearch = !searchKeyword || (product.name || '').toLowerCase().includes(searchKeyword.toLowerCase()) || (product.brand || '').toLowerCase().includes(searchKeyword.toLowerCase()) || catName.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchPrice = (product.price || 0) <= maxPrice;
      return matchCategory && matchBrand && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      if (sortBy === 'RATING') return (b.rating || 5) - (a.rating || 5);
      return 0;
    });
  }, [products, selectedCategory, selectedBrand, searchKeyword, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedBrand('ALL');
    setSearchKeyword('');
    setMaxPrice(100000);
    setSortBy('DEFAULT');
    setSearchParams({});
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '28px auto', padding: '0 20px' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>
          Curated Hardware, Monitors & Peripherals Store
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
          Explore authentic gaming PC components & accessories starting from ₹199 to ₹99,999 with 100% brand warranty.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '28px' }}>
        
        {/* Filter Sidebar */}
        <aside style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', height: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} color="#2563eb" /> Filter Catalog
            </h3>
            <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Search Keyword */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>Search Keyword</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Ryzen, RTX 4070, Dell, Mousepad..."
                style={{ width: '100%', padding: '9px 30px 9px 12px', fontSize: '0.85rem' }}
              />
              <Search size={15} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
          </div>

          {/* Component Categories */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Categories</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: selectedCategory === cat ? '1px solid #2563eb' : '1px solid transparent',
                    backgroundColor: selectedCategory === cat ? '#eff6ff' : 'transparent',
                    color: selectedCategory === cat ? '#2563eb' : '#0f172a',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{ width: '100%', padding: '9px', fontSize: '0.85rem' }}
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Max Price Filter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
              <span>Max Price</span>
              <span style={{ color: '#2563eb' }}>₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="199"
              max="100000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
            />
          </div>

        </aside>

        {/* Products Main Grid */}
        <main>
          
          {/* Top Sort & Count Bar */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
              Showing <strong style={{ color: '#0f172a' }}>{filteredProducts.length}</strong> products
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 600 }}
              >
                <option value="DEFAULT">Featured</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
                <option value="RATING">Highest Rating</option>
              </select>
            </div>
          </div>

          {/* Loading or Grid */}
          {loading ? (
            <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
              <RefreshCw size={28} color="#2563eb" className="spin" style={{ marginBottom: '14px' }} />
              <div>Loading store catalog...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>No products match your selected filters</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Try resetting search keywords or expanding your budget range.</p>
              <button onClick={resetFilters} className="btn-primary">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

export default Products;
