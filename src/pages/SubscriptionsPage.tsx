import React, { useMemo, useState } from 'react';
import { Table } from '../components/UI/Table';
import {
  FiPauseCircle,
  FiShuffle,
  FiClock,
  FiBell,
  FiTrash2,
  FiRotateCcw,
  FiSend,
} from 'react-icons/fi';

export interface SubscriptionRow {
  id: string;
  subscriberName: string;
  username: string;
  planName: string;
  startDate?: string;
  expiryDate: string;
  daysRemaining?: number;
  daysExpired?: number;
  lastPayment?: string;
  status: 'active' | 'expired' | 'grace' | 'pending' | 'completed';
}

type SubscriptionsMode = 'active' | 'expired' | 'grace' | 'renewals' | 'history';

interface SubscriptionsPageProps {
  mode: SubscriptionsMode;
}

export const mockSubscriptions: SubscriptionRow[] = [
  {
    id: '1',
    subscriberName: 'John Doe',
    username: 'john.pppoe',
    planName: 'Home 20Mbps',
    startDate: '2024-01-01',
    expiryDate: '2024-02-01',
    daysRemaining: 12,
    status: 'active',
    lastPayment: '2024-01-01',
  },
  {
    id: '2',
    subscriberName: 'Jane Smith',
    username: 'jane.pppoe',
    planName: 'Business 50Mbps',
    startDate: '2023-11-01',
    expiryDate: '2023-12-01',
    daysExpired: 45,
    status: 'expired',
    lastPayment: '2023-11-01',
  },
  {
    id: '3',
    subscriberName: 'Grace User',
    username: 'grace.pppoe',
    planName: 'Home 10Mbps',
    startDate: '2023-12-15',
    expiryDate: '2024-01-15',
    daysRemaining: 3,
    status: 'grace',
    lastPayment: '2023-12-15',
  },
];

const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({ mode }) => {
  const [search, setSearch] = useState('');

  const title = useMemo(() => {
    switch (mode) {
      case 'active':
        return 'Active Subscriptions';
      case 'expired':
        return 'Expired Subscriptions';
      case 'grace':
        return 'Grace Period Subscriptions';
      case 'renewals':
        return 'Renewals';
      case 'history':
        return 'Subscription History';
      default:
        return 'Subscriptions';
    }
  }, [mode]);

  const filtered = useMemo(() => {
    return mockSubscriptions.filter((sub) => {
      if (mode === 'active' && sub.status !== 'active') return false;
      if (mode === 'expired' && sub.status !== 'expired') return false;
      if (mode === 'grace' && sub.status !== 'grace') return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        sub.subscriberName.toLowerCase().includes(q) ||
        sub.username.toLowerCase().includes(q) ||
        sub.planName.toLowerCase().includes(q)
      );
    });
  }, [mode, search]);

  const renderTable = () => {
    if (mode === 'active') {
      return (
        <Table
          headers={[
            'Subscriber Name',
            'Username (PPPoE)',
            'Plan Name',
            'Start Date',
            'Expiry Date',
            'Days Remaining',
            'Status',
            'Actions',
          ]}
        >
          {filtered.map((sub) => (
            <tr key={sub.id} className="border-t border-slate-800">
              <td className="px-3 py-2">{sub.subscriberName}</td>
              <td className="px-3 py-2">{sub.username}</td>
              <td className="px-3 py-2">{sub.planName}</td>
              <td className="px-3 py-2">{sub.startDate ?? '-'}</td>
              <td className="px-3 py-2">{sub.expiryDate}</td>
              <td className="px-3 py-2">{sub.daysRemaining ?? '-'}</td>
              <td className="px-3 py-2 text-emerald-400">Active</td>
              <td className="px-3 py-2 space-x-1 text-xs">
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-amber-400 hover:bg-slate-800"
                  aria-label="Suspend subscription"
                >
                  <FiPauseCircle className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                  aria-label="Upgrade or downgrade plan"
                >
                  <FiShuffle className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                  aria-label="Extend subscription"
                >
                  <FiClock className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      );
    }

    if (mode === 'expired') {
      return (
        <Table
          headers={[
            'Subscriber Name',
            'Username',
            'Plan',
            'Expiry Date',
            'Days Expired',
            'Last Payment',
            'Actions',
          ]}
        >
          {filtered.map((sub) => (
            <tr key={sub.id} className="border-t border-slate-800 bg-red-950/20">
              <td className="px-3 py-2">{sub.subscriberName}</td>
              <td className="px-3 py-2">{sub.username}</td>
              <td className="px-3 py-2">{sub.planName}</td>
              <td className="px-3 py-2">{sub.expiryDate}</td>
              <td className="px-3 py-2">{sub.daysExpired ?? '-'}</td>
              <td className="px-3 py-2">{sub.lastPayment ?? '-'}</td>
              <td className="px-3 py-2 space-x-1 text-xs">
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                  aria-label="Renew subscription"
                >
                  <FiRotateCcw className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                  aria-label="Notify subscriber"
                >
                  <FiBell className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                  aria-label="Delete subscription record"
                >
                  <FiTrash2 className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      );
    }

    if (mode === 'grace') {
      return (
        <Table
          headers={[
            'Subscriber Name',
            'Username',
            'Plan',
            'Expiry Date',
            'Days Remaining in Grace',
            'Status',
            'Actions',
          ]}
        >
          {filtered.map((sub) => (
            <tr key={sub.id} className="border-t border-slate-800 bg-amber-950/20">
              <td className="px-3 py-2">{sub.subscriberName}</td>
              <td className="px-3 py-2">{sub.username}</td>
              <td className="px-3 py-2">{sub.planName}</td>
              <td className="px-3 py-2">{sub.expiryDate}</td>
              <td className="px-3 py-2">{sub.daysRemaining ?? '-'}</td>
              <td className="px-3 py-2 text-amber-300">Grace Period</td>
              <td className="px-3 py-2 space-x-1 text-xs">
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                  aria-label="Extend grace period"
                >
                  <FiClock className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                  aria-label="Suspend subscriber"
                >
                  <FiPauseCircle className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                  aria-label="Notify subscriber"
                >
                  <FiBell className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      );
    }

    if (mode === 'renewals') {
      return (
        <Table
          headers={[
            'Subscriber Name',
            'Username',
            'Plan',
            'Expiry Date',
            'Renewal Status',
            'Last Payment',
            'Actions',
          ]}
        >
          {filtered.map((sub) => (
            <tr key={sub.id} className="border-t border-slate-800">
              <td className="px-3 py-2">{sub.subscriberName}</td>
              <td className="px-3 py-2">{sub.username}</td>
              <td className="px-3 py-2">{sub.planName}</td>
              <td className="px-3 py-2">{sub.expiryDate}</td>
              <td className="px-3 py-2 capitalize">{sub.status}</td>
              <td className="px-3 py-2">{sub.lastPayment ?? '-'}</td>
              <td className="px-3 py-2 space-x-1 text-xs">
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                  aria-label="Renew subscription"
                >
                  <FiRotateCcw className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                  aria-label="Resend invoice"
                >
                  <FiSend className="h-3 w-3" />
                </button>
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                  aria-label="Notify subscriber"
                >
                  <FiBell className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      );
    }

    // history
    return (
      <Table
        headers={[
          'Subscriber Name',
          'Username',
          'Plan',
          'Start Date',
          'Expiry Date',
          'Status',
          'Action Taken',
          'Admin',
        ]}
      >
        {filtered.map((sub) => (
          <tr key={sub.id} className="border-t border-slate-800">
            <td className="px-3 py-2">{sub.subscriberName}</td>
            <td className="px-3 py-2">{sub.username}</td>
            <td className="px-3 py-2">{sub.planName}</td>
            <td className="px-3 py-2">{sub.startDate ?? '-'}</td>
            <td className="px-3 py-2">{sub.expiryDate}</td>
            <td className="px-3 py-2 capitalize">{sub.status}</td>
            <td className="px-3 py-2 text-xs text-slate-300">Created (mock)</td>
            <td className="px-3 py-2 text-xs text-slate-300">admin@example.com</td>
          </tr>
        ))}
      </Table>
    );
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      <div className="flex flex-wrap items-center gap-3 justify-between text-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by subscriber, username, or plan"
          className="w-full sm:w-72 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
        />
      </div>

      {renderTable()}
    </div>
  );
};

export default SubscriptionsPage;
