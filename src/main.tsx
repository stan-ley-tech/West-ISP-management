import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoot from './AppRoot'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import { NotificationProvider } from './contexts/NotificationContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <SubscriptionProvider>
        <NotificationProvider>
          <AppRoot />
        </NotificationProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </React.StrictMode>,
)
