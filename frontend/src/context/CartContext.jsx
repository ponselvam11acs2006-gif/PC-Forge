import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToCartApi, getCart, updateCartItemQuantity, removeCartItem, clearCartApi, getInventoryApi } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || user?.userId;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items whenever authenticated user changes or logs in
  const fetchUserCart = async () => {
    if (!userId) {
      setCart([]);
      return;
    }
    setLoading(true);
    try {
      const data = await getCart(userId);
      const items = data?.items || (Array.isArray(data) ? data : []);
      setCart(items);
    } catch (e) {
      console.warn("Could not fetch user cart from backend:", e.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [userId]);

  const addToCart = async (product, quantity = 1) => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const pId = Number(product.id || product.productId);

    // Validate available stock against MySQL Inventory Service
    try {
      const inv = await getInventoryApi(pId);
      const avail = Number(inv?.availableQuantity ?? 0);
      const existingInCart = cart.find(item => Number(item.productId) === pId);
      const currentCartQty = existingInCart ? Number(existingInCart.quantity) : 0;
      const requestedTotal = currentCartQty + Number(quantity);

      if (requestedTotal > avail) {
        alert(`Only ${avail} items are available.`);
        return;
      }
    } catch (e) {
      console.warn("Stock validation deferred:", e.message);
    }

    const payload = {
      userId: Number(userId),
      productId: pId,
      productName: product.name || 'PC Hardware',
      imageUrl: product.imageUrl || '/products/cpu/ryzen-7-7800x3d.png',
      price: Number(product.price || 0),
      quantity: Number(quantity)
    };

    try {
      await addToCartApi(payload);
      await fetchUserCart();
    } catch (e) {
      console.error("Failed to add item to cart on server:", e);
      alert(e.response?.data?.message || "Failed to sync cart with server.");
    }
  };

  const addBuildToCart = async (buildComponents) => {
    if (!userId) {
      alert("Please log in to add custom build to cart.");
      return;
    }
    for (const comp of Object.values(buildComponents)) {
      if (comp && (comp.id || comp.productId)) {
        await addToCart(comp, 1);
      }
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
    } else {
      const targetItem = cart.find(item => Number(item.id) === Number(cartItemId));
      if (targetItem) {
        try {
          const inv = await getInventoryApi(targetItem.productId);
          const avail = Number(inv?.availableQuantity ?? 0);
          if (quantity > avail) {
            alert(`Only ${avail} items are available.`);
            return;
          }
        } catch (e) {}
      }

      try {
        await updateCartItemQuantity(cartItemId, quantity);
        await fetchUserCart();
      } catch (e) {
        console.error("Failed to update cart quantity on server:", e);
      }
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      await fetchUserCart();
    } catch (e) {
      console.error("Failed to remove item from cart on server:", e);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await clearCartApi(userId);
      setCart([]);
    } catch (e) {
      console.error("Failed to clear cart on server:", e);
      setCart([]);
    }
  };

  // Pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const discount = subtotal >= 50000 ? subtotal * 0.03 : 0;
  
  let shipping = 0;
  if (subtotal > 0) {
    if (subtotal >= 2000) {
      shipping = 0;
    } else if (subtotal >= 800) {
      shipping = 99;
    } else {
      shipping = 49;
    }
  }

  const grandTotal = subtotal - discount + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        addBuildToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        tax: 0,
        shipping,
        grandTotal,
        itemCount: cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0),
        refreshCart: fetchUserCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      loading: false,
      addToCart: async () => {},
      addBuildToCart: async () => {},
      updateQuantity: async () => {},
      removeFromCart: async () => {},
      clearCart: async () => {},
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      grandTotal: 0,
      itemCount: 0,
      refreshCart: async () => {}
    };
  }
  return context;
};
