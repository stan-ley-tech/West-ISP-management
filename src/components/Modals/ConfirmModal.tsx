import React from 'react';
import { Button } from '../UI/Button';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 max-w-sm w-full shadow-xl">
        <h2 className="text-sm font-semibold mb-2">{title}</h2>
        {description && <p className="text-xs text-slate-300 mb-4">{description}</p>}
        <div className="flex justify-end gap-2 text-xs">
          <Button variant="ghost" size="sm" type="button" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" size="sm" type="button" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
