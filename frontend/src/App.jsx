import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import PCBuilder from './pages/PCBuilder/PCBuilder';
import Compare from './pages/Compare/Compare';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import OrderConfirmed from './pages/OrderConfirmed/OrderConfirmed';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import Wishlist from './pages/Wishlist/Wishlist';
import Admin from './pages/Admin/Admin';
import ArchitectureShowcase from './pages/ArchitectureShowcase/ArchitectureShowcase';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '600px', margin: '40px auto', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '12px' }}>Something went wrong loading the page</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            A temporary browser rendering exception occurred. Click below to refresh session state.
          </p>
          <button onClick={this.handleReset} style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
            Reset Store & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Root Route: Render Login if unauthenticated, or Home if authenticated */}
      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/architecture" element={<ArchitectureShowcase />} />

      {/* Protected Routes requiring Customer Authentication */}
      <Route
        path="/pc-builder"
        element={
          <ProtectedRoute>
            <PCBuilder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-confirmed/:orderId"
        element={
          <ProtectedRoute>
            <OrderConfirmed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/track-order/:orderId"
        element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
