import React, { useMemo, useState } from 'react';
import { Table } from '../components/UI/Table';
import { FiEdit, FiPlus, FiTrash2, FiPauseCircle, FiCopy } from 'react-icons/fi';

type PlansMode = 'all' | 'create' | 'groups' | 'fup';

interface PlansServicesPageProps {
  mode: PlansMode;
}

export interface PlanRow {
  id: string;
  name: string;
  type: string;
  upload: number;
  download: number;
  dataCap?: number;
  durationDays: number;
  price: string;
  fupPolicy?: string;
  status: 'active' | 'inactive';
}

export const mockPlans: PlanRow[] = [
  {
    id: '1',
    name: 'Home 10Mbps',
    type: 'Fiber',
    upload: 10,
    download: 10,
    durationDays: 30,
    price: 'KES 1,999',
    status: 'active',
    fupPolicy: 'Home-FUP-100GB',
  },
  {
    id: '2',
    name: 'Business 50Mbps',
    type: 'Fiber',
    upload: 50,
    download: 50,
    durationDays: 30,
    price: 'KES 9,999',
    status: 'active',
    fupPolicy: 'Biz-FUP-500GB',
  },
];

const PlansServicesPage: React.FC<PlansServicesPageProps> = ({ mode }) => {
  const [search, setSearch] = useState('');

  const title = useMemo(() => {
    switch (mode) {
      case 'all':
        return 'All Plans';
      case 'create':
        return 'Create Plan';
      case 'groups':
        return 'Plan Groups';
      case 'fup':
        return 'Fair Usage Policies';
      default:
        return 'Plans & Services';
    }
  }, [mode]);

  if (mode === 'create') {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-center">{title}</h1>

        <form className="space-y-4 text-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1">Plan Name</label>
              <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Plan Type</label>
              <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
                <option>Fiber</option>
                <option>DSL</option>
                <option>Hotspot</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Download Speed (Mbps)</label>
              <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Upload Speed (Mbps)</label>
              <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Data Cap (GB, optional)</label>
              <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Duration (days)</label>
              <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Price</label>
              <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Fair Usage Policy</label>
              <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
                <option>None</option>
                <option>Home-FUP-100GB</option>
                <option>Biz-FUP-500GB</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
            >
              Save Plan
            </button>
            <button
              type="button"
              className="rounded border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-900"
            >
              Save &amp; Create Another
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (mode === 'groups') {
    return (
      <div className="space-y-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-center">{title}</h1>

        <Table headers={['Group Name', 'Number of Plans', 'Actions']}>
          <tr className="border-t border-slate-800">
            <td className="px-3 py-2">Home Plans</td>
            <td className="px-3 py-2">3</td>
            <td className="px-3 py-2 space-x-1 text-sm">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="Edit group"
              >
                <FiEdit className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                aria-label="Add plan to group"
              >
                <FiPlus className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                aria-label="Delete group"
              >
                <FiTrash2 className="h-3 w-3" />
              </button>
            </td>
          </tr>
          <tr className="border-t border-slate-800">
            <td className="px-3 py-2">Business Plans</td>
            <td className="px-3 py-2">2</td>
            <td className="px-3 py-2 space-x-1 text-sm">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="Edit group"
              >
                <FiEdit className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                aria-label="Add plan to group"
              >
                <FiPlus className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                aria-label="Delete group"
              >
                <FiTrash2 className="h-3 w-3" />
              </button>
            </td>
          </tr>
        </Table>
      </div>
    );
  }

  if (mode === 'fup') {
    return (
      <div className="space-y-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-center">{title}</h1>

        <Table
          headers={[
            'Policy Name',
            'Data Cap (GB)',
            'Speed Limit After Cap (Mbps)',
            'Enforcement Type',
            'Status',
            'Actions',
          ]}
        >
          <tr className="border-t border-slate-800">
            <td className="px-3 py-2">Home-FUP-100GB</td>
            <td className="px-3 py-2">100</td>
            <td className="px-3 py-2">5</td>
            <td className="px-3 py-2">Throttle</td>
            <td className="px-3 py-2 text-emerald-400">Active</td>
            <td className="px-3 py-2 space-x-1 text-sm">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="Edit policy"
              >
                <FiEdit className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                aria-label="Deactivate policy"
              >
                <FiPauseCircle className="h-3 w-3" />
              </button>
            </td>
          </tr>
        </Table>
      </div>
    );
  }

  // all plans view
  const filteredPlans = mockPlans.filter((plan) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return plan.name.toLowerCase().includes(q) || plan.type.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      <div className="flex flex-wrap items-center gap-3 justify-between text-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plans by name or type"
          className="w-full sm:w-72 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
        />
      </div>

      <Table
        headers={[
          'Plan Name',
          'Plan Type',
          'Upload / Download',
          'Duration (days)',
          'Price',
          'Fair Usage Policy',
          'Status',
          'Actions',
        ]}
      >
        {filteredPlans.map((plan) => (
          <tr key={plan.id} className="border-t border-slate-800">
            <td className="px-3 py-2">{plan.name}</td>
            <td className="px-3 py-2">{plan.type}</td>
            <td className="px-3 py-2">
              {plan.download} / {plan.upload} Mbps
            </td>
            <td className="px-3 py-2">{plan.durationDays}</td>
            <td className="px-3 py-2">{plan.price}</td>
            <td className="px-3 py-2">{plan.fupPolicy ?? '-'}</td>
            <td
              className={`px-3 py-2 capitalize ${
                plan.status === 'active' ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {plan.status}
            </td>
            <td className="px-3 py-2 space-x-1 text-sm">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="Edit plan"
              >
                <FiEdit className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-amber-400 hover:bg-slate-800"
                aria-label="Deactivate plan"
              >
                <FiPauseCircle className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                aria-label="Clone plan"
              >
                <FiCopy className="h-3 w-3" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default PlansServicesPage;
