'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export default function DisplayPage() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col p-8 gap-6">
      {/* Header with Time */}
      <div className="flex items-center justify-between text-white">
        <div>
          <h1 className="text-5xl font-black tracking-tight">SmartQueue</h1>
          <p className="text-xl text-slate-300 mt-2">Service Status Display</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold">{time}</p>
          <p className="text-slate-300 text-lg mt-2">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* NOW SERVING Section */}
        <Card className="overflow-hidden border-4 border-green-500 dark:border-green-600 shadow-2xl bg-white dark:bg-slate-900">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white pb-6">
            <CardTitle className="text-4xl font-black">NOW SERVING</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {[
              { counter: 'Counter 1', token: 'A110' },
              { counter: 'Counter 2', token: 'A112' },
              { counter: 'Counter 3', token: 'A115' },
              { counter: 'Counter 4', token: 'A118' },
            ].map((item) => (
              <div
                key={item.counter}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border-2 border-green-200 dark:border-green-800"
              >
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {item.counter}
                  </p>
                  <p className="text-4xl font-black text-green-600 dark:text-green-400 mt-1">
                    {item.token}
                  </p>
                </div>
                <div className="animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-400 dark:bg-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* NEXT TOKENS Section */}
        <Card className="overflow-hidden border-4 border-blue-500 dark:border-blue-600 shadow-2xl bg-white dark:bg-slate-900">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
            <CardTitle className="text-4xl font-black">NEXT TOKENS</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {[
              { position: 1, token: 'A120', wait: 'In ~2 min' },
              { position: 2, token: 'A121', wait: 'In ~5 min' },
              { position: 3, token: 'A122', wait: 'In ~8 min' },
              { position: 4, token: 'A123', wait: 'In ~11 min' },
              { position: 5, token: 'A124', wait: 'In ~14 min' },
            ].map((item) => (
              <div
                key={item.token}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 text-lg">
                    {item.position}
                  </div>
                  <div>
                    <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                      {item.token}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                    {item.wait}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Announcements/Scrolling Banner */}
      <Card className="overflow-hidden border-2 border-amber-500 dark:border-amber-600 bg-white dark:bg-slate-900">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white pb-3">
          <CardTitle className="text-2xl font-bold">📢 ANNOUNCEMENTS</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative overflow-hidden h-20 flex items-center">
            <div className="animate-scroll text-2xl font-semibold text-slate-900 dark:text-white whitespace-nowrap">
              🎉 Welcome to SmartQueue • 📌 Please maintain social distance • ⏰ Peak hours: 12-2 PM • 🏥 Thank you for your patience • 🎉 Welcome to SmartQueue • 📌 Please maintain social distance
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-slate-300 text-sm">
        <p>SmartQueue - Real-time Queue Management System • Auto-refresh every 5 seconds</p>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
