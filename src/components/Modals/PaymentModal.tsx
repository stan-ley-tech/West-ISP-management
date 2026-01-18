import React from 'react';
import { Button } from '../UI/Button';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold">Make Payment</h2>
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PaymentModal;
