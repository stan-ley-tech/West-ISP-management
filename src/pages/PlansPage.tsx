import React, { useEffect, useState } from 'react';
import { fetchPlans, type Plan } from '../services/planService';
import { getErrorMessage } from '../services/api';
import PlanTable from '../components/Tables/PlanTable';

const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPlans();
        if (!cancelled) setPlans(data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">Plans</h1>
      {loading && <p className="text-sm text-slate-300">Loading plans...</p>}
      {error && <p className="text-sm text-red-400">Error: {error}</p>}
      {!loading && !error && <PlanTable plans={plans} />}
    </div>
  );
};

export default PlansPage;
