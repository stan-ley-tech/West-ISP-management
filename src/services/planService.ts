import { api } from './api';

export interface Plan {
  id: string;
  name: string;
  download_mbps?: number;
  upload_mbps?: number;
  price_cents?: number;
  validity_days?: number;
  created_at?: string;
}

export async function fetchPlans(): Promise<Plan[]> {
  const res = await api.get<Plan[]>('/api/v1/plans');
  return res.data;
}
