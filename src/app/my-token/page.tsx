'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Users,
  Clock,
  MapPin,
  QrCode,
  Phone,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Star,
} from 'lucide-react';

export default function CustomerDashboard() {
  const position = 3;
  const estimatedWait = 12;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Hero Token Card */}
        <Card className="overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white pb-8 pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-90 mb-2">Your Token</p>
                <p className="text-5xl md:text-6xl font-black tracking-widest">A115</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-blue-500/30">
                <div>
                  <p className="text-sm opacity-90">Service Location</p>
                  <p className="font-semibold">City Hall - Main Branch</p>
                </div>
                <Badge className="bg-green-500 text-white text-base px-4 py-1.5">WAITING</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Position & Wait Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Position</p>
                </div>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{position}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">people ahead</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">Est. Wait</p>
                </div>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{estimatedWait}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">minutes</p>
              </div>
            </div>

            {/* Queue Progress Timeline */}
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Service Progress</p>
              <div className="space-y-3">
                {[
                  { step: 'Token Generated', status: 'completed', time: '2:15 PM' },
                  { step: 'Checked In', status: 'completed', time: '2:16 PM' },
                  { step: 'Waiting', status: 'in-progress', time: 'Now' },
                  { step: 'Called', status: 'pending', time: '--' },
                  { step: 'Serving', status: 'pending', time: '--' },
                  { step: 'Completed', status: 'pending', time: '--' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                      {item.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : ''}
                      {item.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 animate-pulse' : ''}
                      {item.status === 'pending' ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600' : ''}
                    >
                      {item.status === 'completed' && <CheckCircle className="w-5 h-5" />}
                      {item.status === 'in-progress' && <AlertCircle className="w-5 h-5" />}
                      {item.status === 'pending' && idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.step}</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Wait Time Countdown */}
        <Card className="overflow-hidden border-2 border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 pb-4">
            <CardTitle className="text-base">Your Wait Time</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="space-y-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Approximately remaining</p>
              <div className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text">
                {estimatedWait}
              </div>
              <p className="text-2xl font-semibold text-slate-600 dark:text-slate-400">minutes</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                ⚡ Updates every 30 seconds
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Live Queue Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { action: 'Currently Serving', token: 'A110', time: 'Now' },
              { action: 'Just Called', token: 'A112', time: '2 min ago' },
              { action: 'Just completed', token: 'A108', time: '4 min ago' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-semibold text-blue-700 dark:text-blue-300">
                    {item.token}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{item.action}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* QR Check-In Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Check-In
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <QrCode className="w-20 h-20 text-slate-400 dark:text-slate-600" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Show this QR code at the counter to complete check-in
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              ⏰ Expires: 2:45 PM
            </p>
          </CardContent>
        </Card>

        {/* Notifications Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-blue-900 dark:text-blue-100">Your turn is approaching</p>
                  <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
                    You're 3 people away. Get ready!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-green-900 dark:text-green-100">You've been checked in</p>
                  <p className="text-xs text-green-800 dark:text-green-300 mt-1">
                    1 min ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Module */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Share Your Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Rate Your Experience</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="outline"
                    size="lg"
                    className="text-2xl w-12 h-12 p-0"
                  >
                    {star <= 4 ? '⭐' : '✨'}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900 dark:text-white">Comments (optional)</label>
              <Textarea
                placeholder="Tell us about your experience..."
                className="mt-2 resize-none"
                rows={3}
              />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Call Support
              </Button>
              <Button variant="outline" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Report Issue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pb-4">
          <p>Last updated: 2:34 PM • Refreshes automatically</p>
        </div>
      </div>
    </div>
  );
}
