import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Sidebar, { ADMIN_SECTIONS } from './components/Layout/Sidebar';
import SubscribersPage from './pages/SubscribersPage';
import SubscribersOnlineSessionsPage from './pages/SubscribersOnlineSessionsPage';
import AddSubscriberPage from './pages/AddSubscriberPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import PlansServicesPage from './pages/PlansServicesPage';
import PaymentsPage from './pages/PaymentsPage';
import UsageAnalyticsPage from './pages/UsageAnalyticsPage';
import SystemSettingsPage from './pages/SystemSettingsPage';
import AccountsPage from './pages/AccountsPage';
import SubscriberDashboardPage from './pages/SubscriberDashboardPage';
import { useAuth } from './hooks/useAuth';

// Basic role type for now (only admin and subscriber)
export type UserRole = 'admin' | 'subscriber';

const AppRoot: React.FC = () => {
  const { role, subscriberId } = useAuth();
  const [adminMobileNavOpen, setAdminMobileNavOpen] = useState(false);
  const [adminMobileSectionOpen, setAdminMobileSectionOpen] = useState<string | null>(null);
  const [adminNotificationsOpen, setAdminNotificationsOpen] = useState(false);

  const adminNotifications = [
    {
      id: '1',
      title: 'New subscriber signup',
      body: 'A new subscriber account was created.',
      time: '2 min ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Payment received',
      body: 'KES 2,500 payment recorded for ACC-123456.',
      time: '15 min ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Service health',
      body: 'All core services are operating normally.',
      time: '1 hr ago',
      unread: false,
    },
  ];

  const hasUnreadAdminNotifications = adminNotifications.some((n) => n.unread);

  return (
    <BrowserRouter>
      <div className="h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
        {role !== 'subscriber' && (
          <header className="sticky top-0 z-30 border-b border-slate-800 px-4 py-3 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2">
              {role === 'admin' && (
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 md:hidden"
                  aria-label="Open navigation"
                  onClick={() => {
                    setAdminMobileNavOpen(true);
                    setAdminMobileSectionOpen(null);
                  }}
                >
                  <FiMenu className="h-4 w-4" />
                </button>
              )}
            </div>
            <nav className="flex items-center gap-3 text-sm">
              <div className="relative">
                <button
                  type="button"
                  className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  aria-label="Notifications"
                  aria-expanded={adminNotificationsOpen}
                  onClick={() => setAdminNotificationsOpen((open) => !open)}
                >
                  <FiBell className="h-4 w-4" />
                  {hasUnreadAdminNotifications && (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500 ring-1 ring-slate-900" />
                  )}
                </button>
                {adminNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-lg border border-slate-800 bg-slate-950 shadow-xl text-xs z-40">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-100 tracking-wide uppercase">Notifications</p>
                        <p className="text-[10px] text-slate-400">Recent activity in your ISP console</p>
                      </div>
                      {hasUnreadAdminNotifications && (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/40">
                          New
                        </span>
                      )}
                    </div>
                    <ul className="max-h-64 overflow-y-auto divide-y divide-slate-800">
                      {adminNotifications.map((note) => (
                        <li key={note.id} className="px-3 py-2 hover:bg-slate-900 cursor-pointer">
                          <div className="flex items-start gap-2">
                            <span
                              className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                                note.unread ? 'bg-emerald-400' : 'bg-slate-600'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-[11px] font-semibold text-slate-100">{note.title}</p>
                              <p className="text-[11px] text-slate-400 line-clamp-2">{note.body}</p>
                              <p className="mt-0.5 text-[10px] text-slate-500">{note.time}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="px-3 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Notification center is mock-only for now.</span>
                      <button
                        type="button"
                        className="text-emerald-300 hover:text-emerald-200 font-medium"
                        onClick={() => setAdminNotificationsOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to={role === 'admin' ? '/account/profile' : '/admin/login'}
                className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                aria-label="Account"
              >
                <FiUser className="h-4 w-4" />
              </Link>
            </nav>
          </header>
        )}

        {role === 'admin' && adminMobileNavOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="relative w-4/5 max-w-xs bg-slate-950 border-r border-slate-800 shadow-xl flex flex-col transform transition-transform duration-200 ease-out translate-x-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  Admin Navigation
                </span>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  aria-label="Close navigation"
                  onClick={() => setAdminMobileNavOpen(false)}
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-sm">
                {ADMIN_SECTIONS.map((section) => {
                  const isOpen = adminMobileSectionOpen === section.id;
                  return (
                    <div key={section.id} className="border border-slate-800 rounded-lg">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200"
                        onClick={() =>
                          setAdminMobileSectionOpen((prev) => (prev === section.id ? null : section.id))
                        }
                      >
                        <span>{section.label}</span>
                        <span className="text-slate-500 text-[10px]">{isOpen ? 'Hide' : 'Show'}</span>
                      </button>
                      {isOpen && section.items.length > 0 && (
                        <nav className="border-t border-slate-800 bg-slate-950/80">
                          {section.items.map((item) => (
                            <Link
                              key={item.key}
                              to={item.path || '#'}
                              onClick={() => setAdminMobileNavOpen(false)}
                              className="block px-4 py-2 text-[11px] text-slate-200 hover:bg-slate-900 hover:text-emerald-400"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </nav>
                      )}
                      {isOpen && section.items.length === 0 && (
                        <nav className="border-t border-slate-800 bg-slate-950/80">
                          <Link
                            to="/dashboard"
                            onClick={() => setAdminMobileNavOpen(false)}
                            className="block px-4 py-2 text-[11px] text-slate-200 hover:bg-slate-900 hover:text-emerald-400"
                          >
                            Overview
                          </Link>
                        </nav>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="flex-1 bg-black/60"
              aria-label="Close navigation overlay"
              onClick={() => setAdminMobileNavOpen(false)}
            />
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {role === 'admin' && <Sidebar role={role} />}

          <main className="flex-1 px-4 py-4 overflow-y-auto">
            <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/login" element={<SubscriberLoginPage />} />
            <Route
              path="/dashboard"
              element={
                role === 'admin' ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscriber"
              element={
                role === 'subscriber' && subscriberId ? <SubscriberDashboardPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/subscribers"
              element={
                role === 'admin' ? (
                  <SubscribersPage mode="all" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/plans"
              element={
                role === 'admin' ? <PlansServicesPage mode="all" /> : <Navigate to="/admin/login" replace />
              }
            />
            {/* Subscribers sub-routes */}
            <Route
              path="/subscribers/active"
              element={
                role === 'admin' ? (
                  <SubscribersPage mode="active" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscribers/expired"
              element={
                role === 'admin' ? (
                  <SubscribersPage mode="expired" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscribers/online-sessions"
              element={
                role === 'admin' ? (
                  <SubscribersOnlineSessionsPage />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscribers/new"
              element={
                role === 'admin' ? (
                  <AddSubscriberPage />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* Subscriptions */}
            <Route
              path="/subscriptions/active"
              element={
                role === 'admin' ? (
                  <SubscriptionsPage mode="active" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscriptions/expired"
              element={
                role === 'admin' ? (
                  <SubscriptionsPage mode="expired" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscriptions/grace"
              element={
                role === 'admin' ? (
                  <SubscriptionsPage mode="grace" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/subscriptions/renewals"
              element={
                role === 'admin' ? <SubscriptionsPage mode="renewals" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/subscriptions/history"
              element={
                role === 'admin' ? (
                  <SubscriptionsPage mode="history" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* Plans & services extra routes */}
            <Route
              path="/plans/new"
              element={
                role === 'admin' ? <PlansServicesPage mode="create" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/plans/groups"
              element={
                role === 'admin' ? <PlansServicesPage mode="groups" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/plans/fair-usage"
              element={
                role === 'admin' ? (
                  <PlansServicesPage mode="fup" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* Billing & payments */}
            <Route
              path="/billing/payments"
              element={
                role === 'admin' ? <PaymentsPage mode="payments" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/billing/invoices"
              element={
                role === 'admin' ? <PaymentsPage mode="invoices" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/billing/receipts"
              element={
                role === 'admin' ? <PaymentsPage mode="receipts" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/billing/manual"
              element={
                role === 'admin' ? <PaymentsPage mode="manual" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/billing/refunds"
              element={
                role === 'admin' ? <PaymentsPage mode="refunds" /> : <Navigate to="/admin/login" replace />
              }
            />


            {/* Usage & analytics */}
            <Route
              path="/analytics/usage"
              element={
                role === 'admin' ? <UsageAnalyticsPage mode="data-usage" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/analytics/peak"
              element={
                role === 'admin' ? <UsageAnalyticsPage mode="peak-usage" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/analytics/revenue"
              element={
                role === 'admin' ? <UsageAnalyticsPage mode="revenue" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/analytics/subscriptions"
              element={
                role === 'admin' ? <UsageAnalyticsPage mode="subscriptions" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/analytics/export"
              element={
                role === 'admin' ? <UsageAnalyticsPage mode="export" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* Agents / resellers */}
            <Route
              path="/agents"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Agents" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/agents/subscribers"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Agent Subscribers" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/agents/commissions"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Commissions" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/agents/reports"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Agent Reports" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* Security & access */}
            <Route
              path="/security/admin-users"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Admin Users" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/security/roles"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Roles & Permissions" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/security/login-history"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Login History" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/security/ip-whitelisting"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="IP Whitelisting" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/security/sessions"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Active Sessions" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* System settings */}
            <Route
              path="/settings/company"
              element={
                role === 'admin' ? <SystemSettingsPage mode="company" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/settings/branding"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Branding" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/settings/locale"
              element={
                role === 'admin' ? <SystemSettingsPage mode="misc" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/settings/billing"
              element={
                role === 'admin' ? <SystemSettingsPage mode="billing" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/settings/grace"
              element={
                role === 'admin' ? <SystemSettingsPage mode="grace" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/settings/network"
              element={
                role === 'admin' ? <SystemSettingsPage mode="network" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/settings/payment-gateways"
              element={
                role === 'admin' ? <SystemSettingsPage mode="gateways" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* Audit & logs */}
            <Route
              path="/audit"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Audit Logs" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/audit/payments"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Payment Logs" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/audit/network"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Network Logs" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/audit/errors"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Error Logs" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* System health */}
            <Route
              path="/health/services"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Service Status" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/health/radius"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="RADIUS Health" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/health/payment-gateways"
              element={
                role === 'admin' ? (
                  <AdminPlaceholderPage title="Payment Gateway Status" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/health/notifications"
              element={
                role === 'admin' ? (
                  <AdminPlaceholderPage title="Notification Gateway Status" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/health/jobs"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Background Jobs" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* Support tools */}
            <Route
              path="/support/subscriber-lookup"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Subscriber Lookup" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/support/quick-suspend"
              element={
                role === 'admin' ? (
                  <AdminPlaceholderPage title="Quick Suspend / Restore" />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/support/session-reset"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Session Reset" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/support/notes"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Admin Notes" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/support/diagnostics"
              element={
                role === 'admin' ? <AdminPlaceholderPage title="Diagnostics" /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* Account */}
            <Route
              path="/account/profile"
              element={
                role === 'admin' ? <AccountsPage mode="profile" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/account/password"
              element={
                role === 'admin' ? <AccountsPage mode="password" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route
              path="/account/preferences"
              element={
                role === 'admin' ? <AccountsPage mode="preferences" /> : <Navigate to="/admin/login" replace />
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

interface AdminPlaceholderPageProps {
  title: string;
}

const AdminPlaceholderPage: React.FC<AdminPlaceholderPageProps> = ({ title }) => {
  return (
    <div className="space-y-3 max-w-5xl mx-auto text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-slate-300">
        This is a placeholder admin page. Detailed UI and actions will be wired here later.
      </p>
    </div>
  );
};

const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useAuth();
  const [adminKey, setAdminKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Stub: accept anything for now, just mark as admin
    loginAdmin();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-slate-900 border border-slate-800 rounded-lg p-6 shadow">
      <h1 className="text-2xl font-semibold mb-1 text-center">Admin Console</h1>
      <p className="text-sm text-slate-300 mb-6 text-center">
        Welcome back. Log in with your admin credentials.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Admin Key</label>
          <input
            type="text"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm font-medium"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

const SubscriberLoginPage: React.FC = () => {
  const { loginSubscriber } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      return;
    }
    // Stub: trust the entered username for now
    loginSubscriber(username.trim());
    navigate('/subscriber');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-slate-900 border border-slate-800 rounded-lg p-6 shadow">
      <h1 className="text-2xl font-semibold mb-1 text-center">Name of Internet</h1>
      <p className="text-sm text-slate-300 mb-6 text-center">
        Welcome back. Log in to your account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-300">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-3 w-3 rounded border-slate-700 bg-slate-950"
            />
            <span>Remember me</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm font-medium"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

// DashboardPage is now provided by ./pages/DashboardPage and renders the full AdminDashboard.

export default AppRoot;
