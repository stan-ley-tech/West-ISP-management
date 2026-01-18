import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../UI/Card';
import { FiHome, FiBarChart2, FiLayers, FiCreditCard, FiHelpCircle, FiMenu, FiX } from 'react-icons/fi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  subscriberId: string;
}

const SubscriberDashboard: React.FC<Props> = ({ subscriberId }) => {
  // Mocked data for now; this should be wired to real subscriber APIs later.
  const { logout } = useAuth();
  const profile = {
    fullName: 'Jane Doe',
    username: subscriberId,
    accountId: `ACC-${subscriberId.slice(0, 6).toUpperCase()}`,
    currentPlan: 'Fiber 50Mbps Unlimited',
    expiryDate: '2024-02-15',
    status: 'Active' as 'Active' | 'Grace' | 'Expired',
  };

  const initials = profile.fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const statusColorClasses: Record<typeof profile.status, string> = {
    Active: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
    Grace: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
    Expired: 'bg-red-500/10 text-red-300 border-red-500/40',
  };

  const monthlyUsage = [
    { day: 1, usedGb: 3, capGb: 10 },
    { day: 5, usedGb: 5, capGb: 10 },
    { day: 10, usedGb: 7, capGb: 10 },
    { day: 15, usedGb: 8.5, capGb: 10 },
    { day: 20, usedGb: 9.2, capGb: 10 },
    { day: 25, usedGb: 9.8, capGb: 10 },
  ];

  const plans = {
    current: {
      name: profile.currentPlan,
      speed: '50 Mbps down / 10 Mbps up',
      cap: 'Unlimited (FUP after 500GB)',
      price: '$35 / month',
      duration: '30 days',
    },
    options: [
      {
        name: 'Fiber 20Mbps',
        speed: '20 Mbps down / 5 Mbps up',
        cap: 'Unlimited (FUP after 300GB)',
        price: '$25 / month',
        duration: '30 days',
      },
      {
        name: 'Fiber 100Mbps',
        speed: '100 Mbps down / 20 Mbps up',
        cap: 'Unlimited (FUP after 800GB)',
        price: '$50 / month',
        duration: '30 days',
      },
    ],
  };

  const payments = [
    {
      id: 'INV-2024-001',
      date: '2024-01-01 09:15',
      amount: '$35.00',
      method: 'Card (Visa)',
      status: 'Paid',
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01 10:22',
      amount: '$35.00',
      method: 'Card (Visa)',
      status: 'Paid',
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-01 08:47',
      amount: '$35.00',
      method: 'Bank Transfer',
      status: 'Paid',
    },
  ];

  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSupportSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!supportName.trim() || !supportEmail.trim() || !supportMessage.trim()) {
      return;
    }
    // In a real app, this would POST to /support/tickets
    setSupportSent(true);
    setSupportMessage('');
  };

  type SectionId = 'welcome' | 'usage' | 'plans' | 'payments' | 'support';

  const [activeSection, setActiveSection] = useState<SectionId>('welcome');

  const contentRef = useRef<HTMLDivElement | null>(null);
  const welcomeRef = useRef<HTMLElement | null>(null);
  const usageRef = useRef<HTMLElement | null>(null);
  const plansRef = useRef<HTMLElement | null>(null);
  const paymentsRef = useRef<HTMLElement | null>(null);
  const supportRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections: { id: SectionId; el: HTMLElement | null }[] = [
        { id: 'welcome', el: welcomeRef.current },
        { id: 'usage', el: usageRef.current },
        { id: 'plans', el: plansRef.current },
        { id: 'payments', el: paymentsRef.current },
        { id: 'support', el: supportRef.current },
      ];

      const containerTop = container.getBoundingClientRect().top;

      let bestId: SectionId = 'welcome';
      let bestDistance = Number.POSITIVE_INFINITY;

      sections.forEach(({ id, el }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop - 16);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      setActiveSection(bestId);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const container = contentRef.current;
    if (!container) return;

    const map: Record<SectionId, React.RefObject<HTMLElement>> = {
      welcome: welcomeRef,
      usage: usageRef,
      plans: plansRef,
      payments: paymentsRef,
      support: supportRef,
    };

    const targetRef = map[id];
    const el = targetRef.current;
    if (!el) return;

    const offsetTop = el.offsetTop;
    container.scrollTo({ top: offsetTop - 8, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:grid md:grid-cols-[200px,minmax(0,1fr)] md:gap-6">
      <aside className="mb-4 md:mb-0 md:sticky md:top-4 self-start">
        <div className="flex items-center justify-between md:block mb-2 md:mb-4">
          <h1 className="text-lg font-semibold tracking-tight">Subscriber Portal</h1>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            {isNavOpen ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
        <nav
          className={`${isNavOpen ? 'block' : 'hidden'} md:block space-y-1 text-sm`}
          aria-label="Subscriber sections"
        >
          <a
            href="#welcome"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('welcome');
              setIsNavOpen(false);
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1 border text-xs ${
              activeSection === 'welcome'
                ? 'bg-slate-900 text-slate-50 border-emerald-500/60'
                : 'text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <FiHome className="h-3 w-3" />
            <span>Overview</span>
          </a>
          <a
            href="#usage"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('usage');
              setIsNavOpen(false);
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1 border text-xs ${
              activeSection === 'usage'
                ? 'bg-slate-900 text-slate-50 border-emerald-500/60'
                : 'text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <FiBarChart2 className="h-3 w-3" />
            <span>Monthly Usage</span>
          </a>
          <a
            href="#plans"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('plans');
              setIsNavOpen(false);
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1 border text-xs ${
              activeSection === 'plans'
                ? 'bg-slate-900 text-slate-50 border-emerald-500/60'
                : 'text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <FiLayers className="h-3 w-3" />
            <span>Plans</span>
          </a>
          <a
            href="#payments"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('payments');
              setIsNavOpen(false);
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1 border text-xs ${
              activeSection === 'payments'
                ? 'bg-slate-900 text-slate-50 border-emerald-500/60'
                : 'text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <FiCreditCard className="h-3 w-3" />
            <span>Payments</span>
          </a>
          <a
            href="#support"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('support');
              setIsNavOpen(false);
            }}
            className={`flex items-center gap-2 rounded-md px-3 py-1 border text-xs ${
              activeSection === 'support'
                ? 'bg-slate-900 text-slate-50 border-emerald-500/60'
                : 'text-slate-200 border-slate-800 hover:bg-slate-900'
            }`}
          >
            <FiHelpCircle className="h-3 w-3" />
            <span>Support</span>
          </a>
        </nav>
      </aside>

      <div
        ref={contentRef}
        className="space-y-8 md:max-h-[calc(100vh-5rem)] md:overflow-y-auto pr-2"
      >

      {/* 1. Welcome card */}
      <section id="welcome" ref={welcomeRef} className="pb-2">
        <Card title={`Welcome back, ${profile.fullName}!`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-slate-200">
              <div className="flex gap-4 flex-wrap">
                <span>
                  <span className="text-slate-400">Current Plan:</span> {profile.currentPlan}
                </span>
                <span>
                  <span className="text-slate-400">Expires:</span> {profile.expiryDate}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusColorClasses[profile.status]}`}
              >
                {profile.status}
              </span>
            </div>
          </div>
          <div className="mt-4 border-t border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-slate-100">
                {initials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-100">{profile.fullName}</span>
                <span className="text-[11px] text-slate-400">Subscriber account</span>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="text-[11px] font-medium text-slate-300 hover:text-red-400 hover:underline"
            >
              Logout
            </button>
          </div>
        </Card>
      </section>

      {/* 2. Monthly usage graph */}
      <section id="usage" ref={usageRef} className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Monthly Usage</h2>
        <Card>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyUsage} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(d: number) => `Day ${d}`}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${v}GB`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    borderColor: '#1f2937',
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                  formatter={(value: any) => [`${value} GB used`, 'Usage']}
                />
                <Area
                  type="monotone"
                  dataKey="usedGb"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#usageGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Usage is approximated for this mock view. In production, this would be driven by RADIUS accounting or
            session logs for the current billing period.
          </p>
        </Card>
      </section>

      {/* 3. Packages / Plans */}
      <section id="plans" ref={plansRef} className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Packages &amp; Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Current Plan">
            <div className="space-y-1 text-sm text-slate-200">
              <p className="font-medium text-emerald-200">{plans.current.name}</p>
              <p className="text-slate-300">{plans.current.speed}</p>
              <p className="text-slate-300">{plans.current.cap}</p>
              <p className="text-slate-200">{plans.current.price}</p>
              <p className="text-slate-400 text-xs">{plans.current.duration}</p>
            </div>
          </Card>
          {plans.options.map((plan) => (
            <Card key={plan.name} title={plan.name}>
              <div className="space-y-1 text-sm text-slate-200">
                <p className="text-slate-300">{plan.speed}</p>
                <p className="text-slate-300">{plan.cap}</p>
                <p className="text-slate-200">{plan.price}</p>
                <p className="text-slate-400 text-xs">{plan.duration}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <button className="rounded border border-emerald-500/60 bg-emerald-600/20 px-3 py-1 text-emerald-200 hover:bg-emerald-600/30">
                  Upgrade Plan
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Payment history */}
      <section id="payments" ref={paymentsRef} className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Payment History</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-slate-400">
                  <th className="px-3 py-2 font-medium">Invoice ID</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Method</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-slate-800">
                    <td className="px-3 py-2 text-sky-300">{p.id}</td>
                    <td className="px-3 py-2 text-slate-200">{p.date}</td>
                    <td className="px-3 py-2 text-slate-200">{p.amount}</td>
                    <td className="px-3 py-2 text-slate-300">{p.method}</td>
                    <td className="px-3 py-2 text-slate-300">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* 5. Contact / Support */}
      <section id="support" ref={supportRef} className="space-y-3 pb-8">
        <h2 className="text-lg font-semibold tracking-tight">Contact &amp; Support</h2>
        <Card>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-200">
            <div className="space-y-2">
              <p>
                For any issues with your connection or billing, reach out to our support team and we will be happy to
                help.
              </p>
              <p>
                <span className="text-slate-400">Email:</span> support@yourisp.example
              </p>
              <p>
                <span className="text-slate-400">Phone / WhatsApp:</span> +1 (555) 123-4567
              </p>
              <p className="text-xs text-slate-400">
                For urgent issues like no connectivity or payment problems, please reach out using the email or phone
                contacts above so we can assist you as quickly as possible.
              </p>
            </div>

            <form className="space-y-3" onSubmit={handleSupportSubmit}>
              <div>
                <label className="block text-xs text-slate-400 mb-1" htmlFor="support-name">
                  Name
                </label>
                <input
                  id="support-name"
                  type="text"
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1" htmlFor="support-email">
                  Email
                </label>
                <input
                  id="support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1" htmlFor="support-message">
                  Message
                </label>
                <textarea
                  id="support-message"
                  rows={3}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded border border-sky-500/60 bg-sky-600/20 px-3 py-1.5 text-xs font-medium text-sky-200 hover:bg-sky-600/30"
              >
                Send Message
              </button>
              {supportSent && (
                <p className="text-[11px] text-emerald-300">
                  Message sent. Our support team will get back to you shortly.
                </p>
              )}
            </form>
          </div>
        </Card>
      </section>
      </div>
    </div>
  );
};

export default SubscriberDashboard;
