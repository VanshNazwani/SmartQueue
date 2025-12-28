'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Users, Clock, QrCode } from 'lucide-react';
import { QueueContext } from '@/context/queue-context';
import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const router = useRouter();
  const queue = useContext(QueueContext);
  const { toast } = useToast();

  if (!queue) {
    return null; // Or a loading spinner
  }

  const { generateToken, currentlyServing, getUpcomingTokens } = queue;
  const upcomingTokens = getUpcomingTokens(4);

  const handleGetToken = () => {
    const newToken = generateToken();
    localStorage.setItem('userTokenId', newToken.id.toString());
    router.push('/my-token');
  };

  const handleJoinWithCode = () => {
    // For this prototype, this will also just generate a generic token.
    // In a real app, this would be tied to a specific location's queue.
    toast({
      title: 'Joined Queue via Code',
      description: 'You have been added to the queue for the specified location.',
    });
    handleGetToken();
  };

  const handleScanQr = () => {
     toast({
      title: 'QR Scanner Opened (Simulated)',
      description: 'In a real app, this would open your camera to scan a QR code.',
    });
    // In a real app, after scanning, you would join the queue.
    // For now, we'll simulate this by generating a token after a delay.
    setTimeout(() => {
        handleGetToken();
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2 md:col-span-2 col-span-1 flex flex-col items-center justify-center text-center p-8 bg-card shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join a Queue
              </CardTitle>
              <CardDescription className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                Scan a QR code at the location or enter a code to get your token.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full max-w-sm flex flex-col gap-4">
              <Button size="lg" onClick={handleScanQr}>
                <QrCode className="mr-2 h-5 w-5" />
                Scan QR Code
              </Button>
              <div className="flex items-center gap-2">
                <Input type="text" placeholder="Or enter location code" className="text-center" />
                <Button onClick={handleJoinWithCode}>Join</Button>
              </div>
               <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or
                    </span>
                </div>
              </div>
               <Button size="lg" variant="outline" onClick={handleGetToken}>
                <Ticket className="mr-2 h-5 w-5" />
                Get a Generic Token
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center text-center p-8 bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary">Now Serving</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-7xl font-bold text-primary animate-pulse">
                {currentlyServing ?? '--'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Users className="mr-2 text-primary" />
            Upcoming Tokens
          </h2>
          {upcomingTokens.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {upcomingTokens.map((token, index) => (
                <Card key={token.id} className={`p-4 flex flex-col justify-between ${index === 0 ? 'bg-accent/30 border-accent' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold">{token.id}</div>
                    {index === 0 && <div className="text-sm font-semibold text-accent-foreground/80">UP NEXT</div>}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mt-2">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>~{token.estimatedWaitTime} min wait</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">The queue is currently empty.</Card>
          )}
        </div>
      </main>
    </div>
  );
}
