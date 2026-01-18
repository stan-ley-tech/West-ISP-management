import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AdminLoginForm } from '../components/Forms/LoginForm';

const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (username: string, password: string) => {
    // Stub: accept any credentials for now
    loginAdmin();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-slate-900 border border-slate-800 rounded-lg p-6 shadow">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <p className="text-sm text-slate-300 mb-4">
        Temporary admin login. Later this will be wired to real authentication.
      </p>
      <AdminLoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminLoginPage;
