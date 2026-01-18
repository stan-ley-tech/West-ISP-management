import React from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

const SubscriptionForm: React.FC = () => {
  // Placeholder: later we can assign/renew subscriptions here
  return (
    <form className="space-y-3">
      <div>
        <label className="block text-xs mb-1">Subscriber ID</label>
        <Input placeholder="Subscriber UUID" />
      </div>
      <div>
        <label className="block text-xs mb-1">Plan ID</label>
        <Input placeholder="Plan UUID" />
      </div>
      <Button size="sm" type="submit">
        Assign / Renew
      </Button>
    </form>
  );
};

export default SubscriptionForm;
