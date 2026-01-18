export function isValidEmail(value: string): boolean {
  return /.+@.+\..+/.test(value);
}

export function isValidPhone(value: string): boolean {
  // Very loose check; customize for your locale later
  return /^\+?[0-9]{7,15}$/.test(value.replace(/\s+/g, ''));
}

export function isRequired(value: string | null | undefined): boolean {
  return !!value && value.trim().length > 0;
}
