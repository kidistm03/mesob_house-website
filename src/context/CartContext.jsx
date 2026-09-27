import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(dish, quantity = 1) {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === dish.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...dish, quantity }];
    });
  }

  function updateQuantity(dishId, newQuantity) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === dishId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  }

  function removeFromCart(dishId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== dishId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  // Use teacher field priceETB
  const { totalItems, subtotal } = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.priceETB * item.quantity,
      0
    );
    return { totalItems, subtotal };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return context;
}