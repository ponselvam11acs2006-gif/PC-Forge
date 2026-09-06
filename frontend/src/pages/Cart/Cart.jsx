import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, subtotal, discount, tax, shipping, grandTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '60px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <ShoppingBag size={48} color="#9ca3af" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Your Cart is Empty</h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '24px' }}>Explore processors, graphics cards, and memory components to start building.</p>
          <Link to="/products" className="btn-primary" style={{ padding: '12px 28px' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
          Shopping Cart ({cart.length} items)
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
        
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map((item) => (
            <div
              key={item.id || item.productId}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <img
                src={item.imageUrl || '/products/product-placeholder.jpg'}
                alt={item.name}
                onError={(e) => { e.currentTarget.src = '/products/product-placeholder.jpg'; }}
                style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#f9fafb', padding: '6px' }}
              />

              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>{item.brand}</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', margin: '2px 0 4px 0' }}>{item.name}</h4>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>₹{item.price?.toLocaleString('en-IN')} per unit</div>
              </div>

              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>-</button>
                <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>{item.quantity || 1}</span>
                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>+</button>
              </div>

              {/* Subtotal */}
              <div style={{ textAlign: 'right', minWidth: '90px' }}>
                <strong style={{ fontSize: '1.05rem', color: '#111827' }}>
                  ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                </strong>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '6px' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#4b5563', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <strong style={{ color: '#111827' }}>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>

            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Build Discount (5%)</span>
                <strong>-₹{discount.toLocaleString('en-IN')}</strong>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST (18%)</span>
              <strong style={{ color: '#111827' }}>₹{tax.toLocaleString('en-IN')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <strong style={{ color: shipping === 0 ? '#16a34a' : '#111827' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/payment')}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
          >
            Proceed to Checkout <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
