import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, DollarSign, Package, AlertTriangle, TrendingUp, Plus, Trash2, RefreshCw } from 'lucide-react';
import { getProducts, createProduct, deleteProduct } from '../../services/api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('PRODUCTS');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: 'ASUS',
    categoryName: 'GPU',
    categoryId: 2,
    price: 49999,
    discountPrice: 54999,
    imageUrl: '/products/rtx-4070ti-super.jpg',
    description: 'High performance hardware component.',
    specifications: '{"power": 200}',
    stockQuantity: 10
  });

  const fetchAdminProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products for Admin", err);
      setError("Unable to connect to Product Service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const created = await createProduct(newProduct);
      setProducts([created, ...products]);
      setShowAddModal(false);
      alert('Product created and persisted in MySQL database!');
    } catch (err) {
      console.error("Failed to create product", err);
      alert('Failed to create product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete product from MySQL database?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted!');
    } catch (err) {
      console.error("Failed to delete product", err);
      alert('Failed to delete product.');
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Admin Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            Enterprise Admin Dashboard
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '4px' }}>
            Real-time inventory CRUD, database stock management & system telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('PRODUCTS')} className={activeTab === 'PRODUCTS' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Product Inventory
          </button>
          <button onClick={() => setActiveTab('ANALYTICS')} className={activeTab === 'ANALYTICS' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Sales Analytics
          </button>
        </div>
      </div>

      {activeTab === 'PRODUCTS' ? (
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>MySQL Hardware Catalog ({products.length})</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={fetchAdminProducts} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                <RefreshCw size={14} /> Refresh Data
              </button>
              <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Product to MySQL
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
              <RefreshCw size={24} color="#2563eb" className="spin" style={{ marginBottom: '8px' }} />
              <div>Fetching records from MySQL...</div>
            </div>
          ) : error ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#dc2626' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#111827', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Brand</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>MySQL Stock</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
                      <img src={p.imageUrl || '/products/product-placeholder.jpg'} alt={p.name} onError={(e) => { e.currentTarget.src = '/products/product-placeholder.jpg'; }} style={{ width: '40px', height: '40px', objectFit: 'contain', backgroundColor: '#f9fafb', borderRadius: '6px', padding: '2px' }} />
                      <span>{p.name}</span>
                    </td>
                    <td style={{ padding: '12px', color: '#2563eb', fontWeight: 600 }}>{p.brand}</td>
                    <td style={{ padding: '12px' }}>{p.categoryName || p.category}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>₹{p.price?.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', backgroundColor: (p.stockQuantity ?? 10) < 5 ? '#fffbe6' : '#f0fdf4', color: (p.stockQuantity ?? 10) < 5 ? '#d48806' : '#16a34a', fontWeight: 700 }}>
                        {p.stockQuantity ?? p.availableQuantity ?? 10} Units
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Modal */}
          {showAddModal && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px', maxWidth: '440px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                <h3 style={{ color: '#111827', marginBottom: '16px', fontWeight: 800 }}>Add Hardware to MySQL</h3>
                <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Product Name" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: '10px', fontSize: '0.85rem' }} />
                  <input type="text" placeholder="Brand" required value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} style={{ padding: '10px', fontSize: '0.85rem' }} />
                  <select value={newProduct.categoryName} onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })} style={{ padding: '10px', fontSize: '0.85rem' }}>
                    <option value="CPU">CPU</option>
                    <option value="GPU">GPU</option>
                    <option value="MOTHERBOARD">MOTHERBOARD</option>
                    <option value="RAM">RAM</option>
                    <option value="SSD">SSD</option>
                    <option value="PSU">PSU</option>
                    <option value="CABINET">CABINET</option>
                  </select>
                  <input type="number" placeholder="Price (₹)" required value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} style={{ padding: '10px', fontSize: '0.85rem' }} />
                  <input type="text" placeholder="Image URL (e.g. /products/samsung-990-pro-2tb.jpg)" required value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} style={{ padding: '10px', fontSize: '0.85rem' }} />
                  <input type="number" placeholder="Stock" required value={newProduct.stockQuantity} onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })} style={{ padding: '10px', fontSize: '0.85rem' }} />
                  
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save to Database</button>
                    <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Analytics Tab */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Total Revenue</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>₹1,24,80,500</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Total Products in Database</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>{products.length}</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
