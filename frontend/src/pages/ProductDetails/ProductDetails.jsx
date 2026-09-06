import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ShieldCheck, Check, ArrowLeft, Truck, RefreshCw, AlertCircle } from 'lucide-react';
import { getProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("Failed to fetch product details", err);
      setError("Unable to load product from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const isLiked = product ? isInWishlist(product.id) : false;
  const stockQty = product ? (product.stockQuantity ?? product.availableQuantity ?? product.stock ?? 10) : 0;
  const inStock = stockQty > 0;

  const parsedSpecs = React.useMemo(() => {
    if (!product || !product.specifications) return {};
    try {
      return typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications;
    } catch (e) {
      return {};
    }
  }, [product]);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: '#6b7280' }}>
        <RefreshCw size={32} color="#2563eb" className="spin" style={{ marginBottom: '16px' }} />
        <div>Loading hardware specifications...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #fecaca', borderRadius: '16px', padding: '40px' }}>
          <AlertCircle size={44} color="#dc2626" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: '#dc2626', marginBottom: '8px' }}>Product Not Found</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>{error || "The requested item could not be retrieved."}</p>
          <Link to="/products" className="btn-primary">Return to Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }}>
      
      <Link to="/products" style={{ color: '#6b7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 500 }}>
        <ArrowLeft size={16} /> Back to Hardware Store
      </Link>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '48px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        {/* Large Product Photography */}
        <div style={{ textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '16px', padding: '32px', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.imageUrl || '/products/product-placeholder.jpg'}
            alt={product.name}
            onError={(e) => { e.currentTarget.src = '/products/product-placeholder.jpg'; }}
            style={{ width: '100%', maxWidth: '420px', height: '360px', objectFit: 'contain' }}
          />
        </div>

        {/* Info & Specifications */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.brand} • {product.categoryName || product.category}
            </span>
            <span style={{ color: inStock ? '#16a34a' : '#dc2626', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={14} /> Available: {stockQty} units
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', lineHeight: '1.25', marginBottom: '14px', letterSpacing: '-0.02em' }}>
            {product.name}
          </h1>

          {/* Star Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>{product.rating || 5.0}</span>
            <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>(42 customer reviews)</span>
          </div>

          {/* Pricing Box */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#111827' }}>
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span style={{ fontSize: '1.15rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                ₹{product.discountPrice?.toLocaleString('en-IN')}
              </span>
            )}
            <span style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 700, marginLeft: 'auto' }}>
              Inclusive of GST & Invoice
            </span>
          </div>

          <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '28px' }}>
            {product.description}
          </p>

          {/* Specs Table */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ color: '#111827', fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Key Hardware Specs</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {Object.entries(parsedSpecs).map(([key, val]) => (
                <div key={key} style={{ backgroundColor: '#f9fafb', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem' }}>
                  <span style={{ color: '#6b7280', textTransform: 'capitalize' }}>{key.replace('_', ' ')}: </span>
                  <strong style={{ color: '#111827' }}>{String(val)}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={!inStock || quantity <= 1} style={{ padding: '10px 14px', background: 'none', border: 'none', color: '#111827', cursor: 'pointer', fontWeight: 700 }}>-</button>
              <span style={{ padding: '0 12px', color: '#111827', fontWeight: 700 }}>{inStock ? quantity : 0}</span>
              <button onClick={() => setQuantity(Math.min(stockQty, quantity + 1))} disabled={!inStock || quantity >= stockQty} style={{ padding: '10px 14px', background: 'none', border: 'none', color: '#111827', cursor: 'pointer', fontWeight: 700 }}>+</button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              disabled={!inStock}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '0.95rem', opacity: inStock ? 1 : 0.4 }}
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="btn-secondary"
              style={{ padding: '14px 24px', opacity: inStock ? 1 : 0.4 }}
            >
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', color: isLiked ? '#dc2626' : '#9ca3af', cursor: 'pointer' }}
            >
              <Heart size={20} fill={isLiked ? '#dc2626' : 'none'} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', color: '#6b7280', fontSize: '0.8rem', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#2563eb" /> 3-Year Official Brand Warranty</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Truck size={16} color="#2563eb" /> Insured Free Delivery</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
