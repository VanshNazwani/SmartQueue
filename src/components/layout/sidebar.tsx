'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Radio, 
  Ticket, 
  Grid3x3, 
  Users, 
  UserCheck, 
  Calendar,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    submenu: []
  },
  {
    label: 'Queues',
    icon: Radio,
    href: '/dashboard/queues',
    submenu: []
  },
  {
    label: 'Tokens',
    icon: Ticket,
    href: '/dashboard/tokens',
    submenu: []
  },
  {
    label: 'Counters',
    icon: Grid3x3,
    href: '/dashboard/counters',
    submenu: []
  },
  {
    label: 'Staff',
    icon: Users,
    href: '/dashboard/staff',
    submenu: []
  },
  {
    label: 'Customers',
    icon: UserCheck,
    href: '/dashboard/customers',
    submenu: []
  },
  {
    label: 'Reservations',
    icon: Calendar,
    href: '/dashboard/reservations',
    submenu: []
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    submenu: []
  },
  {
    label: 'Notifications',
    icon: Bell,
    href: '/dashboard/notifications',
    submenu: []
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    submenu: []
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-lg transition-transform duration-300 z-40 flex flex-col overflow-y-auto',
          !isOpen && '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 dark:text-white">SmartQueue</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">2.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    active
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="w-4 h-4" />}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
