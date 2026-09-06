import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '30px auto' }}>
      <h1 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '24px' }} className="brand-font">
        Your Saved <span className="neon-text-cyan">Wishlist</span> ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Heart size={48} color="var(--accent-red)" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: '#fff', marginBottom: '8px' }}>Your wishlist is empty</h3>
          <p>Click the heart icon on any hardware card to save it to your wishlist.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
