import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiBarChart2,
  FiBriefcase,
  FiChevronDown,
  FiChevronRight,
  FiCreditCard,
  FiHome,
  FiLayers,
  FiMenu,
  FiUser,
  FiUsers,
} from 'react-icons/fi';

type AdminSidebarSectionId =
  | 'dashboard'
  | 'subscribers'
  | 'subscriptions'
  | 'plans'
  | 'billing'
  | 'analytics';

interface SidebarItem {
  key: string;
  label: string;
  path?: string;
}

interface SidebarSection {
  id: AdminSidebarSectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SidebarItem[];
}

const ADMIN_SECTIONS: SidebarSection[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: FiHome,
    items: [],
  },
  {
    id: 'subscribers',
    label: 'Subscribers',
    icon: FiUsers,
    items: [
      { key: 'all-subscribers', label: 'All Subscribers', path: '/subscribers' },
      { key: 'active-subscribers', label: 'Active Subscribers', path: '/subscribers/active' },
      { key: 'expired-subscribers', label: 'Expired Subscribers', path: '/subscribers/expired' },
      { key: 'online-sessions', label: 'Online Sessions', path: '/subscribers/online-sessions' },
      { key: 'add-subscriber', label: 'Add Subscriber', path: '/subscribers/new' },
    ],
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: FiBarChart2,
    items: [
      { key: 'active-subscriptions', label: 'Active Subscriptions', path: '/subscriptions/active' },
      { key: 'expired-subscriptions', label: 'Expired Subscriptions', path: '/subscriptions/expired' },
      { key: 'grace-subscriptions', label: 'Grace Period Subscriptions', path: '/subscriptions/grace' },
      { key: 'renewals', label: 'Renewals', path: '/subscriptions/renewals' },
      { key: 'subscription-history', label: 'Subscription History', path: '/subscriptions/history' },
    ],
  },
  {
    id: 'plans',
    label: 'Plans & Services',
    icon: FiLayers,
    items: [
      { key: 'all-plans', label: 'All Plans', path: '/plans' },
      { key: 'create-plan', label: 'Create Plan', path: '/plans/new' },
      { key: 'plan-groups', label: 'Plan Groups', path: '/plans/groups' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing & Payments',
    icon: FiCreditCard,
    items: [
      { key: 'payments', label: 'Payments', path: '/billing/payments' },
      { key: 'invoices', label: 'Invoices', path: '/billing/invoices' },
      { key: 'receipts', label: 'Receipts', path: '/billing/receipts' },
      { key: 'manual-payments', label: 'Manual Payments', path: '/billing/manual' },
      { key: 'refunds-adjustments', label: 'Refunds / Adjustments', path: '/billing/refunds' },
    ],
  },
  {
    id: 'analytics',
    label: 'Usage & Analytics',
    icon: FiBarChart2,
    items: [
      { key: 'data-usage', label: 'Data Usage', path: '/analytics/usage' },
      { key: 'peak-usage', label: 'Peak Usage', path: '/analytics/peak' },
      { key: 'revenue-reports', label: 'Revenue Reports', path: '/analytics/revenue' },
      { key: 'subscription-reports', label: 'Subscription Reports', path: '/analytics/subscriptions' },
      { key: 'export-data', label: 'Export Data', path: '/analytics/export' },
    ],
  },
];

interface SidebarProps {
  role: 'admin' | 'subscriber' | null;
}

const AdminSidebarInner: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openSectionId, setOpenSectionId] = useState<AdminSidebarSectionId | null>('dashboard');

  const sectionOrder: AdminSidebarSectionId[] = ADMIN_SECTIONS.map((section) => section.id);
  const [activeSectionId, setActiveSectionId] = useState<AdminSidebarSectionId>('dashboard');

  const navRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  const scrollStateRef = useRef(scrollState);

  useEffect(() => {
    scrollStateRef.current = scrollState;
  }, [scrollState]);

  const scrollSectionIntoView = (id: AdminSidebarSectionId) => {
    const container = navRef.current;
    if (!container) return;

    const headerEl = document.getElementById(`sidebar-section-header-${id}`);
    const bodyEl = document.getElementById(`sidebar-section-${id}`);

    if (!headerEl) return;

    const containerRect = container.getBoundingClientRect();
    const headerRect = headerEl.getBoundingClientRect();
    const targetBottom = bodyEl?.getBoundingClientRect().bottom ?? headerRect.bottom;

    if (headerRect.top < containerRect.top) {
      container.scrollTo({
        top: container.scrollTop + (headerRect.top - containerRect.top),
        behavior: 'smooth',
      });
    } else if (targetBottom > containerRect.bottom) {
      container.scrollTo({
        top: container.scrollTop + (targetBottom - containerRect.bottom),
        behavior: 'smooth',
      });
    }
  };

  const handleSectionClick = (id: AdminSidebarSectionId) => {
    const isCurrentlyOpen = openSectionId === id;
    const willOpen = !isCurrentlyOpen;

    setActiveSectionId(id);

    if (id === 'dashboard') {
      setOpenSectionId(null);
      navigate('/dashboard');
      return;
    }

    setOpenSectionId(willOpen ? id : null);

    if (willOpen) {
      window.requestAnimationFrame(() => {
        scrollSectionIntoView(id);
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setOpenSectionId(null);
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      return;
    }
    event.preventDefault();

    if (!activeSectionId) {
      setActiveSectionId(sectionOrder[0]);
      return;
    }

    const currentIndex = sectionOrder.indexOf(activeSectionId);
    if (currentIndex === -1) {
      setActiveSectionId(sectionOrder[0]);
      return;
    }

    if (event.key === 'ArrowDown') {
      const next = sectionOrder[(currentIndex + 1) % sectionOrder.length];
      setActiveSectionId(next);
      return;
    }

    if (event.key === 'ArrowUp') {
      const prev = sectionOrder[(currentIndex - 1 + sectionOrder.length) % sectionOrder.length];
      setActiveSectionId(prev);
      return;
    }

    // Enter or Space activates the currently focused section
    handleSectionClick(activeSectionId);
  };

  const handleScrollUpdate = useCallback(() => {
    const el = navRef.current;
    if (!el) return;

    setScrollState({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
    });
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    handleScrollUpdate();

    el.addEventListener('scroll', handleScrollUpdate);
    window.addEventListener('resize', handleScrollUpdate);

    return () => {
      el.removeEventListener('scroll', handleScrollUpdate);
      window.removeEventListener('resize', handleScrollUpdate);
    };
  }, [handleScrollUpdate]);

  const isDraggingRef = useRef(false);

  const handleWindowMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    const container = navRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const rect = track.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const clamped = Math.max(0, Math.min(1, ratio));

    const { scrollHeight, clientHeight } = scrollStateRef.current;
    const maxScrollTop = Math.max(scrollHeight - clientHeight, 0);
    container.scrollTop = maxScrollTop * clamped;
  }, []);

  const handleWindowMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    window.removeEventListener('mousemove', handleWindowMouseMove);
    window.removeEventListener('mouseup', handleWindowMouseUp);
  }, [handleWindowMouseMove]);

  const handleHandleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!navRef.current) return;

    isDraggingRef.current = true;
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = navRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Avoid interfering with handle drag clicks
    if (e.target !== track) return;

    const rect = track.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const clamped = Math.max(0, Math.min(1, ratio));

    const { scrollHeight, clientHeight } = scrollStateRef.current;
    const maxScrollTop = Math.max(scrollHeight - clientHeight, 0);
    container.scrollTo({
      top: maxScrollTop * clamped,
      behavior: 'smooth',
    });
  };

  const { scrollTop, scrollHeight, clientHeight } = scrollState;
  const scrollable = scrollHeight > clientHeight + 1;

  // Default to a compact, centered handle when there is no scrollable overflow
  let handleHeightPct = 30;
  let handleTopPct = 35;

  if (scrollable) {
    const visibleRatio = clientHeight / scrollHeight;
    handleHeightPct = Math.max(visibleRatio * 100, 12);

    const maxTop = 100 - handleHeightPct;
    const maxScrollTop = Math.max(scrollHeight - clientHeight, 1);
    handleTopPct = (scrollTop / maxScrollTop) * maxTop;
  }

  const widthClass = collapsed ? 'w-16' : 'w-64';

  return (
    <aside
      className={`hidden md:flex group/sidebar relative flex-col border-r border-slate-800 bg-slate-950/60 ${widthClass} transition-all duration-200`}
    >
      <div className="flex items-center justify-end px-3 py-2">
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FiMenu className="h-3 w-3" />
        </button>
      </div>

      <nav
        ref={navRef}
        role="navigation"
        aria-label="Admin sidebar"
        className="flex-1 overflow-y-auto px-2 py-3 space-y-1"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon;
          const open = openSectionId === section.id;
          const isActive = section.id === activeSectionId;

          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => handleSectionClick(section.id)}
                className={`flex w-full items-center rounded px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${
                  isActive ? 'bg-slate-900 text-slate-50' : 'text-slate-400 hover:bg-slate-900'
                }`}
                aria-expanded={open}
                aria-controls={`sidebar-section-${section.id}`}
                id={`sidebar-section-header-${section.id}`}
              >
                {collapsed && <Icon className="h-4 w-4 text-slate-300" />}
                {!collapsed && (
                  <>
                    <span>{section.label}</span>
                    <span className="ml-auto text-slate-500">
                      <FiChevronDown
                        className={`h-3 w-3 transform transition-transform duration-200 ${
                          open ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    </span>
                  </>
                )}
              </button>

              {!collapsed && (
                <div
                  id={`sidebar-section-${section.id}`}
                  role="group"
                  aria-label={`${section.label} subsections`}
                  className={`mt-1 space-y-0.5 pl-6 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out ${
                    open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {section.items.map((item) =>
                    item.path ? (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        className={({ isActive }) =>
                          [
                            'flex items-center rounded px-2 py-1 text-[11px]',
                            isActive
                              ? 'bg-slate-800 text-slate-50 border-l-2 border-emerald-400'
                              : 'text-slate-300 hover:bg-slate-900 hover:text-slate-50',
                          ].join(' ')
                        }
                      >
                        <span>{item.label}</span>
                      </NavLink>
                    ) : (
                      <div
                        key={item.key}
                        className="flex items-center rounded px-2 py-1 text-[11px] text-slate-500"
                      >
                        <span>{item.label}</span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="pointer-events-none absolute right-0 top-14 bottom-8 flex items-stretch pr-[2px]">
        <div
          ref={trackRef}
          className="pointer-events-auto relative w-1.5 rounded-full bg-slate-900/80 opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100 hover:opacity-100 focus-visible:opacity-100"
          onMouseDown={handleTrackClick}
          role="scrollbar"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={Math.max(scrollHeight - clientHeight, 0)}
          aria-valuenow={scrollTop}
          aria-label="Sidebar scroll"
          tabIndex={0}
        >
          <div
            className="absolute left-0 right-0 rounded-full bg-slate-500/70 cursor-pointer transition-colors duration-150 hover:bg-slate-300"
            style={{ top: `${handleTopPct}%`, height: `${handleHeightPct}%` }}
            onMouseDown={handleHandleMouseDown}
          />
        </div>
      </div>
    </aside>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  if (role !== 'admin') {
    return null;
  }

  return <AdminSidebarInner />;
};

export default Sidebar;
