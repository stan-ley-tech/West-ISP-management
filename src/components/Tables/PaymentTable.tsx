import React from 'react';
import { Payment } from '../../services/paymentService';
import { Table } from '../UI/Table';
import { formatCurrency } from '../../utils/formatters';

interface Props {
  payments: Payment[];
}

const PaymentTable: React.FC<Props> = ({ payments }) => {
  return (
    <Table headers={['Plan ID', 'Amount', 'Status', 'Created']}>
      {payments.map((p) => (
        <tr key={p.id} className="border-t border-slate-800">
          <td className="px-3 py-2 text-xs">{p.plan_id}</td>
          <td className="px-3 py-2">{formatCurrency(p.amount_cents)}</td>
          <td className="px-3 py-2 capitalize">{p.status}</td>
          <td className="px-3 py-2 text-xs text-slate-400">{p.created_at}</td>
        </tr>
      ))}
      {payments.length === 0 && (
        <tr>
          <td className="px-3 py-3 text-sm text-slate-400" colSpan={4}>
            No payments found.
          </td>
        </tr>
      )}
    </Table>
  );
};

export default PaymentTable;
