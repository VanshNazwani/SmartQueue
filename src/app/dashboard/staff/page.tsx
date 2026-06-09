'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  Check,
  Phone,
  ArrowRight,
  Clock,
  Users,
  Star,
  Zap,
} from 'lucide-react';

export default function StaffDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Service Station
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Counter 3 - Serving Customers
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left - Current Customer (Large) */}
        <div className="lg:col-span-2">
          {/* Active Counter Panel */}
          <Card className="overflow-hidden mb-6 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Active Counter</p>
                  <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100">Counter 3</h2>
                </div>
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">ACTIVE</Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Current Customer Card */}
          <Card className="overflow-hidden border-2 border-green-200 dark:border-green-800 mb-6 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Now Serving</h3>
                <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400 animate-pulse" />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Token Number</p>
                  <p className="text-5xl font-bold text-green-600 dark:text-green-400 tracking-wider">
                    A115
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Customer</p>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">John Smith</p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Priority</p>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Est. Time</p>
                    <p className="font-semibold text-sm text-amber-600 dark:text-amber-400">8 min</p>
                  </div>
                </div>

                <div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Service Notes</p>
                  <p className="text-sm text-slate-900 dark:text-white">Regular checkout - 2 items</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Actions Panel */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 h-20 flex-col">
                <Check className="w-6 h-6" />
                <span>Complete</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-20 flex-col">
                <ArrowRight className="w-6 h-6" />
                <span>Transfer</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-20 flex-col">
                <Phone className="w-6 h-6" />
                <span>Recall</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-20 flex-col">
                <AlertCircle className="w-6 h-6" />
                <span>No Show</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-20 flex-col">
                <Clock className="w-6 h-6" />
                <span>Pause</span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-20 flex-col">
                <Zap className="w-6 h-6" />
                <span>Call Next</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Queue Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Up Next (5 Tokens)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { token: 'A116', priority: 'Normal', wait: '5 min' },
                { token: 'A117', priority: 'Senior', wait: '7 min' },
                { token: 'A118', priority: 'Normal', wait: '9 min' },
                { token: 'A119', priority: 'Normal', wait: '11 min' },
                { token: 'A120', priority: 'Emergency', wait: '12 min' },
              ].map((item) => (
                <div
                  key={item.token}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.token}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.wait}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Served Today</p>
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">34</p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-purple-700 dark:text-purple-300">Avg Time</p>
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">7.2 min</p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Rating</p>
                  <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">4.8 ⭐</p>
              </div>
            </CardContent>
          </Card>

          {/* Status Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Counter Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Available', active: false },
                  { label: 'Busy', active: true },
                  { label: 'Break', active: false },
                  { label: 'Offline', active: false },
                ].map((status) => (
                  <Button
                    key={status.label}
                    variant={status.active ? 'default' : 'outline'}
                    className="w-full"
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                    ⚠️ High queue alert
                  </p>
                  <p className="text-xs text-amber-900 dark:text-amber-200 mt-1">
                    Please prioritize queue management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
