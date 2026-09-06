import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);
  const stockQty = Number(product.availableQuantity ?? product.stockQuantity ?? product.stock ?? 0);
  const inStock = stockQty > 0;

  const renderStockBadge = () => {
    if (stockQty > 10) {
      return <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginLeft: 'auto' }}>In Stock: {stockQty}</span>;
    } else if (stockQty > 0) {
      return <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, marginLeft: 'auto' }}>Only {stockQty} left</span>;
    } else {
      return <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700, marginLeft: 'auto' }}>Out of Stock</span>;
    }
  };

  const discountPercent = product.discountPrice
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : 0;

  const imgUrl = product.imageUrl || '/products/accessories/ant-esports-mousepad.jpg';

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart(product, 1);
      navigate('/checkout');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = '#cbd5e1';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      {/* Wishlist Icon */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '50%',
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isLiked ? '#dc2626' : '#94a3b8',
          zIndex: 2,
          transition: 'all 0.15s ease'
        }}
      >
        <Heart size={16} fill={isLiked ? '#dc2626' : 'none'} />
      </button>

      {/* Product Image Focus */}
      <Link
        to={`/products/${product.id}`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#ffffff',
          borderRadius: '8px'
        }}
      >
        <img
          src={imgUrl}
          alt={product.name}
          onError={(e) => { e.currentTarget.src = '/products/accessories/ant-esports-mousepad.svg'; }}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'contain',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        />
      </Link>

      {/* Brand */}
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
        {product.brand}
      </div>

      {/* Product Title */}
      <Link
        to={`/products/${product.id}`}
        style={{
          textDecoration: 'none',
          color: '#0f172a',
          fontSize: '0.95rem',
          fontWeight: 700,
          lineHeight: '1.4',
          marginBottom: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1
        }}
      >
        {product.name}
      </Link>

      {/* Rating & Review Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span className="rating-pill">
          {product.rating || 4.8} <Star size={10} fill="#ffffff" color="#ffffff" />
        </span>
        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>(24 reviews)</span>
        {renderStockBadge()}
      </div>

      {/* Price Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
          {product.discountPrice && (
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
              ₹{product.discountPrice?.toLocaleString('en-IN')}
            </span>
          )}
          {discountPercent > 0 && (
            <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, marginLeft: 'auto' }}>
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Refined Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 1); }}
            disabled={!inStock}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center', opacity: inStock ? 1 : 0.5 }}
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!inStock}
            className="btn-primary"
            style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center', opacity: inStock ? 1 : 0.5 }}
          >
            <Zap size={14} /> Buy Now
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
