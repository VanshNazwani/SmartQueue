'use client';

import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PageHeader() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Ticket className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">QueuePilot</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Live Queue
          </Link>
          <Link
            href="/my-token"
            className={cn(
              "transition-colors hover:text-primary",
              pathname === "/my-token" ? "text-primary" : "text-muted-foreground"
            )}
          >
            My Token
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end">
           <Button variant="ghost" asChild>
              <Link href="/dashboard">
                Staff Dashboard
              </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
