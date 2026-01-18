import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 px-4 py-2 text-xs text-slate-500 bg-slate-950/80">
      <span>© {new Date().getFullYear()} ISP Subscriber Management & Billing</span>
    </footer>
  );
};

export default Footer;
