import React from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface AdminLoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs mb-1">Username</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label className="block text-xs mb-1">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" size="sm">
        Login
      </Button>
    </form>
  );
};

interface SubscriberLoginFormProps {
  onSubmit: (subscriberId: string) => void;
}

export const SubscriberLoginForm: React.FC<SubscriberLoginFormProps> = ({ onSubmit }) => {
  const [subscriberId, setSubscriberId] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberId.trim()) return;
    onSubmit(subscriberId.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs mb-1">Subscriber ID</label>
        <Input
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
          placeholder="Subscriber UUID"
        />
      </div>
      <Button type="submit" size="sm">
        Continue
      </Button>
    </form>
  );
};
