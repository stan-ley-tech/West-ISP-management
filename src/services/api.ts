import axios from 'axios';

// Central Axios instance for talking to the Go backend API
// Adjust baseURL if you expose the API differently in production.
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple helper for handling errors in one place for now.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { error?: string })?.error ||
      error.message ||
      'Network error'
    );
  }
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}
