import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
      
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#eff6ff', border: '2px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <User size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                {user?.fullName || user?.username || 'Customer Account'}
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700 }}>
                Verified Customer Account
              </span>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-secondary" style={{ color: '#dc2626', borderColor: '#fecaca' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* User Data Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Mail size={14} color="#2563eb" /> Email Address
            </span>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{user?.email || 'customer@example.com'}</strong>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Phone size={14} color="#2563eb" /> Registered Phone
            </span>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{user?.phone || '+91 98765 43210'}</strong>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <MapPin size={14} color="#2563eb" /> Primary Shipping Address
            </span>
            <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>
              {user?.address || 'Flat 402, HighTech Towers, Chennai, TN - 600001'}
            </strong>
          </div>
        </div>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#2563eb" /> BCrypt Hashed Password Security</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#16a34a" /> JWT Auth Token Active</span>
        </div>

      </div>
    </div>
  );
};

export default Profile;
