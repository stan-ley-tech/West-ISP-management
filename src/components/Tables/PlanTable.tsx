import React from 'react';
import { Plan } from '../../services/planService';
import { Table } from '../UI/Table';
import { formatCurrency } from '../../utils/formatters';

interface Props {
  plans: Plan[];
}

const PlanTable: React.FC<Props> = ({ plans }) => {
  const formatBandwidth = (download?: number, upload?: number) => {
    if (download == null && upload == null) return '-';
    if (upload == null) return `${download} Mbps down`;
    if (download == null) return `${upload} Mbps up`;
    return `${download} / ${upload} Mbps`;
  };

  return (
    <Table headers={['Name', 'Bandwidth', 'Price', 'Validity (days)']}>
      {plans.map((p) => (
        <tr key={p.id} className="border-t border-slate-800">
          <td className="px-3 py-2">{p.name}</td>
          <td className="px-3 py-2">{formatBandwidth(p.download_mbps, p.upload_mbps)}</td>
          <td className="px-3 py-2">{p.price_cents != null ? formatCurrency(p.price_cents) : '-'}</td>
          <td className="px-3 py-2">{p.validity_days ?? '-'}</td>
        </tr>
      ))}
      {plans.length === 0 && (
        <tr>
          <td className="px-3 py-3 text-sm text-slate-400" colSpan={4}>
            No plans found.
          </td>
        </tr>
      )}
    </Table>
  );
};

export default PlanTable;
