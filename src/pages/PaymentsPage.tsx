import React, { useMemo, useState } from 'react';
import { Table } from '../components/UI/Table';
import { FiEye, FiRefreshCw, FiRotateCcw, FiDownload, FiMail, FiCheck, FiX } from 'react-icons/fi';

type PaymentsMode = 'payments' | 'invoices' | 'receipts' | 'manual' | 'refunds';

interface PaymentsPageProps {
  mode: PaymentsMode;
}

export interface PaymentRow {
  id: string;
  subscriberName: string;
  username: string;
  plan: string;
  amount: string;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface InvoiceRow {
  id: string;
  subscriberName: string;
  plan: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid';
}

export interface ReceiptRow {
  id: string;
  paymentId: string;
  subscriberName: string;
  plan: string;
  amount: string;
  createdAt: string;
}

export interface RefundRow {
  id: string;
  subscriberName: string;
  originalPayment: string;
  amount: string;
  reason: string;
  status: 'pending' | 'completed' | 'rejected';
}

export const mockPayments: PaymentRow[] = [
  {
    id: 'PAY-1001',
    subscriberName: 'John Doe',
    username: 'john.pppoe',
    plan: 'Home 10Mbps',
    amount: 'KES 1,999',
    method: 'Mpesa',
    status: 'completed',
    createdAt: '2024-01-10 09:30',
  },
  {
    id: 'PAY-1002',
    subscriberName: 'Jane Smith',
    username: 'jane.pppoe',
    plan: 'Business 50Mbps',
    amount: 'KES 9,999',
    method: 'Card',
    status: 'failed',
    createdAt: '2024-01-10 10:05',
  },
];

export const mockInvoices: InvoiceRow[] = [
  {
    id: 'INV-001',
    subscriberName: 'John Doe',
    plan: 'Home 10Mbps',
    amount: 'KES 1,999',
    issueDate: '2024-01-01',
    dueDate: '2024-01-05',
    status: 'paid',
  },
  {
    id: 'INV-002',
    subscriberName: 'Grace User',
    plan: 'Home 20Mbps',
    amount: 'KES 2,999',
    issueDate: '2024-01-03',
    dueDate: '2024-01-10',
    status: 'unpaid',
  },
];

export const mockReceipts: ReceiptRow[] = [
  {
    id: 'RCPT-001',
    paymentId: 'PAY-1001',
    subscriberName: 'John Doe',
    plan: 'Home 10Mbps',
    amount: 'KES 1,999',
    createdAt: '2024-01-10 09:31',
  },
];

export const mockRefunds: RefundRow[] = [
  {
    id: 'RFND-001',
    subscriberName: 'Jane Smith',
    originalPayment: 'PAY-1002',
    amount: 'KES 9,999',
    reason: 'Failed card charge',
    status: 'pending',
  },
];

const PaymentsPage: React.FC<PaymentsPageProps> = ({ mode }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const title = useMemo(() => {
    switch (mode) {
      case 'payments':
        return 'Payments';
      case 'invoices':
        return 'Invoices';
      case 'receipts':
        return 'Receipts';
      case 'manual':
        return 'Manual Payments';
      case 'refunds':
        return 'Refunds & Adjustments';
      default:
        return 'Payments & Billing';
    }
  }, [mode]);

  const filteredPayments = useMemo(() => {
    if (mode !== 'payments') return [];
    let rows = mockPayments;
    if (statusFilter !== 'all') {
      rows = rows.filter((p) => p.status === statusFilter);
    }
    if (methodFilter !== 'all') {
      rows = rows.filter((p) => p.method === methodFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((p) =>
        p.subscriberName.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [mode, search, statusFilter, methodFilter]);

  const renderPayments = () => (
    <>
      <div className="flex flex-wrap items-center gap-3 justify-between text-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by subscriber, username, or payment ID"
          className="w-full sm:w-72 rounded bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="rounded bg-slate-950 border border-slate-700 px-2 py-1.5 text-xs"
          >
            <option value="all">All Methods</option>
            <option value="Mpesa">Mpesa</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      <Table
        headers={[
          'Payment ID',
          'Subscriber',
          'Username',
          'Plan',
          'Amount Paid',
          'Payment Method',
          'Status',
          'Date / Time',
          'Actions',
        ]}
      >
        {filteredPayments.map((p) => (
          <tr key={p.id} className="border-t border-slate-800">
            <td className="px-3 py-2 text-xs">{p.id}</td>
            <td className="px-3 py-2">{p.subscriberName}</td>
            <td className="px-3 py-2">{p.username}</td>
            <td className="px-3 py-2">{p.plan}</td>
            <td className="px-3 py-2">{p.amount}</td>
            <td className="px-3 py-2">{p.method}</td>
            <td
              className={`px-3 py-2 capitalize ${
                p.status === 'completed'
                  ? 'text-emerald-400'
                  : p.status === 'pending'
                  ? 'text-amber-300'
                  : 'text-red-400'
              }`}
            >
              {p.status}
            </td>
            <td className="px-3 py-2 text-xs text-slate-300">{p.createdAt}</td>
            <td className="px-3 py-2 space-x-1 text-xs">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="View payment details"
              >
                <FiEye className="h-3 w-3" />
              </button>
              {p.status === 'failed' && (
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-amber-400 hover:bg-slate-800"
                  aria-label="Retry payment"
                >
                  <FiRefreshCw className="h-3 w-3" />
                </button>
              )}
              {p.status === 'completed' && (
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                  aria-label="Refund payment"
                >
                  <FiRotateCcw className="h-3 w-3" />
                </button>
              )}
            </td>
          </tr>
        ))}
        {filteredPayments.length === 0 && (
          <tr>
            <td className="px-3 py-3 text-sm text-slate-400" colSpan={9}>
              No payments found for current filters.
            </td>
          </tr>
        )}
      </Table>
    </>
  );

  const renderInvoices = () => (
    <>
      <Table
        headers={[
          'Invoice Number',
          'Subscriber Name',
          'Plan',
          'Amount',
          'Issue Date',
          'Due Date',
          'Status',
          'Actions',
        ]}
      >
        {mockInvoices.map((inv) => (
          <tr key={inv.id} className="border-t border-slate-800">
            <td className="px-3 py-2 text-xs">{inv.id}</td>
            <td className="px-3 py-2">{inv.subscriberName}</td>
            <td className="px-3 py-2">{inv.plan}</td>
            <td className="px-3 py-2">{inv.amount}</td>
            <td className="px-3 py-2">{inv.issueDate}</td>
            <td className="px-3 py-2">{inv.dueDate}</td>
            <td
              className={`px-3 py-2 capitalize ${
                inv.status === 'paid' ? 'text-emerald-400' : 'text-amber-300'
              }`}
            >
              {inv.status}
            </td>
            <td className="px-3 py-2 space-x-1 text-xs">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="View invoice"
              >
                <FiEye className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                aria-label="Download invoice PDF"
              >
                <FiDownload className="h-3 w-3" />
              </button>
              {inv.status === 'unpaid' && (
                <button
                  className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-amber-400 hover:bg-slate-800"
                  aria-label="Send payment reminder"
                >
                  <FiMail className="h-3 w-3" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </Table>
    </>
  );

  const renderReceipts = () => (
    <>
      <Table
        headers={[
          'Receipt Number',
          'Payment ID',
          'Subscriber Name',
          'Plan',
          'Amount Paid',
          'Date / Time',
          'Actions',
        ]}
      >
        {mockReceipts.map((r) => (
          <tr key={r.id} className="border-t border-slate-800">
            <td className="px-3 py-2 text-xs">{r.id}</td>
            <td className="px-3 py-2 text-xs">{r.paymentId}</td>
            <td className="px-3 py-2">{r.subscriberName}</td>
            <td className="px-3 py-2">{r.plan}</td>
            <td className="px-3 py-2">{r.amount}</td>
            <td className="px-3 py-2 text-xs text-slate-300">{r.createdAt}</td>
            <td className="px-3 py-2 space-x-1 text-xs">
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="View receipt"
              >
                <FiEye className="h-3 w-3" />
              </button>
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                aria-label="Download receipt"
              >
                <FiDownload className="h-3 w-3" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );

  const renderManual = () => (
    <form className="space-y-4 text-sm max-w-3xl mx-auto">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">Subscriber Name</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Plan / Subscription</label>
          <input className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Amount</label>
          <input type="number" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Payment Method</label>
          <select className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2">
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Date of Payment</label>
          <input type="datetime-local" className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block mb-1">Notes</label>
        <textarea
          className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
          rows={3}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
        >
          Submit
        </button>
        <button
          type="button"
          className="rounded border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-900"
        >
          Submit &amp; Add Another
        </button>
      </div>
    </form>
  );

  const renderRefunds = () => (
    <>
      <Table
        headers={[
          'Refund / Adjustment ID',
          'Subscriber Name',
          'Original Payment',
          'Amount',
          'Reason',
          'Status',
          'Actions',
        ]}
      >
        {mockRefunds.map((r) => (
          <tr key={r.id} className="border-t border-slate-800">
            <td className="px-3 py-2 text-xs">{r.id}</td>
            <td className="px-3 py-2">{r.subscriberName}</td>
            <td className="px-3 py-2 text-xs">{r.originalPayment}</td>
            <td className="px-3 py-2">{r.amount}</td>
            <td className="px-3 py-2 text-xs text-slate-300">{r.reason}</td>
            <td
              className={`px-3 py-2 capitalize ${
                r.status === 'completed'
                  ? 'text-emerald-400'
                  : r.status === 'pending'
                  ? 'text-amber-300'
                  : 'text-red-400'
              }`}
            >
              {r.status}
            </td>
            <td className="px-3 py-2 space-x-1 text-xs">
              {r.status === 'pending' && (
                <>
                  <button
                    className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-emerald-400 hover:bg-slate-800"
                    aria-label="Approve refund"
                  >
                    <FiCheck className="h-3 w-3" />
                  </button>
                  <button
                    className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-red-400 hover:bg-slate-800"
                    aria-label="Reject refund"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </>
              )}
              <button
                className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-sky-400 hover:bg-slate-800"
                aria-label="View refund details"
              >
                <FiEye className="h-3 w-3" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      {mode === 'payments' && renderPayments()}
      {mode === 'invoices' && renderInvoices()}
      {mode === 'receipts' && renderReceipts()}
      {mode === 'manual' && renderManual()}
      {mode === 'refunds' && renderRefunds()}
    </div>
  );
};

export default PaymentsPage;
