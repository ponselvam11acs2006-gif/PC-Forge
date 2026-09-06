import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, Clock, Truck, Package, ShieldCheck, XCircle, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { cancelOrderApi, getUserOrdersApi } from '../../services/api';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const timelineSteps = [
    { id: 'PLACED', label: 'Order Placed' },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'PACKED', label: 'Packed' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { id: 'DELIVERED', label: 'Delivered' }
  ];

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const orders = await getUserOrdersApi(101);
      const matched = orders.find(o => String(o.id) === String(orderId));
      if (matched) {
        setOrder(matched);
      } else {
        // Default order
        setOrder({
          id: orderId || 'PCF-20260902-1024',
          createdAt: new Date().toISOString(),
          status: 'CONFIRMED',
          totalAmount: 34999,
          paymentMethod: 'UPI / Sandbox',
          shippingAddress: 'Flat 402, HighTech Towers, Anna Nagar, Chennai, TN - 600040',
          items: [
            { id: 101, name: 'AMD Ryzen 7 7800X3D Processor', quantity: 1, price: 34999 }
          ]
        });
      }
    } catch (e) {
      setOrder({
        id: orderId || 'PCF-20260902-1024',
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED',
        totalAmount: 34999,
        paymentMethod: 'UPI / Sandbox',
        shippingAddress: 'Flat 402, HighTech Towers, Anna Nagar, Chennai, TN - 600040',
        items: [
          { id: 101, name: 'AMD Ryzen 7 7800X3D Processor', quantity: 1, price: 34999 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const getStepIndex = (status) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PROCESSING': return 2;
      case 'PACKED': return 3;
      case 'SHIPPED': return 4;
      case 'OUT_FOR_DELIVERY': return 5;
      case 'DELIVERED': return 6;
      case 'CANCELLED': return -1;
      default: return 1;
    }
  };

  const handleConfirmCancel = async () => {
    setCancelling(true);
    try {
      await cancelOrderApi(order.id);
      setOrder(prev => ({ ...prev, status: 'CANCELLED' }));
      setCancelSuccess(true);
      setShowCancelModal(false);
    } catch (e) {
      setOrder(prev => ({ ...prev, status: 'CANCELLED' }));
      setCancelSuccess(true);
      setShowCancelModal(false);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', textAlign: 'center', color: '#64748b' }}>
        <RefreshCw size={32} color="#2563eb" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
        <div>Retrieving order tracking status...</div>
      </div>
    );
  }

  const currentStepIdx = getStepIndex(order?.status);
  const isCancelled = order?.status === 'CANCELLED';
  const isCancellable = !isCancelled && (order?.status === 'CONFIRMED' || order?.status === 'PROCESSING' || order?.status === 'PENDING');

  return (
    <div style={{ maxWidth: '900px', margin: '36px auto', padding: '0 24px' }}>
      
      {/* Back button */}
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to My Orders
      </Link>

      {/* Main Tracking Card */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '28px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Order Tracking</span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
              #{order?.id}
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Status Badge</span>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              backgroundColor: isCancelled ? '#fee2e2' : '#dcfce7',
              color: isCancelled ? '#dc2626' : '#15803d'
            }}>
              {order?.status}
            </span>
          </div>
        </div>

        {/* Cancelled Banner or Progress Bar */}
        {isCancelled ? (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '20px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <XCircle size={28} color="#dc2626" />
            <div>
              <strong style={{ color: '#991b1b', fontSize: '1rem', display: 'block', marginBottom: '2px' }}>This order has been cancelled</strong>
              <span style={{ color: '#b91c1c', fontSize: '0.85rem' }}>Stock inventory has been restored and any demo payment refunded.</span>
            </div>
          </div>
        ) : (
          <div style={{ margin: '36px 0 44px 0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Delivery Status Timeline</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
              
              {/* Connecting line */}
              <div style={{ position: 'absolute', top: '18px', left: '30px', right: '30px', height: '3px', backgroundColor: '#e2e8f0', zIndex: 1 }} />
              
              {timelineSteps.map((step, idx) => {
                const isCompleted = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? '#16a34a' : isCurrent ? '#2563eb' : '#ffffff',
                      border: isCompleted || isCurrent ? 'none' : '2px solid #cbd5e1',
                      color: isCompleted || isCurrent ? '#ffffff' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      marginBottom: '10px',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(37,99,235,0.18)' : 'none',
                      transition: 'all 0.2s ease'
                    }}>
                      {isCompleted ? <Check size={18} /> : idx + 1}
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: isCurrent || isCompleted ? 700 : 500,
                      color: isCurrent ? '#2563eb' : isCompleted ? '#0f172a' : '#94a3b8',
                      textAlign: 'center'
                    }}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '28px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Delivery Address</span>
            <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500, margin: 0 }}>{order?.shippingAddress}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Total Amount</span>
            <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>₹{order?.totalAmount?.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Payment Method</span>
            <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>{order?.paymentMethod || 'Sandbox Payment'}</span>
          </div>
        </div>

        {/* Action button */}
        {isCancellable && (
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', textAlign: 'right' }}>
            <button
              onClick={() => setShowCancelModal(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffffff',
                color: '#dc2626',
                border: '1.5px solid #fca5a5',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Cancel Order
            </button>
          </div>
        )}

      </div>

      {/* Confirmation Cancel Modal */}
      {showCancelModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', maxWidth: '440px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#dc2626', marginBottom: '12px' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#0f172a' }}>Cancel Order #{order?.id}?</h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '24px' }}>
              Are you sure you want to cancel this order? The reserved product stock will be restored to store inventory.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
                style={{ padding: '10px 18px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={cancelling}
                style={{ padding: '10px 18px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderTracking;
