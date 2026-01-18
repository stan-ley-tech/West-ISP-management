import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export type NotificationVariant = 'info' | 'success' | 'error' | 'warning';

export interface NotificationItem {
  id: string;
  message: string;
  variant: NotificationVariant;
}

interface NotificationContextValue {
  notifications: NotificationItem[];
  addNotification: (message: string, variant?: NotificationVariant) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((message: string, variant: NotificationVariant = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setNotifications((prev) => [...prev, { id, message, variant }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotificationContext(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return ctx;
}
