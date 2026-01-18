import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm">
      {title && <h2 className="text-sm font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
};
