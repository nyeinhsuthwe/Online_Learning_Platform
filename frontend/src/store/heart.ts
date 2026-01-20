import { create } from "zustand";
import { persist } from "zustand/middleware";
interface HeartStore {
  heartedComments: Record<string, string[]>; 
  toggleHeart: (commentId: string, userId: string) => void;
  setHearts: (commentId: string, users: string[]) => void;
}

export const useHeartStore = create(
  persist<HeartStore>(
    (set) => ({
      heartedComments: {},
      toggleHeart: (commentId, userId) =>
        set((state) => {
          const users = state.heartedComments[commentId] || [];
          const updated = users.includes(userId)
            ? users.filter((id) => id !== userId)
            : [...users, userId];
          return { heartedComments: { ...state.heartedComments, [commentId]: updated } };
        }),
      setHearts: (commentId, users) =>
        set((state) => ({ heartedComments: { ...state.heartedComments, [commentId]: users } })),
    }),
    { name: "hearts-storage" } 
  )
);
