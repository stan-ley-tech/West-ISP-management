import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'subscriber';

interface AuthState {
  role: Role | null;
  subscriberId: string | null;
}

interface AuthContextValue extends AuthState {
  loginAdmin: () => void;
  loginSubscriber: (subscriberId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [subscriberId, setSubscriberId] = useState<string | null>(null);

  const loginAdmin = () => {
    setRole('admin');
    setSubscriberId(null);
  };

  const loginSubscriber = (id: string) => {
    setRole('subscriber');
    setSubscriberId(id);
  };

  const logout = () => {
    setRole(null);
    setSubscriberId(null);
  };

  return (
    <AuthContext.Provider value={{ role, subscriberId, loginAdmin, loginSubscriber, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
}
