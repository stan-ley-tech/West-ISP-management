import React from 'react';

interface AlertProps {
  variant?: 'info' | 'success' | 'error' | 'warning';
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', children }) => {
  const base = 'px-3 py-2 rounded text-xs border';
  const styles: Record<string, string> = {
    info: 'bg-slate-900 border-slate-700 text-slate-200',
    success: 'bg-emerald-950 border-emerald-600 text-emerald-200',
    error: 'bg-red-950 border-red-700 text-red-200',
    warning: 'bg-amber-950 border-amber-600 text-amber-200',
  };

  return <div className={`${base} ${styles[variant]}`}>{children}</div>;
};

export default Alert;
