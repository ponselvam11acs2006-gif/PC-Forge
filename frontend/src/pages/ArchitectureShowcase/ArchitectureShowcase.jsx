import React, { useState } from 'react';
import { Layers, Server, Database, Cpu, ArrowDown, Shield, RefreshCw } from 'lucide-react';

const ArchitectureShowcase = () => {
  const [selectedService, setSelectedService] = useState('gateway');

  const services = {
    gateway: {
      name: 'Spring Cloud API Gateway',
      port: 8080,
      purpose: 'Single Entry Point & Reverse Proxy',
      tech: 'Spring Cloud Gateway, Netty',
      apis: ['/api/products/**', '/api/cart/**', '/api/orders/**', '/api/inventory/**'],
      db: 'None (Stateless Gateway Routing)'
    },
    product: {
      name: 'Product Service',
      port: 8083,
      purpose: 'Hardware Catalog & Specifications Management',
      tech: 'Spring Boot 3, Spring Data JPA',
      apis: ['GET /api/products', 'GET /api/products/{id}', 'POST /api/products'],
      db: 'pcforge_product_db (MySQL)'
    },
    inventory: {
      name: 'Inventory Service',
      port: 8085,
      purpose: 'Stock Allocation & Pessimistic Locking',
      tech: 'Spring Boot 3, JPA @Lock(PESSIMISTIC_WRITE)',
      apis: ['POST /api/inventory/reserve', 'POST /api/inventory/confirm'],
      db: 'pcforge_inventory_db (MySQL)'
    },
    order: {
      name: 'Order Service',
      port: 8087,
      purpose: 'Order Lifecycle & Status Management',
      tech: 'Spring Boot 3, OpenFeign REST Client',
      apis: ['POST /api/orders', 'GET /api/orders/user/{uId}'],
      db: 'pcforge_order_db (MySQL)'
    }
  };

  const active = services[selectedService];

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
          Microservices Software Architecture
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '4px' }}>
          Interactive presentation of PCForge 16 Spring Boot microservices & Database-Per-Service pattern.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
        
        {/* Diagram Flow */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
            System Data Flow
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            
            {/* React Frontend */}
            <div style={{ width: '280px', padding: '16px', borderRadius: '12px', backgroundColor: '#f0f7ff', border: '1px solid #bfdbfe', textAlign: 'center', fontWeight: 700, color: '#1d4ed8' }}>
              React 18 Frontend App (:5173)
            </div>

            <ArrowDown size={20} color="#6b7280" />

            {/* API Gateway */}
            <div
              onClick={() => setSelectedService('gateway')}
              style={{
                width: '320px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: selectedService === 'gateway' ? '#111827' : '#ffffff',
                border: '1px solid #111827',
                color: selectedService === 'gateway' ? '#ffffff' : '#111827',
                textAlign: 'center',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Spring Cloud API Gateway (:8080)
            </div>

            <ArrowDown size={20} color="#6b7280" />

            {/* Services Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', width: '100%' }}>
              <div
                onClick={() => setSelectedService('product')}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: selectedService === 'product' ? '#eff6ff' : '#ffffff',
                  border: selectedService === 'product' ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                Product Service (:8083)
              </div>

              <div
                onClick={() => setSelectedService('inventory')}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: selectedService === 'inventory' ? '#eff6ff' : '#ffffff',
                  border: selectedService === 'inventory' ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                Inventory Service (:8085)
              </div>

              <div
                onClick={() => setSelectedService('order')}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: selectedService === 'order' ? '#eff6ff' : '#ffffff',
                  border: selectedService === 'order' ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                Order Service (:8087)
              </div>
            </div>

            <ArrowDown size={20} color="#6b7280" />

            {/* Isolated MySQL Databases */}
            <div style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', textAlign: 'center', fontSize: '0.85rem', color: '#4b5563', fontWeight: 600 }}>
              Isolated MySQL Databases (pcforge_product_db, pcforge_inventory_db, pcforge_order_db)
            </div>

          </div>
        </div>

        {/* Selected Service Metadata Panel */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '28px', height: 'fit-content', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
            Service Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'block' }}>Service Name</span>
              <strong style={{ color: '#111827', fontSize: '1.05rem' }}>{active.name}</strong>
            </div>

            <div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'block' }}>Port & Tech</span>
              <strong style={{ color: '#2563eb' }}>Port {active.port} • {active.tech}</strong>
            </div>

            <div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'block' }}>Purpose</span>
              <p style={{ color: '#374151', marginTop: '2px' }}>{active.purpose}</p>
            </div>

            <div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'block' }}>Database Ownership</span>
              <strong style={{ color: '#16a34a' }}>{active.db}</strong>
            </div>

            <div>
              <span style={{ color: '#6b7280', fontSize: '0.8rem', display: 'block', marginBottom: '6px' }}>REST Endpoints</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {active.apis.map((api, idx) => (
                  <code key={idx} style={{ backgroundColor: '#f9fafb', padding: '4px 8px', borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '0.8rem', color: '#111827' }}>
                    {api}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureShowcase;
