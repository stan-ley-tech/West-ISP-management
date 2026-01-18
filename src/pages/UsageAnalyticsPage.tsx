import React, { useMemo, useState } from 'react';
import { Table } from '../components/UI/Table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export type UsageAnalyticsMode = 'data-usage' | 'peak-usage' | 'revenue' | 'subscriptions' | 'export';

interface UsageAnalyticsPageProps {
  mode: UsageAnalyticsMode;
}

const mockDataUsage = [
  { day: 'Mon', usedGb: 120 },
  { day: 'Tue', usedGb: 150 },
  { day: 'Wed', usedGb: 180 },
  { day: 'Thu', usedGb: 160 },
  { day: 'Fri', usedGb: 210 },
  { day: 'Sat', usedGb: 250 },
  { day: 'Sun', usedGb: 190 },
];

const mockPeakUsage = [
  { hour: '00:00', mbps: 80 },
  { hour: '06:00', mbps: 120 },
  { hour: '12:00', mbps: 200 },
  { hour: '18:00', mbps: 310 },
  { hour: '21:00', mbps: 350 },
];

const mockRevenue = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 135000 },
  { month: 'Mar', revenue: 150000 },
];

const mockSubscriptionsTrend = [
  { month: 'Jan', active: 120, expired: 15, grace: 8 },
  { month: 'Feb', active: 135, expired: 12, grace: 10 },
  { month: 'Mar', active: 150, expired: 10, grace: 9 },
];

const UsageAnalyticsPage: React.FC<UsageAnalyticsPageProps> = ({ mode }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [subscriberQuery, setSubscriberQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');

  const title = useMemo(() => {
    switch (mode) {
      case 'data-usage':
        return 'Data Usage';
      case 'peak-usage':
        return 'Peak Usage';
      case 'revenue':
        return 'Revenue Reports';
      case 'subscriptions':
        return 'Subscription Reports';
      case 'export':
        return 'Export Data';
      default:
        return 'Usage & Analytics';
    }
  }, [mode]);


  const renderFilters = () => (
    <div className="flex flex-wrap items-center gap-3 justify-between text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as any)}
          className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
        >
          <option value="all">All Plans</option>
          <option value="home">Home Plans</option>
          <option value="business">Business Plans</option>
        </select>
      </div>
      <input
        type="text"
        value={subscriberQuery}
        onChange={(e) => setSubscriberQuery(e.target.value)}
        placeholder="Filter by subscriber or username"
        className="w-full sm:w-72 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-xs"
      />
    </div>
  );

  const renderDataUsage = () => (
    <>
      {renderFilters()}

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg p-3">
          <h2 className="text-sm font-semibold mb-2">Daily Data Usage (GB)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockDataUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip cursor={{ stroke: '#475569' }} />
              <Line type="monotone" dataKey="usedGb" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Sample Session Usage (mock)</h2>
          <Table
            headers={[
              'Subscriber',
              'Username',
              'Plan',
              'Session Start',
              'Session End',
              'Uploaded',
              'Downloaded',
              'Total Used',
            ]}
          >
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">John Doe</td>
              <td className="px-3 py-2">john.pppoe</td>
              <td className="px-3 py-2">Home 10Mbps</td>
              <td className="px-3 py-2">2024-01-10 09:00</td>
              <td className="px-3 py-2">2024-01-10 11:00</td>
              <td className="px-3 py-2">1.2 GB</td>
              <td className="px-3 py-2">3.4 GB</td>
              <td className="px-3 py-2">4.6 GB</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">Jane Smith</td>
              <td className="px-3 py-2">jane.pppoe</td>
              <td className="px-3 py-2">Business 50Mbps</td>
              <td className="px-3 py-2">2024-01-10 08:30</td>
              <td className="px-3 py-2">2024-01-10 12:00</td>
              <td className="px-3 py-2">6.8 GB</td>
              <td className="px-3 py-2">12.1 GB</td>
              <td className="px-3 py-2">18.9 GB</td>
            </tr>
          </Table>
        </div>
      </div>
    </>
  );

  const renderPeakUsage = () => (
    <>
      {renderFilters()}
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg p-3">
          <h2 className="text-sm font-semibold mb-2">Peak Bandwidth by Time of Day</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockPeakUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip cursor={{ fill: '#020617' }} />
              <Bar dataKey="mbps" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Top Subscribers by Peak Usage (mock)</h2>
          <Table
            headers={['Subscriber', 'Plan', 'Peak Time', 'Max Bandwidth (Mbps)', 'Duration of Peak']}
          >
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">John Doe</td>
              <td className="px-3 py-2">Home 10Mbps</td>
              <td className="px-3 py-2">21:00</td>
              <td className="px-3 py-2">45</td>
              <td className="px-3 py-2">15 min</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">Jane Smith</td>
              <td className="px-3 py-2">Business 50Mbps</td>
              <td className="px-3 py-2">18:30</td>
              <td className="px-3 py-2">90</td>
              <td className="px-3 py-2">25 min</td>
            </tr>
          </Table>
        </div>
      </div>
    </>
  );

  const renderRevenue = () => (
    <>
      {renderFilters()}
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg p-3">
          <h2 className="text-sm font-semibold mb-2">Monthly Revenue (KES)</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip cursor={{ fill: '#020617' }} />
              <Bar dataKey="revenue" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Sample Revenue Breakdown (mock)</h2>
          <Table
            headers={['Subscriber', 'Plan', 'Amount Paid', 'Payment Method', 'Date / Time']}
          >
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">John Doe</td>
              <td className="px-3 py-2">Home 10Mbps</td>
              <td className="px-3 py-2">KES 1,999</td>
              <td className="px-3 py-2">Mpesa</td>
              <td className="px-3 py-2">2024-01-10 09:30</td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">Grace User</td>
              <td className="px-3 py-2">Home 20Mbps</td>
              <td className="px-3 py-2">KES 2,999</td>
              <td className="px-3 py-2">Card</td>
              <td className="px-3 py-2">2024-01-11 14:10</td>
            </tr>
          </Table>
        </div>
      </div>
    </>
  );

  const renderSubscriptions = () => (
    <>
      {renderFilters()}
      <div className="h-72 bg-slate-950 border border-slate-800 rounded-lg p-3 mt-4">
        <h2 className="text-sm font-semibold mb-2">Subscriptions by Status (mock)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockSubscriptionsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip cursor={{ stroke: '#475569' }} />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#22c55e" strokeWidth={2} />
            <Line type="monotone" dataKey="expired" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="grace" stroke="#eab308" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-sm font-semibold">Sample Subscription Records (mock)</h2>
        <Table
          headers={['Subscriber', 'Plan', 'Start Date', 'Expiry Date', 'Status', 'Renewal Dates']}
        >
          <tr className="border-t border-slate-800">
            <td className="px-3 py-2">John Doe</td>
            <td className="px-3 py-2">Home 10Mbps</td>
            <td className="px-3 py-2">2024-01-01</td>
            <td className="px-3 py-2">2024-02-01</td>
            <td className="px-3 py-2 text-emerald-400">Active</td>
            <td className="px-3 py-2 text-xs text-slate-300">2024-01-01, 2024-02-01 (next)</td>
          </tr>
          <tr className="border-t border-slate-800">
            <td className="px-3 py-2">Jane Smith</td>
            <td className="px-3 py-2">Business 50Mbps</td>
            <td className="px-3 py-2">2023-11-01</td>
            <td className="px-3 py-2">2023-12-01</td>
            <td className="px-3 py-2 text-red-400">Expired</td>
            <td className="px-3 py-2 text-xs text-slate-300">2023-11-01</td>
          </tr>
        </Table>
      </div>
    </>
  );

  const renderExport = () => (
    <div className="space-y-4 mt-4">
      {renderFilters()}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 bg-slate-950 border border-slate-800 rounded-lg p-4">
          <h2 className="text-sm font-semibold">Export Data Usage</h2>
          <p className="text-xs text-slate-300 mb-2">
            Exports filtered data usage records (per-subscriber, per-session) as CSV or PDF.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 hover:bg-slate-800">
              Export CSV
            </button>
            <button className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 hover:bg-slate-800">
              Export PDF
            </button>
          </div>
        </div>
        <div className="space-y-2 bg-slate-950 border border-slate-800 rounded-lg p-4">
          <h2 className="text-sm font-semibold">Export Revenue Reports</h2>
          <p className="text-xs text-slate-300 mb-2">
            Exports filtered revenue and payment data as CSV/PDF. Later this will call /analytics/export.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 hover:bg-slate-800">
              Export CSV
            </button>
            <button className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 hover:bg-slate-800">
              Export PDF
            </button>
          </div>
        </div>
        <div className="space-y-2 bg-slate-950 border border-slate-800 rounded-lg p-4 md:col-span-2">
          <h2 className="text-sm font-semibold">Export Subscription Reports</h2>
          <p className="text-xs text-slate-300 mb-2">
            Includes active, expired, and grace period subscriptions and renewal history.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 hover:bg-slate-800">
              Export CSV
            </button>
            <button className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 hover:bg-slate-800">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      {mode === 'data-usage' && renderDataUsage()}
      {mode === 'peak-usage' && renderPeakUsage()}
      {mode === 'revenue' && renderRevenue()}
      {mode === 'subscriptions' && renderSubscriptions()}
      {mode === 'export' && renderExport()}
    </div>
  );
};

export default UsageAnalyticsPage;
