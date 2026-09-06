import React, { useState, useEffect, useMemo } from 'react';
import { Cpu, Tv, CircuitBoard, HardDrive, Database, Zap, Box, Check, X, AlertTriangle, ShoppingBag, Sliders, RefreshCw } from 'lucide-react';
import { getProducts } from '../../services/api';
import { useCart } from '../../context/CartContext';

const PCBuilder = () => {
  const { addBuildToCart } = useCart();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedComponents, setSelectedComponents] = useState({
    CPU: null,
    GPU: null,
    MOTHERBOARD: null,
    RAM: null,
    SSD: null,
    PSU: null,
    CABINET: null,
  });

  const slots = [
    { key: 'CPU', name: 'Processor (CPU)', icon: Cpu },
    { key: 'MOTHERBOARD', name: 'Motherboard', icon: CircuitBoard },
    { key: 'RAM', name: 'Memory (RAM)', icon: HardDrive },
    { key: 'GPU', name: 'Graphics Card (GPU)', icon: Tv },
    { key: 'SSD', name: 'Storage (SSD/NVMe)', icon: Database },
    { key: 'PSU', name: 'Power Supply (PSU)', icon: Zap },
    { key: 'CABINET', name: 'Cabinet / Case', icon: Box },
  ];

  const [activeSlot, setActiveSlot] = useState('CPU');

  const fetchCatalogFromApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setAllProducts(data);
    } catch (err) {
      console.error("Failed to load catalog", err);
      setError("Unable to connect to Product Service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogFromApi();
  }, []);

  const availableForSlot = useMemo(() => {
    return allProducts.filter((p) => {
      const cat = (p.categoryName || p.category || '').toUpperCase();
      if (activeSlot === 'CABINET' && (cat === 'CASE' || cat === 'CABINET')) return true;
      return cat === activeSlot;
    });
  }, [allProducts, activeSlot]);

  const selectComponent = (product) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [activeSlot]: product,
    }));
  };

  const removeComponent = (key) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  // Hardware Compatibility Logic Engine
  const compatibilityResult = useMemo(() => {
    const errors = [];
    const warnings = [];
    let estimatedWattage = 80;

    const { CPU, MOTHERBOARD, RAM, GPU, PSU } = selectedComponents;

    const parseSpec = (item) => {
      if (!item || !item.specifications) return {};
      try {
        return typeof item.specifications === 'string' ? JSON.parse(item.specifications) : item.specifications;
      } catch (e) {
        return {};
      }
    };

    const cpuSpec = parseSpec(CPU);
    const moboSpec = parseSpec(MOTHERBOARD);
    const ramSpec = parseSpec(RAM);
    const gpuSpec = parseSpec(GPU);
    const psuSpec = parseSpec(PSU);

    // 1. Socket Check
    if (cpuSpec.socket && moboSpec.socket && cpuSpec.socket !== moboSpec.socket) {
      errors.push(`CPU socket (${cpuSpec.socket}) does not match Motherboard (${moboSpec.socket}).`);
    }

    // 2. RAM Type Check
    if (ramSpec.ram_type && moboSpec.ram_type && ramSpec.ram_type !== moboSpec.ram_type) {
      errors.push(`RAM type (${ramSpec.ram_type}) is incompatible with Motherboard (${moboSpec.ram_type}).`);
    }

    // 3. Power Draw & PSU Headroom
    if (cpuSpec.power) estimatedWattage += Number(cpuSpec.power);
    else if (CPU) estimatedWattage += 120;

    if (gpuSpec.power) estimatedWattage += Number(gpuSpec.power);
    else if (GPU) estimatedWattage += 200;

    if (psuSpec.wattage) {
      if (psuSpec.wattage < estimatedWattage + 40) {
        errors.push(`PSU (${psuSpec.wattage}W) is insufficient for estimated system draw (~${estimatedWattage}W).`);
      } else if (psuSpec.wattage < estimatedWattage + 120) {
        warnings.push(`PSU headroom is low (~${estimatedWattage}W draw on a ${psuSpec.wattage}W PSU).`);
      }
    }

    const totalBuildPrice = Object.values(selectedComponents)
      .filter(Boolean)
      .reduce((sum, item) => sum + item.price, 0);

    return {
      compatible: errors.length === 0,
      errors,
      warnings,
      estimatedWattage,
      totalBuildPrice,
    };
  }, [selectedComponents]);

  const handleAddBuildToCart = () => {
    addBuildToCart(selectedComponents);
    alert('Custom PC build exported directly to your shopping cart!');
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
          Custom PC Builder
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '4px' }}>
          Select compatible components, check live power draw & gaming benchmarks, and place order.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: '28px' }}>
        
        {/* Left Column: Component Slot List */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
            System Slots
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {slots.map((slot) => {
              const Icon = slot.icon;
              const selected = selectedComponents[slot.key];
              const isActive = activeSlot === slot.key;

              return (
                <div
                  key={slot.key}
                  onClick={() => setActiveSlot(slot.key)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: isActive ? '1px solid #2563eb' : '1px solid #e5e7eb',
                    backgroundColor: isActive ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: isActive ? '#2563eb' : '#6b7280', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Icon size={14} /> {slot.name}
                    </span>
                    {selected && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeComponent(slot.key); }}
                        style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: selected ? '#111827' : '#9ca3af' }}>
                    {selected ? selected.name : '+ Choose Component'}
                  </div>

                  {selected && (
                    <div style={{ fontSize: '0.8rem', color: '#2563eb', marginTop: '2px', fontWeight: 700 }}>
                      ₹{selected.price?.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Available Hardware Options */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Select <span style={{ color: '#2563eb' }}>{activeSlot}</span>
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {availableForSlot.length} available items
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
              <RefreshCw size={24} color="#2563eb" className="spin" style={{ marginBottom: '8px' }} />
              <div>Fetching {activeSlot} options...</div>
            </div>
          ) : error ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#dc2626' }}>{error}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto', paddingRight: '4px' }}>
              {availableForSlot.map((product) => {
                const isSelected = selectedComponents[activeSlot]?.id === product.id;

                return (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px',
                      borderRadius: '12px',
                      border: isSelected ? '1px solid #2563eb' : '1px solid #e5e7eb',
                      backgroundColor: isSelected ? '#f0f7ff' : '#ffffff',
                      gap: '16px'
                    }}
                  >
                    <img
                      src={product.imageUrl || '/products/product-placeholder.jpg'}
                      alt={product.name}
                      onError={(e) => { e.currentTarget.src = '/products/product-placeholder.jpg'; }}
                      style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#f9fafb', padding: '4px' }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700 }}>{product.brand}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>{product.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{product.description}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                        ₹{product.price?.toLocaleString('en-IN')}
                      </div>
                      <button
                        onClick={() => selectComponent(product)}
                        className={isSelected ? 'btn-secondary' : 'btn-primary'}
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Build Summary & Live Verification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Compatibility Card */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              Hardware Compatibility
            </h3>

            {compatibilityResult.errors.length === 0 ? (
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '0.85rem', fontWeight: 600 }}>
                <Check size={18} />
                <span>Components are 100% compatible!</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {compatibilityResult.errors.map((err, idx) => (
                  <div key={idx} style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <X size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Estimates */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={16} color="#2563eb" /> System Power & FPS
            </h3>

            <div style={{ marginBottom: '14px', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4b5563' }}>
                <span>Est. Power Draw:</span>
                <strong style={{ color: '#111827' }}>~{compatibilityResult.estimatedWattage} W</strong>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
              Gaming FPS Benchmark
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: '#6b7280' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '6px 8px', borderRadius: '4px' }}>
                <span>Valorant (1440p)</span>
                <strong style={{ color: '#16a34a' }}>240+ FPS</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb', padding: '6px 8px', borderRadius: '4px' }}>
                <span>Cyberpunk 2077</span>
                <strong style={{ color: '#16a34a' }}>85 FPS</strong>
              </div>
            </div>
          </div>

          {/* Total & Export */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Total Build Cost</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '4px 0 16px 0' }}>
              ₹{compatibilityResult.totalBuildPrice.toLocaleString('en-IN')}
            </div>

            <button
              onClick={handleAddBuildToCart}
              disabled={compatibilityResult.totalBuildPrice === 0 || !compatibilityResult.compatible}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: compatibilityResult.compatible && compatibilityResult.totalBuildPrice > 0 ? 1 : 0.4 }}
            >
              <ShoppingBag size={18} /> ADD BUILD TO CART
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PCBuilder;
