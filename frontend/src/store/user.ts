import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin";
  bio?: string
  password : string
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token?: string) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user, token) =>
        set((state) => ({
          user,
          token: token ?? state.token,
        })),

      updateUser: (updated) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updated } : null,
        })),

      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth" }
  )
);
