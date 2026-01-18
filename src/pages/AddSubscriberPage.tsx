import React, { useState } from 'react';

const AddSubscriberPage: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [autoPassword, setAutoPassword] = useState(true);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // This will be wired to POST /subscribers and POST /subscriptions/assign later.
  };

  const handleGeneratePassword = () => {
    const generated = Math.random().toString(36).slice(-10);
    setPassword(generated);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">Add Subscriber</h1>
      <p className="text-sm text-slate-300 text-center">
        Create a new subscriber and assign a plan. This form will call POST /subscribers and
        /subscriptions/assign.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1">Name</label>
            <input
              className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Username (PPPoE)</label>
            <input
              className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAutoPassword(false);
                }}
                required={!autoPassword}
                placeholder={autoPassword ? 'Will be auto-generated' : ''}
              />
              <button
                type="button"
                onClick={() => {
                  setAutoPassword(true);
                  handleGeneratePassword();
                }}
                className="rounded border border-slate-700 px-3 py-2 text-xs hover:bg-slate-900"
              >
                Auto-generate
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Assign Plan</label>
            <select
              className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              required
            >
              <option value="">Select a plan</option>
              <option value="home-10">Home 10Mbps</option>
              <option value="biz-50">Business 50Mbps</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Subscription Start Date</label>
            <input
              type="date"
              className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Notes (optional)</label>
          <textarea
            className="w-full rounded bg-slate-950 border border-slate-700 px-3 py-2"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
          >
            Save &amp; Return to List
          </button>
          <button
            type="button"
            className="rounded border border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-900"
          >
            Save &amp; Add Another
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscriberPage;
