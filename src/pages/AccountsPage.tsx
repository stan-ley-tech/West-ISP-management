import React, { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

export type AccountsMode = 'profile' | 'password' | 'preferences' | 'logout';

interface AccountsPageProps {
  mode: AccountsMode;
}

const AccountsPage: React.FC<AccountsPageProps> = ({ mode }) => {
  const { logout } = useAuth();

  const title = useMemo(() => {
    switch (mode) {
      case 'profile':
        return 'Admin Profile Overview';
      case 'password':
        return 'Security & Authentication';
      case 'preferences':
        return 'Admin Preferences';
      case 'logout':
        return 'Logout';
      default:
        return 'Account';
    }
  }, [mode]);

  const adminProfile = {
    fullName: 'Admin User',
    email: 'admin@example.com',
    phone: '+254700000000',
    role: 'System Admin',
    status: 'Active' as 'Active' | 'Inactive',
  };

  const initials = adminProfile.fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const renderProfile = () => (
    <div className="space-y-6 max-w-4xl mx-auto mt-4 text-sm">
      {/* Top card: admin overview */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-5 flex flex-col items-center gap-3 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-base font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">{adminProfile.fullName}</p>
          <p className="text-xs text-slate-300">{adminProfile.email}</p>
          <p className="text-xs text-slate-400">{adminProfile.phone}</p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-600/10 px-2 py-0.5 text-emerald-300">
            {adminProfile.status}
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-slate-200">
            {adminProfile.role}
          </span>
        </div>
        <button
          type="button"
          className="mt-1 inline-flex items-center rounded border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800"
        >
          Edit Profile
        </button>
      </section>

      {/* Read-only admin details */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Identity
          </h2>
          <dl className="space-y-1 text-xs text-slate-200">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Full name</dt>
              <dd>{adminProfile.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Email (login)</dt>
              <dd>{adminProfile.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Phone</dt>
              <dd>{adminProfile.phone}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Access
          </h2>
          <dl className="space-y-1 text-xs text-slate-200">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Role</dt>
              <dd>{adminProfile.role}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Status</dt>
              <dd>{adminProfile.status}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* System settings summary */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
          System Settings
        </h2>
        <p className="text-[11px] text-slate-400 mb-3">
          Key system-level settings managed for your ISP environment. These are shown here for quick reference; in a
          real deployment they would be powered by the settings API.
        </p>
        <ul className="space-y-2 text-xs text-slate-200">
          <li className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Timezone &amp; Currency</p>
              <p className="text-slate-400">Regional defaults for billing and reporting.</p>
            </div>
          </li>
          <li className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Billing Rules</p>
              <p className="text-slate-400">Invoicing cycles, grace logic, and rounding.</p>
            </div>
          </li>
          <li className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Grace Period Rules</p>
              <p className="text-slate-400">How long subscribers stay online after expiry.</p>
            </div>
          </li>
          <li className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Network Integration</p>
              <p className="text-slate-400">RADIUS, NAS, and core network hooks.</p>
            </div>
          </li>
          <li className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Payment Gateways</p>
              <p className="text-slate-400">Mpesa, card processors, and bank integrations.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6 max-w-4xl mx-auto mt-4 text-sm">
      {/* Change password */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-2">Change Password</h2>
        <p className="text-xs text-slate-400 mb-3">
          Use a strong password you don&apos;t reuse elsewhere. This form is currently mock-only; backend wiring will
          be added later.
        </p>
        <form className="space-y-3 text-sm">
          <div>
            <label className="block mb-1 text-xs">Current password</label>
            <input type="password" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 text-xs">New password</label>
            <input type="password" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            <p className="mt-1 text-[11px] text-slate-400">Password strength: strong (mock indicator)</p>
          </div>
          <div>
            <label className="block mb-1 text-xs">Confirm new password</label>
            <input type="password" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
          </div>
          <button
            type="submit"
            className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-medium"
          >
            Save password
          </button>
        </form>
      </section>

      {/* Active sessions */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-2">Active Sessions</h2>
        <p className="text-xs text-slate-400 mb-3">
          These are mock sessions for UI only. For real implementations, this would be populated from
          <code className="ml-1">GET /admin/sessions</code>.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-400">
                <th className="px-3 py-2">Device</th>
                <th className="px-3 py-2">IP address</th>
                <th className="px-3 py-2">Last active</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-800">
                <td className="px-3 py-2">Chrome on Windows</td>
                <td className="px-3 py-2">192.168.1.10</td>
                <td className="px-3 py-2">Just now</td>
                <td className="px-3 py-2">
                  <button className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-red-400 hover:bg-slate-800">
                    Force logout
                  </button>
                </td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="px-3 py-2">Safari on iPhone</td>
                <td className="px-3 py-2">102.67.4.21</td>
                <td className="px-3 py-2">2 hours ago</td>
                <td className="px-3 py-2">
                  <button className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-red-400 hover:bg-slate-800">
                    Force logout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6 max-w-4xl mx-auto mt-4 text-sm">
      {/* Preferences */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-2">Preferences</h2>
        <p className="text-xs text-slate-400 mb-3">
          These settings are personal to your admin account and do not affect other admins. All changes are
          saved instantly (mock only).
        </p>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Default landing page</p>
              <p className="text-slate-400">Where you land after login.</p>
            </div>
            <select className="rounded bg-slate-950 border border-slate-700 px-2 py-1 text-xs">
              <option>Dashboard</option>
              <option>Subscribers</option>
              <option>Payments</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Table density</p>
              <p className="text-slate-400">Control row height in tables.</p>
            </div>
            <select className="rounded bg-slate-950 border border-slate-700 px-2 py-1 text-xs">
              <option>Comfortable</option>
              <option>Compact</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Theme preference</p>
              <p className="text-slate-400">Light, dark, or follow system.</p>
            </div>
            <select className="rounded bg-slate-950 border border-slate-700 px-2 py-1 text-xs">
              <option>System</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Time format</p>
              <p className="text-slate-400">How dates/times are displayed.</p>
            </div>
            <select className="rounded bg-slate-950 border border-slate-700 px-2 py-1 text-xs">
              <option>24h</option>
              <option>12h</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Notification sound</p>
              <p className="text-slate-400">Play a sound for important alerts.</p>
            </div>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-3 w-3 rounded border-slate-700 bg-slate-950" defaultChecked />
              <span>On</span>
            </label>
          </div>
        </div>
      </section>

      {/* Notification settings */}
      <section className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-2">Notifications</h2>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Failed payment alerts</p>
              <p className="text-slate-400">Critical billing issues.</p>
            </div>
            <label className="inline-flex items-center gap-2 text-red-400">
              <input type="checkbox" className="h-3 w-3 rounded border-red-500 bg-slate-950" defaultChecked disabled />
              <span className="text-[11px]">Locked on</span>
            </label>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Subscription expiry alerts</p>
              <p className="text-slate-400">Upcoming and overdue expiries.</p>
            </div>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-3 w-3 rounded border-slate-700 bg-slate-950" defaultChecked />
              <span>On</span>
            </label>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">System health alerts</p>
              <p className="text-slate-400">Service degradations and outages.</p>
            </div>
            <label className="inline-flex items-center gap-2 text-red-400">
              <input type="checkbox" className="h-3 w-3 rounded border-red-500 bg-slate-950" defaultChecked disabled />
              <span className="text-[11px]">Locked on</span>
            </label>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">High usage alerts</p>
              <p className="text-slate-400">Abnormal bandwidth spikes.</p>
            </div>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-3 w-3 rounded border-slate-700 bg-slate-950" defaultChecked />
              <span>On</span>
            </label>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-100">Security events</p>
              <p className="text-slate-400">Login failures and access changes.</p>
            </div>
            <label className="inline-flex items-center gap-2 text-red-400">
              <input type="checkbox" className="h-3 w-3 rounded border-red-500 bg-slate-950" defaultChecked disabled />
              <span className="text-[11px]">Locked on</span>
            </label>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-lg border border-red-800 bg-red-950/20 px-4 py-4">
        <h2 className="text-sm font-semibold text-red-300 mb-2">Danger Zone</h2>
        <p className="text-xs text-red-200 mb-3">
          These actions are sensitive and should only be used when absolutely necessary. In a real system, they
          would call <code className="ml-1">POST /admin/regenerate-token</code> or
          <code className="ml-1">POST /admin/request-deactivation</code>.
        </p>
        <div className="flex flex-col gap-2 text-xs">
          <button className="inline-flex items-center justify-center rounded border border-red-500 bg-red-900/40 px-3 py-1.5 font-medium text-red-100 hover:bg-red-800/70">
            Regenerate API token
          </button>
          <button className="inline-flex items-center justify-center rounded border border-slate-700 bg-slate-950 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-900">
            Request account deactivation
          </button>
        </div>
      </section>
    </div>
  );

  const renderLogout = () => (
    <div className="space-y-4 max-w-md mx-auto text-sm mt-4 text-center">
      <p className="text-slate-300">
        Clicking logout will terminate your session and redirect you to the login page. This is a mock preview;
        backend session invalidation will be wired later.
      </p>
      <button
        type="button"
        onClick={logout}
        className="w-full rounded bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      {mode === 'profile' && renderProfile()}
      {mode === 'password' && renderSecurity()}
      {mode === 'preferences' && renderPreferences()}
      {mode === 'logout' && renderLogout()}
    </div>
  );
};

export default AccountsPage;
