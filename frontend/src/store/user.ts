import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name?: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
 
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      token: null,

      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
