// lib/store/chat.ts

import { Chat } from "@/schema/ChatSchema";
import { create } from "zustand";

interface ChatState {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
}

export const useChat = create<ChatState>()((set) => ({
  chats: [],
  setChats: (chats) => set((state) => ({ chats: [...chats] })),
  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats.filter((el) => el._id != chat._id)],
    })),
}));
