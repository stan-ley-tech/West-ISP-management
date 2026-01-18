import React from 'react';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import { Plan } from '../../services/planService';

interface Props {
  plans: Plan[];
  selectedPlanId: string;
  onChangePlanId: (id: string) => void;
  onSubmit: () => void;
}

const PaymentForm: React.FC<Props> = ({ plans, selectedPlanId, onChangePlanId, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-sm mb-1">Plan</label>
        <Select value={selectedPlanId} onChange={(e) => onChangePlanId(e.target.value)}>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" size="sm">
        Pay Now
      </Button>
    </form>
  );
};

export default PaymentForm;
