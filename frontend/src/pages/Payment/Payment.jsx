import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, CreditCard, ShieldCheck, CheckCircle2, AlertCircle, Lock, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrderApi } from '../../services/api';

const Payment = () => {
  const navigate = useNavigate();
  const { cart, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('UPI_QR');
  const [timer, setTimer] = useState(299);
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const [cardForm, setCardForm] = useState({
    name: user?.fullName || 'Alex Johnson',
    number: '4532 •••• •••• 8892',
    expiry: '12/28',
    cvv: '921'
  });

  useEffect(() => {
    if (timer > 0 && paymentMethod === 'UPI_QR') {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, paymentMethod]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSimulatePayment = async (success = true) => {
    setProcessing(true);
    setStatusMessage(null);

    setTimeout(async () => {
      if (success) {
        try {
          if (!user || (!user.id && !user.userId)) {
            setProcessing(false);
            setStatusMessage({ type: 'error', text: 'Authentication Required: Please log in to complete your order.' });
            return;
          }

          const realUserId = Number(user.id || user.userId);
          const savedAddress = localStorage.getItem('pcforge_checkout_address');
          const savedMethod = localStorage.getItem('pcforge_checkout_method');
          const addressObj = savedAddress ? JSON.parse(savedAddress) : null;
          const addressString = addressObj
            ? `${addressObj.fullName}, ${addressObj.street}, ${addressObj.city}, ${addressObj.state} - ${addressObj.zipCode}`
            : (user?.address || "Registered Address, IT Corridor, Chennai - 600001");

          const selectedMethod = paymentMethod || savedMethod || 'UPI_QR';

          const orderPayload = {
            userId: realUserId,
            totalAmount: Number(grandTotal),
            paymentMethod: selectedMethod,
            shippingAddress: addressString,
            status: "CONFIRMED",
            items: cart.map((item) => ({
              productId: Number(item.productId || item.id || 101),
              productName: item.name || item.productName || 'PC Component',
              price: Number(item.price || 0),
              quantity: Number(item.quantity || 1),
              totalPrice: Number(item.price || 0) * Number(item.quantity || 1)
            }))
          };

          const orderResponse = await createOrderApi(orderPayload);

          if (orderResponse && orderResponse.id) {
            clearCart();
            navigate(`/order-confirmed/${orderResponse.id}`, {
              state: {
                order: orderResponse
              }
            });
          } else {
            throw new Error("Invalid order response received from Order Service.");
          }
        } catch (err) {
          console.error("Order creation failed on backend:", err);
          setProcessing(false);
          setStatusMessage({
            type: 'error',
            text: err.response?.data?.message || err.message || 'Failed to create order on server. Please try again.'
          });
        }
      } else {
        setProcessing(false);
        setStatusMessage({ type: 'error', text: 'Transaction Failed: Payment authorization timed out or declined.' });
      }
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* Page Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          padding: '6px 16px',
          borderRadius: '20px',
          fontWeight: 700,
          fontSize: '0.82rem',
          marginBottom: '12px'
        }}>
          <ShieldCheck size={16} /> 256-BIT ENCRYPTED CHECKOUT
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
          Complete Your <span style={{ color: '#2563eb' }}>Payment</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
          Safe & Instant Sandbox Payment Gateway
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
        
        {/* Left Column: Payment Method Picker & Form */}
        <div>
          
          {/* Method Selection Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
            <button
              onClick={() => setPaymentMethod('UPI_QR')}
              style={{
                padding: '16px 12px',
                borderRadius: '12px',
                border: paymentMethod === 'UPI_QR' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                backgroundColor: paymentMethod === 'UPI_QR' ? '#eff6ff' : '#ffffff',
                color: paymentMethod === 'UPI_QR' ? '#2563eb' : '#334155',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <QrCode size={20} /> UPI / QR Code
            </button>

            <button
              onClick={() => setPaymentMethod('CREDIT_CARD')}
              style={{
                padding: '16px 12px',
                borderRadius: '12px',
                border: paymentMethod === 'CREDIT_CARD' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                backgroundColor: paymentMethod === 'CREDIT_CARD' ? '#eff6ff' : '#ffffff',
                color: paymentMethod === 'CREDIT_CARD' ? '#2563eb' : '#334155',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <CreditCard size={20} /> Card / Net Banking
            </button>

            <button
              onClick={() => setPaymentMethod('COD')}
              style={{
                padding: '16px 12px',
                borderRadius: '12px',
                border: paymentMethod === 'COD' ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                backgroundColor: paymentMethod === 'COD' ? '#eff6ff' : '#ffffff',
                color: paymentMethod === 'COD' ? '#2563eb' : '#334155',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <ShieldCheck size={20} /> Cash on Delivery
            </button>
          </div>

          {/* Active Payment Surface Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '36px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
          }}>
            
            {/* UPI QR Mode */}
            {paymentMethod === 'UPI_QR' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '6px 16px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 800, marginBottom: '24px' }}>
                  INSTANT SANDBOX UPI PAYMENT
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <div style={{ padding: '20px', backgroundColor: '#ffffff', border: '2px solid #2563eb', borderRadius: '20px', boxShadow: '0 12px 30px rgba(37,99,235,0.12)' }}>
                    <img
                      src="/images/cropped-qr.png"
                      alt="Payment QR Code Matrix"
                      onError={(e) => { e.currentTarget.src = '/images/user-upi-qr.png'; }}
                      style={{ width: '220px', height: '220px', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
                  Scan with GPay, PhonePe, Paytm or BHIM UPI app
                </div>

                <div style={{ fontSize: '0.92rem', color: '#0f172a', marginBottom: '28px', fontWeight: 700 }}>
                  QR session expires in: <span style={{ color: '#dc2626', fontWeight: 800 }}>{formatTimer(timer)}</span>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleSimulatePayment(true)}
                    disabled={processing}
                    style={{
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '13px 26px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(22, 163, 74, 0.2)',
                      opacity: processing ? 0.6 : 1
                    }}
                  >
                    <CheckCircle2 size={18} /> Simulate Payment Success
                  </button>

                  <button
                    onClick={() => handleSimulatePayment(false)}
                    disabled={processing}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#dc2626',
                      border: '1.5px solid #fecaca',
                      padding: '13px 20px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      opacity: processing ? 0.6 : 1
                    }}
                  >
                    <AlertCircle size={18} /> Simulate Failure
                  </button>
                </div>
              </div>
            )}

            {/* Credit / Debit Card Mode */}
            {paymentMethod === 'CREDIT_CARD' && (
              <form onSubmit={(e) => { e.preventDefault(); handleSimulatePayment(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Cardholder Name</label>
                  <input
                    type="text"
                    value={cardForm.name}
                    onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', color: '#0f172a', backgroundColor: '#f8fafc', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Card Number</label>
                  <input
                    type="text"
                    value={cardForm.number}
                    onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', color: '#0f172a', backgroundColor: '#f8fafc', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Expiry Date</label>
                    <input
                      type="text"
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', color: '#0f172a', backgroundColor: '#f8fafc', outline: 'none' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>CVV</label>
                    <input
                      type="password"
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', color: '#0f172a', backgroundColor: '#f8fafc', outline: 'none' }}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
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
                    boxShadow: '0 4px 14px rgba(15,23,42,0.15)',
                    marginTop: '8px',
                    opacity: processing ? 0.6 : 1
                  }}
                >
                  <Lock size={18} color="#38bdf8" /> Pay ₹{grandTotal?.toLocaleString('en-IN')} (Sandbox)
                </button>
              </form>
            )}

            {/* Cash on Delivery Mode */}
            {paymentMethod === 'COD' && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <ShieldCheck size={52} color="#16a34a" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Cash on Delivery Selected</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '28px' }}>
                  Pay ₹{grandTotal?.toLocaleString('en-IN')} in cash upon delivery of your PC components.
                </p>
                <button
                  onClick={() => handleSimulatePayment(true)}
                  disabled={processing}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)'
                  }}
                >
                  Confirm Order with COD <ArrowRight size={18} />
                </button>
              </div>
            )}

            {statusMessage && (
              <div style={{ marginTop: '24px', padding: '14px', borderRadius: '10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }}>
                {statusMessage.text}
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Summary Box */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '28px',
          height: 'fit-content',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', alignItems: 'center' }}>
                <span style={{ color: '#334155', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>
                  {item.quantity || 1}x {item.name}
                </span>
                <strong style={{ color: '#0f172a' }}>₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</strong>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1.5px solid #f1f5f9', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              <span>Total Payable</span>
              <span style={{ color: '#2563eb' }}>₹{grandTotal?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
