import React, { useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';

const Toast: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 5000)
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-3 py-2 rounded text-xs shadow border border-slate-800 bg-slate-900/90 ${
            n.variant === 'success'
              ? 'text-emerald-300'
              : n.variant === 'error'
              ? 'text-red-300'
              : 'text-slate-200'
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
