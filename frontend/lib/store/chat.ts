// lib/store/chat.ts

import { Chat } from "@/schema/ChatSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ChatState {
  chat: Chat | null;
  // setChat: (chat: Chat | null) => void;
}

export const useChat = create<ChatState>()(
  persist(
    (set) => ({
      chat: null, // default state
      // setChat: (newUser) => set((state) => ({ user: newUser })),
    }),
    { name: "userStorage" }
  )
);
