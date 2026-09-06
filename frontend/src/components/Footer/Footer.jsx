import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f7f8fa', borderTop: '1px solid #e5e7eb', marginTop: '80px', color: '#4b5563' }}>
      
      {/* Value Badges */}
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '30px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={24} color="#2563eb" />
            <div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>Express Delivery</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Safe insured shipping across India</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} color="#2563eb" />
            <div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>Authentic Guarantee</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>100% genuine brand warranty</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RotateCcw size={24} color="#2563eb" />
            <div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>Easy Returns</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>7-day hassle-free replacement</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Headphones size={24} color="#2563eb" />
            <div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>Technical Support</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Expert hardware compatibility help</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Cpu size={16} />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>PCForge</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.6' }}>
            India's premier technology hardware marketplace & custom PC builder platform powered by modern microservices architecture.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Store & Hardware</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><Link to="/products?category=CPU" style={{ color: '#4b5563' }}>Processors (CPUs)</Link></li>
            <li><Link to="/products?category=GPU" style={{ color: '#4b5563' }}>Graphics Cards (GPUs)</Link></li>
            <li><Link to="/products?category=MOTHERBOARD" style={{ color: '#4b5563' }}>Motherboards</Link></li>
            <li><Link to="/products?category=RAM" style={{ color: '#4b5563' }}>DDR5 Memory (RAM)</Link></li>
            <li><Link to="/products?category=SSD" style={{ color: '#4b5563' }}>NVMe Storage</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Custom Tools</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><Link to="/pc-builder" style={{ color: '#4b5563' }}>Custom PC Builder</Link></li>
            <li><Link to="/compare" style={{ color: '#4b5563' }}>Hardware Comparison</Link></li>
            <li><Link to="/architecture" style={{ color: '#4b5563' }}>System Architecture</Link></li>
            <li><Link to="/portfolio" style={{ color: '#4b5563' }}>Developer Portfolio</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Account & Support</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <li><Link to="/orders" style={{ color: '#4b5563' }}>Order Tracking</Link></li>
            <li><Link to="/wishlist" style={{ color: '#4b5563' }}>Saved Wishlist</Link></li>
            <li><Link to="/profile" style={{ color: '#4b5563' }}>User Profile</Link></li>
            <li><Link to="/admin" style={{ color: '#4b5563' }}>Admin Command Center</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', padding: '24px', textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af' }}>
        © 2026 PCForge Inc. All rights reserved. Professional Full-Stack E-Commerce System.
      </div>
    </footer>
  );
};

export default Footer;
