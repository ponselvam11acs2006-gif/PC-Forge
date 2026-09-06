import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.email,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`
      });

      setSuccessMsg('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message || 'Failed to create customer account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 180px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', backgroundColor: '#f1f3f6' }}>
      
      {/* Flipkart Style Split Register Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 520px', width: '100%', maxWidth: '820px', backgroundColor: '#ffffff', borderRadius: '4px', boxShadow: '0 4px 16px 0 rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        
        {/* Left Flipkart Blue Banner */}
        <div style={{ backgroundColor: '#2874f0', padding: '40px 32px', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>Looks like you're new here!</h2>
            <p style={{ fontSize: '0.95rem', color: '#e0e0e0', lineHeight: '1.5' }}>
              Sign up with your email to get started on PCForge hardware marketplace.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Cpu size={80} color="#ffffff" style={{ opacity: 0.3 }} />
          </div>
        </div>

        {/* Right Form Surface */}
        <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {error && (
              <div style={{ padding: '10px 14px', borderRadius: '2px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div style={{ padding: '10px 14px', borderRadius: '2px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="customer@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Delivery Address</label>
              <input
                type="text"
                required
                placeholder="Flat 101, Residency Towers"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>City</label>
                <input
                  type="text"
                  required
                  placeholder="Chennai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>State</label>
                <input
                  type="text"
                  required
                  placeholder="Tamil Nadu"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#878787', marginBottom: '4px' }}>Pincode</label>
                <input
                  type="text"
                  required
                  placeholder="600001"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  style={{ width: '100%', padding: '8px', fontSize: '0.8rem' }}
                />
              </div>
            </div>

            {/* Flipkart Orange Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', marginTop: '6px', borderRadius: '2px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Creating Account...' : 'CONTINUE'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
            <Link to="/login" style={{ color: '#2874f0', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
              Existing User? Log in
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;
