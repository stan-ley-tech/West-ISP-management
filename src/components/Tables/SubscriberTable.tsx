import React from 'react';
import { Subscriber } from '../../services/subscriberService';
import { Table } from '../UI/Table';

interface Props {
  subscribers: Subscriber[];
}

const SubscriberTable: React.FC<Props> = ({ subscribers }) => {
  return (
    <Table
      headers={[
        'Name',
        'Phone',
        'Email',
        'Status',
        'PPPoE Username',
        'Created',
      ]}
    >
      {subscribers.map((s) => (
        <tr key={s.id} className="border-t border-slate-800">
          <td className="px-3 py-2">{s.name}</td>
          <td className="px-3 py-2">{s.phone}</td>
          <td className="px-3 py-2">{s.email}</td>
          <td className="px-3 py-2 capitalize">{s.status}</td>
          <td className="px-3 py-2">{s.pppoe_username || '-'}</td>
          <td className="px-3 py-2 text-xs text-slate-400">{s.created_at}</td>
        </tr>
      ))}
      {subscribers.length === 0 && (
        <tr>
          <td className="px-3 py-3 text-sm text-slate-400" colSpan={6}>
            No subscribers found.
          </td>
        </tr>
      )}
    </Table>
  );
};

export default SubscriberTable;
