import React, { useMemo, useState } from 'react';
import { Table } from '../components/UI/Table';
import { FiEdit, FiPauseCircle, FiKey } from 'react-icons/fi';

type SubscribersMode = 'all' | 'active' | 'expired';

interface SubscribersPageProps {
  mode?: SubscribersMode;
}

export interface UiSubscriber {
  id: string;
  name: string;
  phone: string;
  email: string;
  pppoe_username: string;
  created_at: string;
  currentPlan: string;
  subscriptionStatus: 'active' | 'expired' | 'suspended';
  expiryDate: string;
  online: boolean;
}

export const mockSubscribers: UiSubscriber[] = [
  {
    id: 'sub-1',
    name: 'John Doe',
    phone: '+254700000001',
    email: 'john@example.com',
    pppoe_username: 'john.pppoe',
    created_at: '2024-01-05',
    currentPlan: 'Home 10Mbps',
    subscriptionStatus: 'active',
    expiryDate: '2024-02-05',
    online: true,
  },
  {
    id: 'sub-2',
    name: 'Jane Smith',
    phone: '+254700000002',
    email: 'jane@example.com',
    pppoe_username: 'jane.pppoe',
    created_at: '2023-11-20',
    currentPlan: 'Business 50Mbps',
    subscriptionStatus: 'expired',
    expiryDate: '2023-12-20',
    online: false,
  },
  {
    id: 'sub-3',
    name: 'Grace User',
    phone: '+254700000003',
    email: 'grace@example.com',
    pppoe_username: 'grace.pppoe',
    created_at: '2023-12-28',
    currentPlan: 'Home 20Mbps',
    subscriptionStatus: 'suspended',
    expiryDate: '2024-01-28',
    online: false,
  },
];

const SubscribersPage: React.FC<SubscribersPageProps> = ({ mode = 'all' }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'suspended'>(
    mode === 'active' ? 'active' : mode === 'expired' ? 'expired' : 'all',
  );
  const [planFilter, setPlanFilter] = useState<'all' | 'home' | 'business'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | '7d' | '30d' | '90d'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const filtered = useMemo(() => {
    let rows = mockSubscribers;

    if (mode === 'active') {
      rows = rows.filter((s) => s.subscriptionStatus === 'active');
    }
    if (mode === 'expired') {
      rows = rows.filter((s) => s.subscriptionStatus === 'expired');
    }

    if (statusFilter !== 'all') {
      rows = rows.filter((s) => s.subscriptionStatus === statusFilter);
    }

    if (planFilter !== 'all') {
      rows = rows.filter((s) =>
        planFilter === 'home' ? s.currentPlan.includes('Home') : s.currentPlan.includes('Business'),
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((s) => {
        return (
          s.name.toLowerCase().includes(q) ||
          (s.pppoe_username || '').toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q)
        );
      });
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const days = dateFilter === '7d' ? 7 : dateFilter === '30d' ? 30 : 90;
      const cutoff = new Date(now);
      cutoff.setDate(now.getDate() - days);

      rows = rows.filter((s) => {
        const created = new Date(s.created_at);
        if (Number.isNaN(created.getTime())) return true;
        return created >= cutoff;
      });
    }

    return rows;
  }, [mode, statusFilter, planFilter, search, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(pageStart, pageStart + pageSize);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(pageRows.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const hasSelection = selectedIds.length > 0;

  const title = mode === 'active' ? 'Active Subscribers' : mode === 'expired' ? 'Expired Subscribers' : 'All Subscribers';

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      <div className="flex flex-wrap items-center gap-3 justify-between text-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name, username, or phone"
          className="w-full sm:w-72 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
            className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value as any);
              setPage(1);
            }}
            className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
          >
            <option value="all">All Plans</option>
            <option value="home">Home Plans</option>
            <option value="business">Business Plans</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value as any);
              setPage(1);
            }}
            className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
          >
            <option value="all">All Created Dates</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {hasSelection && (
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-900/80 border border-slate-800 rounded px-3 py-2">
          <span className="text-slate-300">{selectedIds.length} selected</span>
          <button className="text-amber-400 hover:underline">Suspend selected</button>
          <button className="text-emerald-400 hover:underline">Restore selected</button>
          <button className="text-sky-400 hover:underline">Assign plan</button>
        </div>
      )}

      <Table
        headers={[
              <input
                key="select-all"
                type="checkbox"
                className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                checked={pageRows.length > 0 && selectedIds.length === pageRows.length}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />,
              'Subscriber Name',
              'Username (PPPoE)',
              'Phone',
              'Email',
              'Current Plan',
              'Subscription Status',
              'Expiry Date',
              'Online',
              'Actions',
        ]}
      >
        {pageRows.map((s) => (
              <tr
                key={s.id}
                className={`border-t border-slate-800 ${
                  mode === 'expired' || s.subscriptionStatus === 'expired' ? 'bg-red-950/20' : ''
                }`}
              >
                <td className="px-3 py-2 align-middle">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                    checked={selectedIds.includes(s.id)}
                    onChange={(e) => toggleSelectOne(s.id, e.target.checked)}
                  />
                </td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2">{s.pppoe_username || '-'}</td>
                <td className="px-3 py-2">{s.phone}</td>
                <td className="px-3 py-2">{s.email}</td>
                <td className="px-3 py-2">{s.currentPlan}</td>
                <td
                  className={`px-3 py-2 capitalize ${
                    s.subscriptionStatus === 'active'
                      ? 'text-emerald-400'
                      : s.subscriptionStatus === 'expired'
                      ? 'text-red-400'
                      : 'text-amber-300'
                  }`}
                >
                  {s.subscriptionStatus}
                </td>
                <td className="px-3 py-2">{s.expiryDate}</td>
                <td className="px-3 py-2">
                  {s.online ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-slate-500" /> Offline
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 space-x-1 text-xs">
                  <button
                    className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                    aria-label="Edit subscriber"
                  >
                    <FiEdit className="h-3 w-3" />
                  </button>
                  <button
                    className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-amber-400 hover:bg-slate-800"
                    aria-label="Suspend subscriber"
                  >
                    <FiPauseCircle className="h-3 w-3" />
                  </button>
                  <button
                    className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                    aria-label="Reset subscriber password"
                  >
                    <FiKey className="h-3 w-3" />
                  </button>
                </td>
              </tr>
        ))}
        {pageRows.length === 0 && (
          <tr>
            <td className="px-3 py-3 text-sm text-slate-400" colSpan={10}>
              No subscribers found.
            </td>
          </tr>
        )}
      </Table>

      <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
        <span>
          Showing {filtered.length === 0 ? 0 : pageStart + 1}–
          {Math.min(pageStart + pageRows.length, filtered.length)} of {filtered.length}
        </span>
        <div className="space-x-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2 py-1 rounded border border-slate-700 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-2 py-1 rounded border border-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribersPage;
