'use client';

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Token, QueueState, QueueContextType } from '@/types';

const initialState: QueueState = {
  tokens: [],
  currentlyServing: null,
  lastTokenNumber: 100,
  averageServiceTime: 3, // 3 minutes per token
};

export const QueueContext = createContext<QueueContextType | null>(null);

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<QueueState>(initialState);

  const generateToken = useCallback(() => {
    const newId = state.lastTokenNumber + 1;
    const waitingCount = state.tokens.filter(t => t.status === 'waiting').length + (state.currentlyServing ? 1 : 0);
    const estimatedWaitTime = Math.max(1, waitingCount * state.averageServiceTime);

    const newToken: Token = {
      id: newId,
      status: 'waiting',
      estimatedWaitTime,
      issueTime: Date.now(),
    };

    setState(prevState => ({
      ...prevState,
      tokens: [...prevState.tokens, newToken],
      lastTokenNumber: newId,
    }));
    return newToken;
  }, [state.lastTokenNumber, state.tokens, state.averageServiceTime, state.currentlyServing]);

  const callNextToken = useCallback(() => {
    let calledToken: Token | null = null;
    setState(prevState => {
      const newState = { ...prevState };
      const currentServingToken = newState.tokens.find(t => t.status === 'serving');
      if (currentServingToken) {
        currentServingToken.status = 'served';
      }

      const nextToken = newState.tokens.find(t => t.status === 'waiting');
      if (nextToken) {
        nextToken.status = 'serving';
        newState.currentlyServing = nextToken.id;
        calledToken = nextToken;
      } else {
        newState.currentlyServing = null;
      }
      return newState;
    });
    return calledToken;
  }, []);
  
  useEffect(() => {
    // Initialize with a few tokens
    setState(prevState => {
      const initialTokens: Token[] = [
        { id: 101, status: 'waiting', estimatedWaitTime: 1, issueTime: Date.now() - 200000 },
        { id: 102, status: 'waiting', estimatedWaitTime: 4, issueTime: Date.now() - 100000 },
        { id: 103, status: 'waiting', estimatedWaitTime: 7, issueTime: Date.now() },
      ];
      return { ...prevState, tokens: initialTokens, lastTokenNumber: 103 };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setState(prevState => {
        const waitingTokens = prevState.tokens.filter(t => t.status === 'waiting' || t.status === 'serving');
        const servingIndex = waitingTokens.findIndex(t => t.status === 'serving');
        
        const updatedTokens = prevState.tokens.map(token => {
          if (token.status === 'waiting') {
            const tokenIndex = waitingTokens.findIndex(t => t.id === token.id);
            const position = tokenIndex - (servingIndex !== -1 ? servingIndex : 0);
            const newWaitTime = Math.max(1, position * prevState.averageServiceTime);

            return { ...token, estimatedWaitTime: newWaitTime };
          }
          return token;
        });
        return { ...prevState, tokens: updatedTokens };
      });
    }, 5000); // Update wait times every 5 seconds

    return () => clearInterval(timer);
  }, [state.averageServiceTime]);

  const getUpcomingTokens = (count: number) => {
    return state.tokens.filter(t => t.status === 'waiting').slice(0, count);
  };
  
  const getTokenById = (id: number) => {
    return state.tokens.find(t => t.id === id);
  };
  
  const getQueueStats = () => {
    const waitingCount = state.tokens.filter(t => t.status === 'waiting').length;
    const servedTodayCount = state.tokens.filter(t => t.status === 'served').length;
    
    const totalWaitTime = state.tokens
      .filter(t => t.status === 'waiting')
      .reduce((sum, token) => sum + token.estimatedWaitTime, 0);
      
    const averageWaitTime = waitingCount > 0 ? Math.round(totalWaitTime / waitingCount) : 0;

    return { waitingCount, servedTodayCount, averageWaitTime };
  };

  const value = { ...state, generateToken, callNextToken, getUpcomingTokens, getTokenById, getQueueStats };

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};
