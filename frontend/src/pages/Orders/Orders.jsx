import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Package, Check, Clock, Truck, ShieldCheck, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { getUserOrdersApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Orders = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const steps = [
    { id: 'PLACED', label: 'Order Placed' },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'PACKED', label: 'Packed' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'DELIVERED', label: 'Delivered' }
  ];

  const fetchOrders = async () => {
    setLoading(true);
    const userIdToUse = user?.id || user?.userId;
    if (!userIdToUse) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const data = await getUserOrdersApi(userIdToUse);
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch user orders:", e);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const getActiveStepIndex = (status) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PROCESSING': return 2;
      case 'PACKED': return 3;
      case 'SHIPPED': return 4;
      case 'DELIVERED': return 5;
      default: return 1;
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
          Order History & Tracking
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '4px' }}>
          Live order status updates persisted directly in MySQL database.
        </p>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
          <RefreshCw size={28} color="#2563eb" className="spin" style={{ marginBottom: '12px' }} />
          <div>Retrieving real order history...</div>
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          <Package size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            No Orders Found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
            You haven't placed any hardware orders yet.
          </p>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <ShoppingBag size={18} /> Explore Catalog
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {orders.map((order) => {
            const currentStepIdx = getActiveStepIndex(order.status);

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
              >
                {/* Order Header */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    padding: '20px 24px',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '32px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', display: 'block' }}>
                        Order Placed
                      </span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', display: 'block' }}>
                        Total Amount
                      </span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>
                        ₹{Number(order.totalAmount || 0).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', display: 'block' }}>
                        Ship To
                      </span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {order.shippingAddress || 'Default Address'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#6b7280', marginRight: '6px' }}>Order ID:</span>
                    <strong style={{ fontSize: '0.95rem', color: '#111827' }}>#{order.id}</strong>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '24px' }}>
                  
                  {/* Timeline Tracker */}
                  <div style={{ marginBottom: '32px', padding: '16px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                      
                      {/* Connecting Track Line */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '15px',
                          left: '40px',
                          right: '40px',
                          height: '3px',
                          backgroundColor: '#e5e7eb',
                          zIndex: 1
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '15px',
                          left: '40px',
                          width: `${(currentStepIdx / (steps.length - 1)) * 90}%`,
                          height: '3px',
                          backgroundColor: '#2563eb',
                          zIndex: 2,
                          transition: 'width 0.5s ease'
                        }}
                      />

                      {steps.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div
                            key={step.id}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              position: 'relative',
                              zIndex: 3
                            }}
                          >
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: isDone ? '#2563eb' : '#ffffff',
                                border: isDone ? 'none' : '2px solid #d1d5db',
                                color: isDone ? '#ffffff' : '#9ca3af',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                boxShadow: isCurrent ? '0 0 0 4px rgba(37,99,235,0.2)' : 'none'
                              }}
                            >
                              {isDone ? <Check size={16} /> : idx + 1}
                            </div>
                            <span
                              style={{
                                marginTop: '8px',
                                fontSize: '0.78rem',
                                fontWeight: isCurrent ? '700' : '500',
                                color: isCurrent ? '#2563eb' : isDone ? '#111827' : '#9ca3af'
                              }}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            border: '1px solid #f3f4f6'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', backgroundColor: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#2563eb' }}>
                              <Package size={20} style={{ margin: 'auto' }} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                                {item.productName}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                Qty: {item.quantity} • ₹{Number(item.price || 0).toLocaleString('en-IN')} each
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#111827' }}>
                            ₹{Number(item.totalPrice || (item.price * item.quantity) || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', fontStyle: 'italic' }}>
                        Order items processed by backend service.
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Orders;
