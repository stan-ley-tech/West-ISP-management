import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SubscriptionInfo {
  currentPlanName?: string;
  status?: string;
  expiresAt?: string;
}

interface SubscriptionContextValue extends SubscriptionInfo {
  setSubscriptionInfo: (info: SubscriptionInfo) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [info, setInfo] = useState<SubscriptionInfo>({});

  const setSubscriptionInfo = (next: SubscriptionInfo) => setInfo(next);

  return (
    <SubscriptionContext.Provider value={{ ...info, setSubscriptionInfo }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export function useSubscriptionContext(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return ctx;
}
