import { api } from './api';

export interface Subscriber {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  created_at: string;
  pppoe_username?: string | null;
}

export async function fetchSubscribers(): Promise<Subscriber[]> {
  const res = await api.get<Subscriber[]>('/api/v1/subscribers');
  return res.data;
}
