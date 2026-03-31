import { create } from "zustand";
import { persist } from "zustand/middleware";

type ChatNotificationState = {
  unreadCount: number;
  isChatOpen: boolean;
  increment: () => void;
  clear: () => void;
  setChatOpen: (open: boolean) => void;
};

export const useChatNotifications = create<ChatNotificationState>()(
  persist(
    (set) => ({
      unreadCount: 0,
      isChatOpen: false,
      increment: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
      clear: () => set({ unreadCount: 0 }),
      setChatOpen: (open) => set({ isChatOpen: open }),
    }),
    {
      name: "chat-notifications",
    }
  )
);
