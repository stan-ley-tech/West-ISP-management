import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">ISP Subscriber Management & Billing</h1>
        <p className="text-slate-300 text-sm">
          Choose your portal to continue.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          to="/admin/login"
          className="block bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-emerald-500 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-2">Admin Portal</h2>
          <p className="text-sm text-slate-300">
            Manage subscribers, plans, subscriptions, and payments.
          </p>
        </Link>
        <Link
          to="/login"
          className="block bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-emerald-500 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-2">Subscriber Portal</h2>
          <p className="text-sm text-slate-300">
            View your status, expiry date, and renew your plan.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
