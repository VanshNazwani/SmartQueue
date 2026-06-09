'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Settings,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const KPICard = ({ title, value, icon, trend, description }: any) => (
  <Card className="overflow-hidden">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </CardTitle>
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
      {trend && (
        <p className={`text-xs mt-2 ${trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% vs last week
        </p>
      )}
    </CardContent>
  </Card>
);

export default function BranchAdminDashboard() {
  const branchName = 'Downtown Branch';
  const chartData = [
    { time: '10 AM', tokens: 24 },
    { time: '11 AM', tokens: 28 },
    { time: '12 PM', tokens: 35 },
    { time: '1 PM', tokens: 32 },
    { time: '2 PM', tokens: 29 },
    { time: '3 PM', tokens: 26 },
  ];

  const performanceData = [
    { day: 'Mon', satisfaction: 4.5, productivity: 92 },
    { day: 'Tue', satisfaction: 4.6, productivity: 94 },
    { day: 'Wed', satisfaction: 4.4, productivity: 88 },
    { day: 'Thu', satisfaction: 4.7, productivity: 96 },
    { day: 'Fri', satisfaction: 4.6, productivity: 93 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {branchName}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-400">
            <MapPin className="w-4 h-4" />
            <p>123 Main Street, Downtown</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-500 text-white text-base px-4 py-1.5">ONLINE</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active Queues"
          value="4"
          icon={<AlertCircle className="w-5 h-5 text-blue-600" />}
          description="Operational now"
        />
        <KPICard
          title="Total Customers"
          value="142"
          icon={<Users className="w-5 h-5 text-purple-600" />}
          trend={{ value: 12, direction: 'up' }}
        />
        <KPICard
          title="Avg Wait Time"
          value="8.2m"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          trend={{ value: 5, direction: 'down' }}
        />
        <KPICard
          title="Satisfaction"
          value="4.6/5"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          trend={{ value: 8, direction: 'up' }}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="operations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Queue Monitoring */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Queue Status</CardTitle>
                  <CardDescription>Real-time queue monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Counter 1', customers: 5, status: 'active', staff: 'John Doe' },
                      { name: 'Counter 2', customers: 3, status: 'active', staff: 'Sarah Smith' },
                      { name: 'Counter 3', customers: 0, status: 'idle', staff: 'Emma Davis' },
                      { name: 'Counter 4', customers: 8, status: 'active', staff: 'Mike Johnson' },
                    ].map((queue) => (
                      <div
                        key={queue.name}
                        className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{queue.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{queue.staff}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{queue.customers}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Waiting</p>
                          </div>
                          <Badge
                            className={`${
                              queue.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {queue.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Token Traffic Chart */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Token Traffic Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="tokens" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">
                    ⚠️ High Queue Alert
                  </p>
                  <p className="text-xs text-red-800 dark:text-red-300 mt-1">
                    Queue 4 has 8+ customers
                  </p>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    ⏰ Long Service Time
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                    Counter 1 avg 12 min
                  </p>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    📊 Peak Hours Incoming
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
                    Expected in 30 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>Branch staff overview</CardDescription>
                </div>
                <Button>+ Add Staff</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Counter</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Rating</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Served</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'John Doe', counter: 1, status: 'Serving', rating: 4.8, served: 32 },
                      { name: 'Sarah Smith', counter: 2, status: 'Serving', rating: 4.7, served: 28 },
                      { name: 'Emma Davis', counter: 3, status: 'Idle', rating: 4.9, served: 25 },
                      { name: 'Mike Johnson', counter: 4, status: 'Serving', rating: 4.6, served: 35 },
                    ].map((staff) => (
                      <tr key={staff.name} className="border-b border-slate-100 dark:border-slate-900">
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{staff.name}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Counter {staff.counter}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              staff.status === 'Serving'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                            }
                          >
                            {staff.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{staff.rating} ⭐</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{staff.served}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Branch customer analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Customers Today</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">142</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 12% vs yesterday</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Avg. Satisfaction</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">4.6/5</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 8% vs last week</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Repeat Customers</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">67%</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Strong retention</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">No-Show Rate</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">3.2%</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ 1.5% vs target</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Weekly satisfaction & productivity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Satisfaction"
                  />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Productivity %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
