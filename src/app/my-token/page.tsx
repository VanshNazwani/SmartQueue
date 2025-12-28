'use client';

import { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Users, Clock, Home } from 'lucide-react';
import { QueueContext } from '@/context/queue-context';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import type { Token } from '@/types';

export default function MyTokenPage() {
  const queue = useContext(QueueContext);
  const [userToken, setUserToken] = useState<Token | undefined | null>(null); // null for loading, undefined for not found
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    const tokenIdStr = localStorage.getItem('userTokenId');
    if (tokenIdStr && queue) {
      const tokenId = parseInt(tokenIdStr, 10);
      const token = queue.getTokenById(tokenId);
      setUserToken(token);

      if (token && token.status === 'waiting') {
        const waitingList = queue.tokens.filter(t => t.status === 'waiting' || t.status === 'serving');
        const userIndex = waitingList.findIndex(t => t.id === tokenId);
        const servingIndex = waitingList.findIndex(t => t.status === 'serving');
        const pos = userIndex - (servingIndex !== -1 ? servingIndex : 0);
        setPosition(pos);
      }
    } else {
      setUserToken(undefined);
    }
  }, [queue]);

  if (userToken === null) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="p-8 text-center"><CardContent>Loading your token...</CardContent></Card>
        </main>
      </div>
    );
  }
  
  if (userToken === undefined) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md text-center p-8">
            <CardHeader>
              <Ticket className="mx-auto h-12 w-12 text-muted-foreground" />
              <CardTitle className="mt-4">No Token Found</CardTitle>
              <CardDescription className="mt-2">You don't have an active token. Get one from the homepage.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/"><Home className="mr-2 h-4 w-4" /> Go to Homepage</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center shadow-2xl border-primary/20">
          <CardHeader className="bg-muted/30 p-8 rounded-t-lg">
             <CardDescription>Your Token Number</CardDescription>
             <div className="text-8xl font-bold text-primary">{userToken.id}</div>
          </CardHeader>
          <CardContent className="p-8">
            {userToken.status === 'waiting' && (
               <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                  <p className="text-4xl font-semibold mt-2">{position}</p>
                  <p className="text-sm text-muted-foreground">People Ahead of You</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                  <p className="text-4xl font-semibold mt-2">~{userToken.estimatedWaitTime}<span className="text-xl">min</span></p>
                  <p className="text-sm text-muted-foreground">Estimated Wait Time</p>
                </div>
              </div>
            )}
            {userToken.status === 'serving' && (
              <div className="text-3xl font-bold text-accent-foreground animate-pulse">It's your turn! Please proceed.</div>
            )}
             {userToken.status === 'served' && (
              <div className="text-xl text-muted-foreground">Your turn is complete. Thank you!</div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
