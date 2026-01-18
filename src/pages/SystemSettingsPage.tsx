import React, { useMemo } from 'react';

export type SystemSettingsMode =
  | 'company'
  | 'billing'
  | 'grace'
  | 'network'
  | 'gateways'
  | 'misc';

interface SystemSettingsPageProps {
  mode: SystemSettingsMode;
}

const SystemSettingsPage: React.FC<SystemSettingsPageProps> = ({ mode }) => {
  const title = useMemo(() => {
    switch (mode) {
      case 'company':
        return 'Company Profile';
      case 'billing':
        return 'Billing Rules';
      case 'grace':
        return 'Grace Period Rules';
      case 'network':
        return 'Network Integrations';
      case 'gateways':
        return 'Payment Gateways';
      case 'misc':
        return 'Miscellaneous System Settings';
      default:
        return 'System Settings';
    }
  }, [mode]);


  const renderCompany = () => (
    <form className="space-y-4 max-w-3xl mx-auto text-sm mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">Company Name</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Logo (URL or upload placeholder)</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Website</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Tax / VAT Number</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Support Contact Info</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
      >
        Save Changes
      </button>
    </form>
  );

  const renderBilling = () => (
    <form className="space-y-4 max-w-3xl mx-auto text-sm mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">Billing Cycle</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Auto-Renew Enabled</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Late Payment Penalty (%)</label>
          <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Tax / VAT Rate (%)</label>
          <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Currency</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>KES</option>
            <option>USD</option>
          </select>
        </div>
      </div>
      <p className="text-xs text-slate-400">
        Preview (mock): Invoice totals will include tax and any late payment penalties based on these rules.
      </p>
      <button
        type="submit"
        className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
      >
        Save Changes
      </button>
    </form>
  );

  const renderGrace = () => (
    <form className="space-y-4 max-w-3xl mx-auto text-sm mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">Default Grace Period (days)</label>
          <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Network Access During Grace</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>Full</option>
            <option>Limited</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Notifications During Grace</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>SMS &amp; Email</option>
            <option>SMS Only</option>
            <option>Email Only</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Reminder Days Before Expiry</label>
          <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
      >
        Save Changes
      </button>
    </form>
  );

  const renderNetwork = () => (
    <form className="space-y-4 max-w-3xl mx-auto text-sm mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">RADIUS Server Hostname / IP</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">RADIUS Port</label>
          <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1">RADIUS Shared Secret</label>
          <input type="password" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Mikrotik Router IP (optional)</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Network Type</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>Fiber</option>
            <option>DSL</option>
            <option>Hotspot</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-900"
        >
          Test Connection
        </button>
        <button
          type="submit"
          className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
        >
          Save Changes
        </button>
      </div>
    </form>
  );

  const renderGateways = () => (
    <div className="space-y-4 max-w-4xl mx-auto text-sm mt-4">
      <p className="text-xs text-slate-300">
        Gateways below are mock examples. This will later be backed by /settings/payment-gateways.
      </p>
      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-3 py-2 text-left">Gateway Name</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Credentials</th>
              <th className="px-3 py-2 text-left">Currency</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">Mpesa STK</td>
              <td className="px-3 py-2 text-emerald-400">Active</td>
              <td className="px-3 py-2 text-slate-400">ConsumerKey=****abcd</td>
              <td className="px-3 py-2">KES</td>
              <td className="px-3 py-2 space-x-2">
                <button className="text-sky-400 hover:underline">Edit</button>
                <button className="text-amber-400 hover:underline">Deactivate</button>
              </td>
            </tr>
            <tr className="border-t border-slate-800">
              <td className="px-3 py-2">Card Gateway</td>
              <td className="px-3 py-2 text-slate-400">Inactive</td>
              <td className="px-3 py-2 text-slate-400">MerchantID=****1234</td>
              <td className="px-3 py-2">KES</td>
              <td className="px-3 py-2 space-x-2">
                <button className="text-sky-400 hover:underline">Edit</button>
                <button className="text-emerald-400 hover:underline">Activate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form className="space-y-3 text-xs border border-slate-800 rounded-lg p-3 bg-slate-950">
        <h2 className="text-sm font-semibold">Add / Configure Gateway (mock)</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block mb-1">Gateway Name</label>
            <input className="w-full rounded bg-slate-950 border border-slate-700 px-2 py-1.5" />
          </div>
          <div>
            <label className="block mb-1">Currency</label>
            <select className="w-full rounded bg-slate-950 border border-slate-700 px-2 py-1.5">
              <option>KES</option>
              <option>USD</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1">API Key / Secret (masked)</label>
            <input className="w-full rounded bg-slate-950 border border-slate-700 px-2 py-1.5" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded border border-slate-700 px-3 py-1.5 font-medium hover:bg-slate-900"
          >
            Test Connection
          </button>
          <button
            type="submit"
            className="rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 font-medium"
          >
            Save / Activate
          </button>
        </div>
      </form>
    </div>
  );

  const renderMisc = () => (
    <form className="space-y-4 max-w-3xl mx-auto text-sm mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">Timezone</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>Africa/Nairobi</option>
            <option>UTC</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Language</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>English</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1">Email / SMS Templates (preview)</label>
          <textarea
            className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
            rows={3}
            defaultValue="Dear {{name}}, your subscription will expire on {{expiry_date}}."
          />
        </div>
        <div className="sm:col-span-2 flex items-center gap-2">
          <input type="checkbox" className="h-3 w-3 rounded border-slate-700 bg-slate-950" />
          <span className="text-xs text-slate-200">Enable Maintenance Mode (show maintenance page to subscribers)</span>
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
      >
        Save Changes
      </button>
    </form>
  );

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      {mode === 'company' && renderCompany()}
      {mode === 'billing' && renderBilling()}
      {mode === 'grace' && renderGrace()}
      {mode === 'network' && renderNetwork()}
      {mode === 'gateways' && renderGateways()}
      {mode === 'misc' && renderMisc()}
    </div>
  );
};

export default SystemSettingsPage;
