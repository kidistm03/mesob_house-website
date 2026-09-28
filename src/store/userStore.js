import { create } from "zustand";
import { persist } from "zustand/middleware";

//  store the logged-in user
export const useUserStore = create(
  persist(
    (set) => ({
      // Current user (null = not logged in)
      user: null,

      // Call this after successful register or sign-in
      login: (userData) => {
        set({ user: userData });
      },

      // Call this when the user clicks Sign Out
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "mesob-user", // name used in localStorage
    }
  )
);