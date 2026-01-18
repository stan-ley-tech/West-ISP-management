import React from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = React.useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: later wire to password reset endpoint or support flow
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 max-w-sm w-full shadow-xl">
        <h2 className="text-sm font-semibold mb-2">Reset Password</h2>
        <p className="text-xs text-slate-300 mb-3">
          Enter your email or phone number and we will send you reset instructions.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block mb-1">Email / Phone</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetModal;
