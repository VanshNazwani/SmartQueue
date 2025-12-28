'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter
} from '@/components/ui/sidebar';
import { UserCog, Users, Ticket, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    return (
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="p-4">
              <Link href="/" className="flex items-center gap-2">
                <Ticket className="size-6 text-primary" />
                <span className="font-semibold text-lg">QueuePilot</span>
              </Link>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/staff'} tooltip="Staff View">
                      <Link href="/dashboard/staff"><Users /> Staff View</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === '/dashboard/admin'} tooltip="Admin View">
                      <Link href="/dashboard/admin"><UserCog /> Admin View</Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarFooter>
              <Button variant="ghost" asChild>
                <Link href="/">Back to Public View</Link>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className='flex-1'>
                    <h1 className="font-semibold text-lg">
                        {pathname.includes('admin') ? 'Admin Dashboard' : 'Staff Dashboard'}
                    </h1>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
    );
}
