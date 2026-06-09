'use client';

import { ReactNode } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  description?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  animated?: boolean;
}

export function KPICard({
  title,
  value,
  icon,
  trend,
  description,
  variant = 'default',
  animated = false,
}: KPICardProps) {
  const getBgColor = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-50 dark:bg-blue-950';
      case 'success':
        return 'bg-green-50 dark:bg-green-950';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950';
      case 'danger':
        return 'bg-red-50 dark:bg-red-950';
      default:
        return 'bg-slate-50 dark:bg-slate-900';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-blue-600 dark:text-blue-400';
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-amber-600 dark:text-amber-400';
      case 'danger':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </CardTitle>
          <div className={cn('p-2 rounded-lg', getBgColor())}>
            <div className={getIconColor()}>{icon}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className={cn('text-3xl font-bold', animated && 'tabular-nums')}>
          {value}
        </div>

        {(trend || description) && (
          <div className="flex items-center gap-2">
            {trend && (
              <>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium rounded px-2 py-1',
                    trend.direction === 'up' &&
                      'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',
                    trend.direction === 'down' &&
                      'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400',
                    trend.direction === 'neutral' &&
                      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                  )}
                >
                  {trend.direction === 'up' && <ArrowUp className="w-4 h-4" />}
                  {trend.direction === 'down' && <ArrowDown className="w-4 h-4" />}
                  {trend.direction === 'neutral' && <Minus className="w-4 h-4" />}
                  <span>{Math.abs(trend.value)}%</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">vs last month</span>
              </>
            )}
            {description && !trend && (
              <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
