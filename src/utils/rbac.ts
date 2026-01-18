import { Role } from '../contexts/AuthContext';

export function isAdmin(role: Role | null): boolean {
  return role === 'admin';
}

export function isSubscriber(role: Role | null): boolean {
  return role === 'subscriber';
}

export function canAccessAdmin(role: Role | null): boolean {
  return isAdmin(role);
}

export function canAccessSubscriber(role: Role | null): boolean {
  return isSubscriber(role);
}
