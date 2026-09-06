import React from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { CheckCircle, Truck, ShoppingBag, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

const OrderConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId: paramOrderId } = useParams();

  const orderData = location.state?.order || {
    id: paramOrderId || 'PCF-20260902-1024',
    totalAmount: location.state?.totalAmount || 34999,
    paymentMethod: location.state?.paymentMethod || 'UPI / Sandbox Payment',
    shippingAddress: location.state?.shippingAddress || 'Flat 402, HighTech Towers, Anna Nagar, Chennai, Tamil Nadu - 600040',
    items: location.state?.items || [
      { name: 'AMD Ryzen 7 7800X3D Processor', price: 34999, quantity: 1 }
    ]
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* Top Banner Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '40px 32px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: '#dcfce7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <CheckCircle size={44} color="#16a34a" />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Order Confirmed!
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '24px' }}>
          Thank you for your purchase! We have received your order and are preparing it for shipment.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '10px 20px',
          fontSize: '0.95rem'
        }}>
          <span style={{ color: '#64748b' }}>Order Reference:</span>
          <strong style={{ color: '#0f172a', letterSpacing: '0.5px' }}>#{orderData.id}</strong>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          Order Overview
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Payment Status</span>
            <span style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
              PAID (Sandbox)
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Payment Method</span>
            <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{orderData.paymentMethod}</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Total Amount</span>
            <strong style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 800 }}>₹{orderData.totalAmount?.toLocaleString('en-IN')}</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Expected Delivery</span>
            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={18} />
              {formattedDeliveryDate}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>
            <MapPin size={18} color="#2563eb" />
            Shipping Destination Address
          </div>
          <p style={{ color: '#475569', fontSize: '0.9rem', margin: 0, paddingLeft: '26px' }}>
            {orderData.shippingAddress}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
          <button
            onClick={() => navigate(`/track-order/${orderData.id}`)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '14px 24px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(15,23,42,0.15)'
            }}
          >
            <Truck size={18} />
            Track Order Status
          </button>

          <Link
            to="/products"
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '14px 24px',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'center'
            }}
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>

      </div>

    </div>
  );
};

export default OrderConfirmed;
