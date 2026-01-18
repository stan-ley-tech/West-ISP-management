import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  if (parts.length === 0) return null;

  let path = '';

  return (
    <nav className="text-xs text-slate-400 mb-3" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 flex-wrap">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {parts.map((part, idx) => {
          path += `/${part}`;
          const isLast = idx === parts.length - 1;
          const label = part.charAt(0).toUpperCase() + part.slice(1);
          return (
            <li key={path} className="flex items-center gap-1">
              <span>/</span>
              {isLast ? (
                <span className="text-slate-200">{label}</span>
              ) : (
                <Link to={path} className="hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
