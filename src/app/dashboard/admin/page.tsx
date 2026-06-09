'use client';

import { useContext, useState, useMemo } from 'react';
import { Users, Clock, CheckCircle, Sparkles, Loader, TrendingUp, Zap, Activity } from 'lucide-react';
import { QueueContext } from '@/context/queue-context';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { summarizeQueueAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard } from '@/components/dashboard/kpi-card';
import { QueueMonitoringTable } from '@/components/dashboard/queue-monitoring-table';
import { CounterMonitoringGrid } from '@/components/dashboard/counter-monitoring-grid';
import { LiveOperationsFeed } from '@/components/dashboard/live-operations-feed';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const queue = useContext(QueueContext);
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleGetSummary = async () => {
    if (!queue) return;
    setIsLoadingSummary(true);
    const queueDataString = JSON.stringify(
      queue.tokens.map(t => ({ id: t.id, status: t.status, wait: t.estimatedWaitTime }))
    );
    const result = await summarizeQueueAction({ queueData: queueDataString });
    setSummary(result.summary);
    setIsLoadingSummary(false);
  };
  
  // Mock data for chart
  const chartData = useMemo(() => {
    return [
      { time: '9am', tokens: 5 },
      { time: '10am', tokens: 8 },
      { time: '11am', tokens: 15 },
      { time: '12pm', tokens: 25 },
      { time: '1pm', tokens: 18 },
      { time: '2pm', tokens: 12 },
      { time: '3pm', tokens: 9 },
    ];
  }, []);

  if (!queue) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
        <Skeleton className="md:col-span-2 lg:col-span-4 h-80" />
      </div>
    );
  }
  
  const { waitingCount, servedTodayCount, averageWaitTime } = queue.getQueueStats();

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Operations Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Real-time queue management and analytics
          </p>
        </div>
      </div>

      {/* Executive KPI Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KPICard
          title="Total Customers"
          value={servedTodayCount + waitingCount}
          icon={<Users className="w-5 h-5" />}
          variant="primary"
          trend={{ value: 12, direction: 'up' }}
        />
        <KPICard
          title="Active Queues"
          value={4}
          icon={<Activity className="w-5 h-5" />}
          variant="success"
          description="Online & Operating"
        />
        <KPICard
          title="Avg Wait Time"
          value={`${averageWaitTime} min`}
          icon={<Clock className="w-5 h-5" />}
          variant="warning"
          trend={{ value: 5, direction: 'down' }}
        />
        <KPICard
          title="Satisfaction"
          value="4.6/5"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="success"
          trend={{ value: 8, direction: 'up' }}
        />
        <KPICard
          title="Active Staff"
          value={8}
          icon={<Users className="w-5 h-5" />}
          variant="primary"
          description="On duty now"
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Queue & Counter Monitoring */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-Time Queue Monitoring */}
          <QueueMonitoringTable />

          {/* Counter Monitoring Grid */}
          <CounterMonitoringGrid />

          {/* Token Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Token Traffic Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  />
                  <Bar dataKey="tokens" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Feed & AI Insights */}
        <div className="space-y-6">
          {/* Live Operations Feed */}
          <LiveOperationsFeed />

          {/* AI Insight Center */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGetSummary} disabled={isLoadingSummary} className="w-full gap-2">
                {isLoadingSummary && <Loader className="w-4 h-4 animate-spin" />}
                Generate Summary
              </Button>

              {summary && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-slate-900 dark:text-white">{summary}</p>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-xs font-medium text-amber-900 dark:text-amber-200">
                    ⚠️ Queue Traffic
                  </p>
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mt-1">
                    Expected to rise 25%
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">Confidence: 87%</p>
                </div>

                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-medium text-blue-900 dark:text-blue-200">
                    💡 Recommendation
                  </p>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mt-1">
                    Add staff at 2 PM
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">Peak load expected</p>
                </div>

                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs font-medium text-green-900 dark:text-green-200">
                    ✅ Counter 4 Optimized
                  </p>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mt-1">
                    95% Utilization
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-300 mt-1">Excellent performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'John Doe', customers: 52, rating: 4.8, badge: '🥇' },
                  { name: 'Sarah Smith', customers: 48, rating: 4.7, badge: '🥈' },
                  { name: 'Emma Davis', customers: 45, rating: 4.6, badge: '🥉' },
                ].map((staff, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="text-xl">{staff.badge}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{staff.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {staff.customers} served • {staff.rating} ⭐
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
