'use client';

import { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Users, CheckCircle, Clock } from 'lucide-react';
import { QueueContext } from '@/context/queue-context';
import { useToast } from '@/hooks/use-toast';
import { generateNotificationAction } from '@/lib/actions';

export default function StaffDashboard() {
  const queue = useContext(QueueContext);
  const { toast } = useToast();

  if (!queue) {
    return <div>Loading queue...</div>;
  }

  const { currentlyServing, callNextToken, getUpcomingTokens, getQueueStats } = queue;
  const { waitingCount, servedTodayCount } = getQueueStats();

  const handleCallNext = async () => {
    const calledToken = callNextToken();
    if (calledToken) {
      toast({
        title: 'Called Next Customer',
        description: `Now serving token number ${calledToken.id}.`,
      });

      // AI Notification for the *next* person in line
      const upcoming = getUpcomingTokens(1);
      if (upcoming.length > 0) {
        const nextInLine = upcoming[0];
        const notification = await generateNotificationAction({
          tokenNumber: nextInLine.id.toString(),
          estimatedWaitTime: `${nextInLine.estimatedWaitTime} minutes`,
        });
        toast({
          title: '🤖 AI Notification Sent (Simulated)',
          description: `"${notification.message}"`,
          variant: 'default',
          className: 'bg-accent/30 border-accent',
        });
      }
    } else {
      toast({
        title: 'Queue is Empty',
        description: 'There are no customers to call.',
        variant: 'destructive',
      });
    }
  };
  
  const nextTokenId = getUpcomingTokens(1)[0]?.id;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <CardTitle className="text-sm font-medium">Served Today</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{servedTodayCount}</div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-2 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <CardTitle>Queue Control</CardTitle>
          <CardDescription>
            {nextTokenId ? `Token ${nextTokenId} is next in line.` : 'The queue is empty.'}
          </CardDescription>
        </div>
        <Button size="lg" onClick={handleCallNext} disabled={waitingCount === 0}>
          <Bell className="mr-2 h-5 w-5" />
          Call Next Customer
        </Button>
      </Card>
      <Card className="lg:col-span-4 md:col-span-2">
        <CardHeader>
            <CardTitle>Currently Serving</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-16">
            <div className="text-8xl font-extrabold text-primary">{currentlyServing ?? '--'}</div>
        </CardContent>
      </Card>
    </div>
  );
}
