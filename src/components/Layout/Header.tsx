import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { role, logout } = useAuth();

  return (
    <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between bg-slate-950/80 backdrop-blur">
      <Link to="/" className="font-semibold text-lg">
        ISP Management Console
      </Link>
      <nav className="space-x-4 text-sm">
        {role === 'admin' && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/subscribers" className="hover:underline">
              Subscribers
            </Link>
            <Link to="/plans" className="hover:underline">
              Plans
            </Link>
            <button
              onClick={logout}
              className="ml-2 rounded bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700"
            >
              Logout
            </button>
          </>
        )}
        {role === 'subscriber' && (
          <>
            <Link to="/subscriber" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/payments" className="hover:underline">
              Payments
            </Link>
            <button
              onClick={logout}
              className="ml-2 rounded bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700"
            >
              Logout
            </button>
          </>
        )}
        {!role && (
          <>
            <Link to="/admin/login" className="hover:underline">
              Admin Login
            </Link>
            <Link to="/login" className="hover:underline">
              Subscriber Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
