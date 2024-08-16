// lib/store/messages.ts
import { Message } from "@/schema/MessageSchema";
import { create } from "zustand";

interface MessageState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  setMessages: (newMessages) =>
    set((state) => ({ messages: [...newMessages] })),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
