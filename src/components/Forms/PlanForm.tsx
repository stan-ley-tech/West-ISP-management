import React from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

const PlanForm: React.FC = () => {
  // Placeholder form; wire to /api/v1/plans later
  return (
    <form className="space-y-3">
      <div>
        <label className="block text-xs mb-1">Name</label>
        <Input placeholder="Plan name" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1">Download Mbps</label>
          <Input type="number" min={0} />
        </div>
        <div>
          <label className="block text-xs mb-1">Upload Mbps</label>
          <Input type="number" min={0} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1">Price (KES)</label>
          <Input type="number" min={0} step={1} />
        </div>
        <div>
          <label className="block text-xs mb-1">Validity (days)</label>
          <Input type="number" min={1} />
        </div>
      </div>
      <Button size="sm" type="submit">
        Save
      </Button>
    </form>
  );
};

export default PlanForm;
