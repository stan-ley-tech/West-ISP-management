import React from 'react';
import { useAuth } from '../hooks/useAuth';
import SubscriberDashboard from '../components/Dashboard/SubscriberDashboard';

const SubscriberDashboardPage: React.FC = () => {
  const { subscriberId } = useAuth();

  if (!subscriberId) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Subscriber Dashboard</h1>
        <p className="text-sm text-slate-300">You must be logged in as a subscriber to view this page.</p>
      </div>
    );
  }

  return <SubscriberDashboard subscriberId={subscriberId} />;
};

export default SubscriberDashboardPage;
