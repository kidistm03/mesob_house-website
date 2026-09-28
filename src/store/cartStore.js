import { create } from "zustand";

// Zustand store = one place that holds cart data + actions
export const useCartStore = create((set, get) => ({
  // ----- STATE -----
  cartItems: [],

  // ----- ACTIONS -----
  addToCart: (dish, quantity = 1) => {
    set((state) => {
      const existing = state.cartItems.find((item) => item.id === dish.id);

      if (existing) {
        // Increase quantity if the dish is already in the cart
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      // Otherwise add a new item
      return {
        cartItems: [...state.cartItems, { ...dish, quantity }],
      };
    });
  },

  updateQuantity: (dishId, newQuantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === dishId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  removeFromCart: (dishId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== dishId),
    }));
  },

  clearCart: () => set({ cartItems: [] }),

  // ----- DERIVED VALUES (computed from cartItems) -----
  // Call these as functions: totalItems(), subtotal()
  totalItems: () =>
    get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

  subtotal: () =>
    get().cartItems.reduce(
      (sum, item) => sum + item.priceETB * item.quantity,
      0
    ),
}));