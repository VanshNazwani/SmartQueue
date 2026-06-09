'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface QueueData {
  id: string;
  name: string;
  waiting: number;
  serving: number;
  completed: number;
  avgWait: number;
  status: 'active' | 'idle' | 'busy' | 'offline';
}

const queueData: QueueData[] = [
  {
    id: '1',
    name: 'Counter A',
    waiting: 12,
    serving: 1,
    completed: 45,
    avgWait: 8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Counter B',
    waiting: 8,
    serving: 1,
    completed: 42,
    avgWait: 6,
    status: 'active',
  },
  {
    id: '3',
    name: 'Counter C',
    waiting: 0,
    serving: 0,
    completed: 38,
    avgWait: 0,
    status: 'idle',
  },
  {
    id: '4',
    name: 'Counter D',
    waiting: 18,
    serving: 1,
    completed: 52,
    avgWait: 12,
    status: 'busy',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400';
    case 'busy':
      return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400';
    case 'idle':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
    case 'offline':
      return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400';
    default:
      return 'bg-slate-100 dark:bg-slate-800';
  }
};

export function QueueMonitoringTable() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Real-Time Queue Monitoring</CardTitle>
        <TrendingUp className="w-5 h-5 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold">Queue Name</TableHead>
                <TableHead className="text-right font-semibold">Waiting</TableHead>
                <TableHead className="text-right font-semibold">Serving</TableHead>
                <TableHead className="text-right font-semibold">Completed</TableHead>
                <TableHead className="text-right font-semibold">Avg Wait</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queueData.map((queue) => (
                <TableRow
                  key={queue.id}
                  className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {queue.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {queue.waiting}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {queue.serving}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {queue.completed}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">{queue.avgWait} min</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('capitalize', getStatusColor(queue.status))}>
                      {queue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Pause Queue</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
