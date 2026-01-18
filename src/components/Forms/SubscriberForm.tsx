import React from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

const SubscriberForm: React.FC = () => {
  // Placeholder form; wire to /api/v1/subscribers later
  return (
    <form className="space-y-3">
      <div>
        <label className="block text-xs mb-1">Name</label>
        <Input placeholder="Subscriber name" />
      </div>
      <div>
        <label className="block text-xs mb-1">Phone</label>
        <Input placeholder="Phone number" />
      </div>
      <div>
        <label className="block text-xs mb-1">Email</label>
        <Input placeholder="Email (optional)" />
      </div>
      <Button size="sm" type="submit">
        Save
      </Button>
    </form>
  );
};

export default SubscriberForm;
