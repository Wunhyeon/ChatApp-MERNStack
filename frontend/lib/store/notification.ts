import { Notification } from "@/schema/NotiSchema";
import { create } from "zustand";

interface NotificationState {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
}

export const useNotification = create<NotificationState>()((set) => ({
  notifications: [],
  setNotifications: (notifications) =>
    set((state) => ({ notifications: [...notifications] })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
}));
