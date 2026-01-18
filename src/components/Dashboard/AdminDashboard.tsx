import React from 'react';
import { Card } from '../UI/Card';
import { mockSubscribers } from '../../pages/SubscribersPage';
import { mockSubscriptions } from '../../pages/SubscriptionsPage';
import { mockPayments } from '../../pages/PaymentsPage';
import {
  FiUsers,
  FiWifi,
  FiTrendingUp,
  FiAlertTriangle,
  FiServer,
  FiActivity,
} from 'react-icons/fi';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// ---- Helper to derive metrics from shared mock data ----

const parseKesAmount = (amount: string): number => {
  const numeric = amount.replace(/[^0-9.]/g, '');
  const value = Number(numeric || '0');
  return Number.isNaN(value) ? 0 : value;
};

const subscriptionGrowthData = [
  { month: 'Jan', active: 620, newSubs: 80 },
  { month: 'Feb', active: 670, newSubs: 95 },
  { month: 'Mar', active: 730, newSubs: 110 },
  { month: 'Apr', active: 790, newSubs: 120 },
  { month: 'May', active: 860, newSubs: 135 },
  { month: 'Jun', active: 930, newSubs: 145 },
  { month: 'Jul', active: 986, newSubs: 152 },
];

const revenueTrendData = [
  { month: 'Jan', revenue: 165000 },
  { month: 'Feb', revenue: 178500 },
  { month: 'Mar', revenue: 191200 },
  { month: 'Apr', revenue: 205400 },
  { month: 'May', revenue: 219800 },
  { month: 'Jun', revenue: 234900 },
  { month: 'Jul', revenue: 248500 },
];

const systemHealth = [
  {
    name: 'RADIUS Service',
    status: 'Healthy',
    detail: 'Auth & accounting responding',
    icon: FiServer,
    color: 'text-emerald-400',
  },
  {
    name: 'Payment Gateway',
    status: 'Degraded',
    detail: 'Intermittent webhook delays',
    icon: FiAlertTriangle,
    color: 'text-amber-300',
  },
  {
    name: 'Notification Engine',
    status: 'Healthy',
    detail: 'SMS & email queues normal',
    icon: FiActivity,
    color: 'text-emerald-400',
  },
  {
    name: 'Background Jobs',
    status: 'Healthy',
    detail: 'Expiry checks & reports on schedule',
    icon: FiServer,
    color: 'text-emerald-400',
  },
];

// ---- Component ----

const AdminDashboard: React.FC = () => {
  const totalSubscribers = mockSubscribers.length;
  const onlineSubscribers = mockSubscribers.filter((s) => s.online).length;
  const suspendedSubscribers = mockSubscribers.filter(
    (s) => s.subscriptionStatus === 'suspended',
  ).length;

  const activeSubscriptions = mockSubscriptions.filter((s) => s.status === 'active').length;

  const completedPayments = mockPayments.filter((p) => p.status === 'completed');
  const failedPayments = mockPayments.filter((p) => p.status === 'failed');
  const totalRevenueValue = completedPayments.reduce(
    (sum, p) => sum + parseKesAmount(p.amount),
    0,
  );

  type OverviewMetric = {
    label: string;
    value: number | string;
    trend: string;
    icon: React.ComponentType<{ className?: string }>;
  };

  const overviewMetrics: OverviewMetric[] = [
    {
      label: 'Total Subscribers',
      value: totalSubscribers,
      trend: `${onlineSubscribers} online now`,
      icon: FiUsers,
    },
    {
      label: 'Active Subscriptions',
      value: activeSubscriptions,
      trend: 'From mock subscriptions data',
      icon: FiWifi,
    },
    {
      label: 'Monthly Revenue',
      value: `KES ${totalRevenueValue.toLocaleString()}`,
      trend: 'From completed mock payments',
      icon: FiTrendingUp,
    },
    {
      label: 'Online / Offline',
      value: `${onlineSubscribers} / ${totalSubscribers}`,
      trend: 'Online now / total',
      icon: FiActivity,
    },
    {
      label: 'Suspended Subscribers',
      value: suspendedSubscribers,
      trend: 'From subscribers mock data',
      icon: FiAlertTriangle,
    },
    {
      label: 'Failed Payments (24h)',
      value: failedPayments.length,
      trend: 'From payments mock data',
      icon: FiAlertTriangle,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </header>

      {/* Live Overview */}
      <section>
        <h2 className="text-sm font-semibold text-slate-200 mb-2">Live Overview</h2>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {overviewMetrics.map((metric: OverviewMetric) => (
            <Card key={metric.label}>
              <div className="flex flex-col items-center justify-center gap-1 py-3 text-center">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-50">{metric.value}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{metric.trend}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Subscription Growth">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={subscriptionGrowthData}
                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#1f2937',
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="active"
                  name="Active"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="newSubs"
                  name="New"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Revenue Trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueTrendData}
                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `KES ${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(
                    value: number | string | (number | string)[] | undefined,
                  ) => {
                    const base = Array.isArray(value) ? value[0] : value;
                    const numeric = Number(base ?? 0);
                    return [`KES ${numeric.toLocaleString()}`, 'Revenue'];
                  }}
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#1f2937',
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* System Health */}
      <section>
        <h2 className="text-sm font-semibold text-slate-200 mb-2">System Health</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {systemHealth.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.name}>
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 border border-slate-800 ${item.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-300">{item.detail}</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-400">
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
