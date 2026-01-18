import React, { useMemo, useState } from 'react';
import { Table } from '../components/UI/Table';

interface SessionRow {
  id: string;
  subscriberName: string;
  username: string;
  plan: string;
  startTime: string;
  duration: string;
  ip: string;
  mac: string;
  bytesIn: string;
  bytesOut: string;
  nearingLimit?: boolean;
}

const mockSessions: SessionRow[] = [
  {
    id: 'sess-1',
    subscriberName: 'John Doe',
    username: 'john.pppoe',
    plan: 'Home 10Mbps',
    startTime: '2024-01-01 09:15',
    duration: '01:23:45',
    ip: '10.0.0.10',
    mac: 'AA:BB:CC:DD:EE:01',
    bytesIn: '1.2 GB',
    bytesOut: '450 MB',
  },
  {
    id: 'sess-2',
    subscriberName: 'Jane Smith',
    username: 'jane.pppoe',
    plan: 'Business 50Mbps',
    startTime: '2024-01-01 08:05',
    duration: '03:11:02',
    ip: '10.0.0.11',
    mac: 'AA:BB:CC:DD:EE:02',
    bytesIn: '12.4 GB',
    bytesOut: '3.1 GB',
    nearingLimit: true,
  },
];

const SubscribersOnlineSessionsPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return mockSessions;
    const q = search.toLowerCase();
    return mockSessions.filter((s) =>
      s.subscriberName.toLowerCase().includes(q) || s.username.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">Online Sessions</h1>
      <p className="text-sm text-slate-300 text-center">
        Real-time view of connected subscribers. This will be wired to GET /sessions/active and live updates.
      </p>

      <div className="flex flex-wrap items-center gap-3 justify-between text-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by subscriber or username"
          className="w-full sm:w-72 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
        />
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Nearing limit
          </span>
        </div>
      </div>

      <Table
        headers={[
          'Subscriber Name',
          'Username',
          'Plan',
          'Start Time',
          'Session Duration',
          'IP Address',
          'MAC Address',
          'Usage (In / Out)',
          'Status',
          'Actions',
        ]}
      >
        {filtered.map((s) => (
          <tr key={s.id} className="border-t border-slate-800">
            <td className="px-3 py-2">{s.subscriberName}</td>
            <td className="px-3 py-2">{s.username}</td>
            <td className="px-3 py-2">{s.plan}</td>
            <td className="px-3 py-2">{s.startTime}</td>
            <td className="px-3 py-2">{s.duration}</td>
            <td className="px-3 py-2">{s.ip}</td>
            <td className="px-3 py-2">{s.mac}</td>
            <td className="px-3 py-2">
              {s.bytesIn} / {s.bytesOut}
            </td>
            <td className="px-3 py-2">
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  s.nearingLimit ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    s.nearingLimit ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                />
                {s.nearingLimit ? 'Near limit' : 'Online'}
              </span>
            </td>
            <td className="px-3 py-2 text-xs">
              <button className="text-red-400 hover:underline">Disconnect</button>
            </td>
          </tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td className="px-3 py-3 text-sm text-slate-400" colSpan={10}>
              No active sessions.
            </td>
          </tr>
        )}
      </Table>
    </div>
  );
};

export default SubscribersOnlineSessionsPage;
