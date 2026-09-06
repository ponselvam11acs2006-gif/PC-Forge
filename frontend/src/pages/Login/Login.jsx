import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Zap, HardDrive, Tv, Fan, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Frontend Demo Mode
  setTimeout(() => {
    setLoading(false);
    navigate('/');
  }, 600);
};

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '40px auto',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 180px)'
    }}>
      
      {/* Keyframes & Animations */}
      <style>{`
        @keyframes pcFloatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fanSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cardFadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-panel-animated {
          animation: cardFadeSlideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .login-input-field {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .login-input-field:focus {
          border-color: #2563eb !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12) !important;
        }

        .login-primary-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .login-primary-btn:hover {
          background-color: #1e293b !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2) !important;
        }

        .pc-fan-icon {
          animation: fanSpinSlow 12s linear infinite;
        }

        .floating-hardware-visual {
          animation: pcFloatSlow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main Split-Screen Layout (55% Left, 45% Right) */}
      <div className="login-panel-animated" style={{
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.12)'
      }}>

        {/* LEFT 55%: Dark Navy Technology Environment (#0b1329) */}
        <div style={{
          backgroundColor: '#0b1329',
          padding: '60px 52px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '640px'
        }}>
          
          {/* Subtle Abstract Circuit Grid Background */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.45,
            pointerEvents: 'none'
          }} />

          {/* Top Brand Header */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              backdropFilter: 'blur(12px)',
              padding: '8px 18px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '32px'
            }}>
              <Cpu size={18} color="#38bdf8" />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>
                PC<span style={{ color: '#38bdf8' }}>FORGE</span> SHOWROOM
              </span>
            </div>

            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: '1.2',
              marginBottom: '16px',
              letterSpacing: '-0.03em'
            }}>
              Welcome back to <span style={{ color: '#38bdf8' }}>PCForge</span>
            </h1>
            <p style={{
              color: '#94a3b8',
              fontSize: '1.05rem',
              lineHeight: '1.65',
              maxWidth: '440px',
              fontWeight: 400
            }}>
              Build smarter. Shop better. Power your setup.
            </p>
          </div>

          {/* Center Visual: Realistic & Elegant Desktop PC Setup Graphic */}
          <div style={{
            position: 'relative',
            margin: '48px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}>
            
            {/* Main PC Enclosure Showcase Visual */}
            <div className="floating-hardware-visual" style={{
              width: '260px',
              height: '290px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              borderRadius: '22px',
              border: '1.5px solid rgba(56, 189, 248, 0.3)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(56, 189, 248, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.5px' }}>
                  CUSTOM RIG SHOWCASE
                </span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              </div>
              
              <div style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  border: '1px solid #334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Tv size={22} color="#a855f7" />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>RTX 4070 Ti Super</div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>16GB GDDR6X • DLSS 3</div>
                    </div>
                  </div>
                  <Fan size={20} color="#38bdf8" className="pc-fan-icon" />
                </div>

                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  border: '1px solid #334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Cpu size={22} color="#38bdf8" />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>Ryzen 7 7800X3D</div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>8-Core • 3D V-Cache</div>
                    </div>
                  </div>
                  <Zap size={18} color="#eab308" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '4px', backgroundColor: '#38bdf8', borderRadius: '2px' }} />
                <div style={{ flex: 1, height: '4px', backgroundColor: '#16a34a', borderRadius: '2px' }} />
                <div style={{ flex: 1, height: '4px', backgroundColor: '#a855f7', borderRadius: '2px' }} />
              </div>
            </div>

          </div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '0.85rem' }}>
            <ShieldCheck size={20} color="#16a34a" />
            <span>256-Bit SSL Encrypted E-Commerce Portal</span>
          </div>

        </div>

        {/* RIGHT 45%: Clean White Background & Modern Floating Login Form */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '60px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          <div style={{ marginBottom: '36px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              backgroundColor: '#eff6ff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb',
              marginBottom: '20px'
            }}>
              <Cpu size={26} />
            </div>

            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              marginBottom: '8px'
            }}>
              Welcome Back
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {error && (
              <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  className="login-input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@pcforge.com or testuser999@example.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link has been dispatched to your email address."); }} style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '14px 44px 14px 44px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#0f172a', cursor: 'pointer' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.88rem', color: '#475569', cursor: 'pointer', userSelect: 'none', fontWeight: 500 }}>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-primary-btn"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.98rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.12)',
                marginTop: '4px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Authenticating with Backend...' : 'LOGIN'}
              <ArrowRight size={18} />
            </button>

          </form>

          <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: '#64748b' }}>
            New to PCForge?{' '}
            <Link to="/register" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
              Create an account
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
