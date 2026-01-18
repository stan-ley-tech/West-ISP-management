import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SubscriberLoginForm } from '../components/Forms/LoginForm';

const LoginPage: React.FC = () => {
  const { loginSubscriber } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (subscriberId: string) => {
    loginSubscriber(subscriberId);
    navigate('/subscriber');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-slate-900 border border-slate-800 rounded-lg p-6 shadow">
      <h1 className="text-xl font-semibold mb-4">Subscriber Login</h1>
      <p className="text-sm text-slate-300 mb-4">
        Enter your Subscriber ID. Later, this will use phone/PPPoE auth.
      </p>
      <SubscriberLoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
