import { createContext, useContext, useEffect, useState } from 'react';
import { cartAPI } from '@/lib/api';
import { useAuth } from './useAuth';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await cartAPI.getCart();
      setItems(response.data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      console.log('Please sign in to add items to cart');
      return;
    }

    try {
      await cartAPI.addToCart(productId, quantity);
      await fetchCartItems();
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || quantity < 1) return;

    try {
      await cartAPI.updateQuantity(productId, quantity);
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      await cartAPI.removeFromCart(productId);
      await fetchCartItems();
      console.log('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await cartAPI.clearCart();
      setItems([]);
      console.log('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}