'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { TopNav } from '@/components/layout/top-nav';
import { usePathname } from 'next/navigation';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Pages that don't need the layout
  const noLayoutPaths = ['/auth', '/display', '/kiosk'];
  const shouldShowLayout = !noLayoutPaths.some(path => pathname.startsWith(path));

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <TopNav />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
