import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Lock, Mail, User, ArrowRight, ShieldCheck, Zap, HardDrive, Tv } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const isAdmin = email.toLowerCase().includes('admin');
      const userData = {
        id: Date.now(),
        fullName: fullName || 'New Customer',
        username: email.split('@')[0] || 'gamer',
        email,
        role: isAdmin ? 'ADMIN' : 'CUSTOMER'
      };
      login(userData, `jwt-token-${userData.id}-${Date.now()}`);
      navigate('/');
    }, 600);
  };

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '40px auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 160px)'
    }}>
      
      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.15); }
          50% { box-shadow: 0 0 35px rgba(56, 189, 248, 0.35); }
          100% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.15); }
        }
        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-card-animated {
          animation: cardSlideUp 0.4s ease-out forwards;
        }
        .float-badge-1 { animation: floatSlow 5s ease-in-out infinite; }
        .float-badge-2 { animation: floatSlow 6s ease-in-out infinite 1s; }

        .form-input-focus:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
        }
      `}</style>

      {/* Main Split-Screen Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 40px rgba(15,23,42,0.06)'
      }}>

        {/* LEFT PANEL: Dark Navy Technology Branding */}
        <div style={{
          backgroundColor: '#0f172a',
          padding: '48px 40px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '560px'
        }}>
          
          {/* Subtle Circuit Grid Pattern Overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: 0.5,
            pointerEvents: 'none'
          }} />

          {/* Top Brand Tag */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid #334155',
              marginBottom: '28px'
            }}>
              <Cpu size={18} color="#38bdf8" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.5px' }}>
                JOIN PC<span style={{ color: '#38bdf8' }}>FORGE</span>
              </span>
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: '1.25', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Create your <span style={{ color: '#38bdf8' }}>Account</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', maxWidth: '380px' }}>
              Unlock custom PC build exports, live order tracking, and member discounts.
            </p>
          </div>

          {/* Center Graphic: Futuristic Hardware Visual */}
          <div style={{
            position: 'relative',
            margin: '40px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}>
            <div style={{
              width: '200px',
              height: '240px',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '2px solid #334155',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              animation: 'pulseGlow 4s infinite'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>NEW MEMBER</span>
              </div>
              
              <div style={{ textAlignment: 'center', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <User size={48} color="#38bdf8" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>MEMBER ACCESS</span>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ flex: 1, height: '4px', backgroundColor: '#38bdf8', borderRadius: '2px' }} />
                <div style={{ flex: 1, height: '4px', backgroundColor: '#16a34a', borderRadius: '2px' }} />
              </div>
            </div>

            <div className="float-badge-1" style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#0f172a', border: '1px solid #38bdf8', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <ShieldCheck size={14} color="#16a34a" /> Express Delivery
            </div>

            <div className="float-badge-2" style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <Zap size={14} color="#eab308" /> Save PC Builds
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.82rem' }}>
            <ShieldCheck size={18} color="#16a34a" />
            <span>100% Brand Warranty & Verified Hardware Store</span>
          </div>

        </div>

        {/* RIGHT PANEL: Registration Form */}
        <div className="login-card-animated" style={{
          backgroundColor: '#ffffff',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#eff6ff',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb',
              marginBottom: '16px'
            }}>
              <Cpu size={24} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Create an Account
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Join thousands of PC builders & gamers
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  className="form-input-focus"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                />
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  className="form-input-focus"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  className="form-input-focus"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '13px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(15,23,42,0.15)',
                transition: 'all 0.15s ease',
                marginTop: '6px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; }}
            >
              {isSubmitting ? 'Creating Account...' : 'Register Account'}
              <ArrowRight size={18} />
            </button>

          </form>

          <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.88rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
