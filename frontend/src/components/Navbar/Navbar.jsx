import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, User, Cpu, LogOut, ChevronDown, 
  Sliders, Tv, CircuitBoard, Monitor as MonitorIcon, Zap, HardDrive, 
  Database, Box, Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/login');
  };

  const categoryItems = [
    { name: 'CPU', cat: 'CPU', icon: Cpu },
    { name: 'GPU', cat: 'GPU', icon: Tv },
    { name: 'Motherboards', cat: 'MOTHERBOARD', icon: CircuitBoard },
    { name: 'Monitors', cat: 'MONITOR', icon: MonitorIcon },
    { name: 'RAM', cat: 'RAM', icon: Zap },
    { name: 'SSD', cat: 'SSD', icon: HardDrive },
    { name: 'HDD', cat: 'HDD', icon: Database },
    { name: 'PSU', cat: 'PSU', icon: Zap },
    { name: 'Cases', cat: 'CASE', icon: Box },
    { name: 'Accessories', cat: 'ACCESSORIES', icon: Sparkles }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#ffffff' }}>
      
      {/* CSS Utility for Navbar interactions */}
      <style>{`
        .nav-search-input {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-search-input:focus {
          background-color: #0f172a !important;
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25) !important;
        }

        .category-link-item {
          transition: all 0.15s ease-in-out;
        }
        .category-link-item:hover {
          color: #2563eb !important;
          background-color: #f1f5f9;
        }

        .nav-action-btn {
          transition: all 0.15s ease;
        }
        .nav-action-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>

      {/* 1. MAIN TOP NAVBAR: Deep Navy (#0b1329) */}
      <div style={{ backgroundColor: '#0b1329', padding: '14px 0', borderBottom: '1px solid #1e293b' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          
          {/* LEFT: PCForge Logo & Brand Name */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}>
              <Cpu size={22} />
            </div>
            <span style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em'
            }}>
              PC<span style={{ color: '#38bdf8' }}>Forge</span>
            </span>
          </Link>

          {/* CENTER: Large Modern Search Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexGrow: 1, maxWidth: '580px', position: 'relative' }}>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search CPUs, GPUs, Monitors, Accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 44px 11px 18px',
                fontSize: '0.9rem',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                bottom: '0',
                width: '44px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Search size={18} />
            </button>
          </form>

          {/* RIGHT: Actions (PC Builder, Account, Wishlist, Cart) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* PC Builder Button */}
            <Link
              to="/pc-builder"
              className="nav-action-btn"
              style={{
                textDecoration: 'none',
                color: '#f8fafc',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1e293b',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #334155'
              }}
            >
              <Sliders size={16} color="#38bdf8" /> PC Builder
            </Link>

            {/* Wishlist Heart Icon */}
            <Link to="/wishlist" className="nav-action-btn" style={{ textDecoration: 'none', color: '#ffffff', position: 'relative', padding: '6px' }}>
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="nav-action-btn" style={{ textDecoration: 'none', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px' }}>
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* User Auth Button */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#ffffff',
                    padding: '8px 14px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <User size={16} color="#38bdf8" />
                  <span>{user?.fullName?.split(' ')[0] || user?.username || 'Account'}</span>
                  <ChevronDown size={14} />
                </button>

                {showDropdown && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '42px',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    padding: '8px 0',
                    minWidth: '180px',
                    zIndex: 1100,
                    border: '1px solid #e2e8f0'
                  }}>
                    <Link to="/profile" onClick={() => setShowDropdown(false)} style={{ display: 'block', padding: '10px 16px', fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 600 }}>
                      My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setShowDropdown(false)} style={{ display: 'block', padding: '10px 16px', fontSize: '0.85rem', color: '#0f172a', textDecoration: 'none', fontWeight: 600 }}>
                      Orders & Tracking
                    </Link>
                    <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        color: '#dc2626',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="nav-action-btn"
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem'
                }}
              >
                Login / Register
              </Link>
            )}

          </div>

        </div>
      </div>

      {/* 2. SECOND CATEGORY NAVIGATION ROW: Clean White Navigation Bar */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {categoryItems.map((c) => {
            const IconComp = c.icon;
            return (
              <Link
                key={c.cat}
                to={`/products?category=${c.cat}`}
                className="category-link-item"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                <IconComp size={16} color="#64748b" />
                <span>{c.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

    </header>
  );
};

export default Navbar;
