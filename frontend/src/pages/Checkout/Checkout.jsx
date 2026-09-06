import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, QrCode, Truck, ArrowRight, ShieldCheck, CheckCircle, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, grandTotal, subtotal, discount, shipping } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState({
    fullName: user?.fullName || 'Alex Johnson',
    phone: user?.phone || '+91 98765 43210',
    street: user?.address || 'Flat 402, HighTech Towers, IT Corridor',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipCode: '600001',
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI_QR');

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    localStorage.setItem('pcforge_checkout_address', JSON.stringify(address));
    localStorage.setItem('pcforge_checkout_method', paymentMethod);
    navigate('/payment');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
          Checkout & Shipping Details
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>
          Verify your delivery location and select payment option to complete your PCForge order.
        </p>
      </div>

      <form onSubmit={handleProceedToPayment} style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
        
        {/* Left Column: Delivery Address & Payment Method */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* 1. Shipping Address Box */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="#2563eb" /> 1. Delivery Address
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter recipient name"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat No., Building Name, Street"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>PIN Code</label>
                <input
                  type="text"
                  required
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Picker */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={20} color="#2563eb" /> 2. Preferred Payment Mode
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Option 1: UPI QR */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px',
                  borderRadius: '12px',
                  border: paymentMethod === 'UPI_QR' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                  backgroundColor: paymentMethod === 'UPI_QR' ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input type="radio" name="pay" checked={paymentMethod === 'UPI_QR'} onChange={() => setPaymentMethod('UPI_QR')} style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={24} color="#2563eb" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem' }}>GPay / PhonePe / Paytm UPI QR</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem' }}>Instant QR Code scan & sandbox checkout</div>
                </div>
              </label>

              {/* Option 2: Credit/Debit Card */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px',
                  borderRadius: '12px',
                  border: paymentMethod === 'CREDIT_CARD' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                  backgroundColor: paymentMethod === 'CREDIT_CARD' ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input type="radio" name="pay" checked={paymentMethod === 'CREDIT_CARD'} onChange={() => setPaymentMethod('CREDIT_CARD')} style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={24} color="#4f46e5" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem' }}>Credit / Debit Card / Net Banking</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem' }}>Visa, Mastercard, RuPay & all major banks</div>
                </div>
              </label>

              {/* Option 3: Cash on Delivery */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px',
                  borderRadius: '12px',
                  border: paymentMethod === 'CASH_ON_DELIVERY' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                  backgroundColor: paymentMethod === 'CASH_ON_DELIVERY' ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input type="radio" name="pay" checked={paymentMethod === 'CASH_ON_DELIVERY'} onChange={() => setPaymentMethod('CASH_ON_DELIVERY')} style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={24} color="#16a34a" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem' }}>Cash On Delivery (COD)</div>
                  <div style={{ color: '#64748b', fontSize: '0.82rem' }}>Pay cash upon arrival of your hardware</div>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Pricing */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
          height: 'fit-content'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
            Order Summary ({cart.length} Items)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.imageUrl || '/products/accessories/ant-esports-mousepad.png'}
                    alt={item.name}
                    style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
                  />
                  <span style={{ color: '#334155', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>
                    {item.quantity || 1}x {item.name}
                  </span>
                </div>
                <strong style={{ color: '#0f172a' }}>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
              <span>Items Total</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
                <span>Discount Applied</span>
                <span>- ₹{Math.round(discount).toLocaleString('en-IN')}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
              <span>Shipping Fee</span>
              {shipping === 0 ? (
                <span style={{ color: '#16a34a', fontWeight: 800 }}>FREE</span>
              ) : (
                <span style={{ color: '#0f172a', fontWeight: 600 }}>₹{shipping}</span>
              )}
            </div>

            <div style={{ borderTop: '1.5px solid #e2e8f0', margin: '8px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
              <span>Grand Total</span>
              <span style={{ color: '#2563eb' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {shipping === 0 && (
              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0fdf4', padding: '8px 12px', borderRadius: '8px', border: '1px solid #bbf7d0', marginTop: '6px' }}>
                <CheckCircle size={16} /> Eligible for Free Express Courier Shipping
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
              marginTop: '24px',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Lock size={18} color="#38bdf8" />
            Proceed to Payment <ArrowRight size={18} />
          </button>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
