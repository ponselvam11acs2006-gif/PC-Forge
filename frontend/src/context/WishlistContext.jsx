import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlistApi, addToWishlistApi, removeFromWishlistApi, getProducts } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || user?.userId;

  const [wishlist, setWishlist] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => setAllProducts(data || [])).catch(() => {});
  }, []);

  const fetchWishlist = async () => {
    if (!userId) {
      setWishlist([]);
      return;
    }
    try {
      const items = await getWishlistApi(userId);
      if (Array.isArray(items)) {
        // Map WishlistItem (userId, productId) to full product object if available
        const fullWishlist = items.map(w => {
          const matched = allProducts.find(p => Number(p.id) === Number(w.productId));
          return matched || { id: w.productId, name: `Hardware Product #${w.productId}`, price: 0 };
        });
        setWishlist(fullWishlist);
      }
    } catch (e) {
      console.warn("Could not fetch user wishlist from backend:", e.message);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId, allProducts]);

  const toggleWishlist = async (product) => {
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    const productId = Number(product.id || product.productId);
    const exists = wishlist.some(item => Number(item.id) === productId);

    try {
      if (exists) {
        await removeFromWishlistApi(userId, productId);
      } else {
        await addToWishlistApi(userId, productId);
      }
      await fetchWishlist();
    } catch (e) {
      console.error("Wishlist sync failed:", e);
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => Number(item.id) === Number(productId));

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, refreshWishlist: fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      wishlist: [],
      toggleWishlist: async () => {},
      isInWishlist: () => false,
      refreshWishlist: async () => {}
    };
  }
  return context;
};
