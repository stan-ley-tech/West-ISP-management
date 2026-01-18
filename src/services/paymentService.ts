import { api } from './api';

export interface Payment {
  id: string;
  subscriber_id: string;
  plan_id: string;
  amount_cents: number;
  status: string;
  created_at: string;
}

export interface PaymentInitiateRequest {
  subscriber_id: string;
  plan_id: string;
}

export async function fetchPaymentHistory(subscriberId: string): Promise<Payment[]> {
  const res = await api.get<Payment[]>('/api/v1/payments/history', {
    params: { subscriber_id: subscriberId },
  });
  return res.data;
}

export async function initiatePayment(body: PaymentInitiateRequest) {
  const res = await api.post('/api/v1/payments/initiate', body);
  return res.data;
}
