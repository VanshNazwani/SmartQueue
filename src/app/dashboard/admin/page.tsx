'use client';

import { useContext, useState, useMemo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, CheckCircle, Sparkles, Loader } from 'lucide-react';
import { QueueContext } from '@/context/queue-context';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { summarizeQueueAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People Waiting</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageWaitTime} min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Served Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servedTodayCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Token Traffic Today</CardTitle>
            <CardDescription>Number of tokens issued per hour (simulated).</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
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
                 <Bar dataKey="tokens" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" /> AI-Powered Summary
            </CardTitle>
            <CardDescription>Get an instant overview of the current queue status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGetSummary} disabled={isLoadingSummary} className="w-full">
              {isLoadingSummary && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Get AI Summary
            </Button>
            {summary && (
              <div className="mt-4 text-sm p-4 bg-muted/50 rounded-lg border">
                {summary}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
