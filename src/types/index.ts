export interface Token {
  id: number;
  status: 'waiting' | 'serving' | 'served';
  estimatedWaitTime: number; // in minutes
  issueTime: number; // timestamp
}

export interface QueueState {
  tokens: Token[];
  currentlyServing: number | null;
  lastTokenNumber: number;
  averageServiceTime: number; // in minutes
}

export interface QueueContextType extends QueueState {
  generateToken: () => Token;
  callNextToken: () => Token | null;
  getUpcomingTokens: (count: number) => Token[];
  getTokenById: (id: number) => Token | undefined;
  getQueueStats: () => {
    waitingCount: number;
    servedTodayCount: number;
    averageWaitTime: number;
  };
}
