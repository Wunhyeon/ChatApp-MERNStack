// lib/store/user.ts

import { User } from "@/schema/UserShema";
import { createContext } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export type UserStore = ReturnType<typeof useUser>;

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: null, // default state
      setUser: (newUser) => set((state) => ({ user: newUser })),
    }),
    { name: "userStorage" }
  )
);

export const UserContext = createContext<UserStore | null>(null);
