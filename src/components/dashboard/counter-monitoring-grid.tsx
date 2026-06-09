'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CounterData {
  id: string;
  number: string;
  currentToken: string;
  staffName: string;
  status: 'active' | 'busy' | 'idle' | 'break' | 'offline';
  waitingCount: number;
  serviceDuration: number;
}

const counterData: CounterData[] = [
  {
    id: '1',
    number: '1',
    currentToken: 'A101',
    staffName: 'John Doe',
    status: 'busy',
    waitingCount: 5,
    serviceDuration: 8,
  },
  {
    id: '2',
    number: '2',
    currentToken: 'A102',
    staffName: 'Sarah Smith',
    status: 'active',
    waitingCount: 3,
    serviceDuration: 5,
  },
  {
    id: '3',
    number: '3',
    currentToken: '-',
    staffName: 'Mike Johnson',
    status: 'break',
    waitingCount: 0,
    serviceDuration: 0,
  },
  {
    id: '4',
    number: '4',
    currentToken: 'A103',
    staffName: 'Emma Davis',
    status: 'active',
    waitingCount: 7,
    serviceDuration: 6,
  },
  {
    id: '5',
    number: '5',
    currentToken: '-',
    staffName: 'Offline',
    status: 'offline',
    waitingCount: 0,
    serviceDuration: 0,
  },
  {
    id: '6',
    number: '6',
    currentToken: 'A104',
    staffName: 'Alex Wilson',
    status: 'active',
    waitingCount: 4,
    serviceDuration: 7,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800';
    case 'busy':
      return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800';
    case 'idle':
      return 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700';
    case 'break':
      return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800';
    case 'offline':
      return 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 border-red-200 dark:border-red-800';
    default:
      return 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400';
    case 'busy':
      return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400';
    case 'idle':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
    case 'break':
      return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400';
    case 'offline':
      return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
  }
};

export function CounterMonitoringGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Counter Status Grid</h3>
        <Badge variant="outline">Real-time Updated</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {counterData.map((counter) => (
          <Card
            key={counter.id}
            className={cn(
              'overflow-hidden border-2 transition-all duration-300 hover:shadow-lg',
              getStatusColor(counter.status)
            )}
          >
            <CardHeader className="pb-3 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Counter
                  </p>
                  <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {counter.number}
                  </h4>
                </div>
                <Badge className={cn('capitalize text-xs', getStatusBadge(counter.status))}>
                  {counter.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Current Token */}
              <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Current Token</p>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {counter.currentToken}
                  </p>
                </div>
              </div>

              {/* Staff Name */}
              <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Staff</p>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {counter.staffName}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/20 dark:border-black/20">
                <div className="flex items-center gap-1 p-2 bg-white/30 dark:bg-black/10 rounded">
                  <Users className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Waiting</p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {counter.waitingCount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 p-2 bg-white/30 dark:bg-black/10 rounded">
                  <Clock className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Avg Time</p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {counter.serviceDuration}m
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
