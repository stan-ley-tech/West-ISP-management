export function formatCurrency(amountCents: number, currency: string = 'KES'): string {
  return `${currency} ${(amountCents / 100).toFixed(2)}`;
}

export function formatDateTime(value: string | number | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString();
}
