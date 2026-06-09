'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const dailyData = [
  { date: 'Mon', customers: 245, served: 230, avgWait: 8.2, satisfaction: 4.5 },
  { date: 'Tue', customers: 267, served: 250, avgWait: 7.8, satisfaction: 4.6 },
  { date: 'Wed', customers: 234, served: 220, avgWait: 8.5, satisfaction: 4.4 },
  { date: 'Thu', customers: 289, served: 275, avgWait: 7.2, satisfaction: 4.7 },
  { date: 'Fri', customers: 312, served: 298, avgWait: 8.1, satisfaction: 4.6 },
  { date: 'Sat', customers: 198, served: 185, avgWait: 9.1, satisfaction: 4.3 },
  { date: 'Sun', customers: 156, served: 145, avgWait: 10.2, satisfaction: 4.2 },
];

const hourlyData = [
  { hour: '8 AM', tokens: 12 },
  { hour: '9 AM', tokens: 25 },
  { hour: '10 AM', tokens: 38 },
  { hour: '11 AM', tokens: 45 },
  { hour: '12 PM', tokens: 52 },
  { hour: '1 PM', tokens: 48 },
  { hour: '2 PM', tokens: 42 },
  { hour: '3 PM', tokens: 35 },
  { hour: '4 PM', tokens: 28 },
  { hour: '5 PM', tokens: 18 },
];

const staffPerformance = [
  { name: 'John Doe', served: 42, rating: 4.8 },
  { name: 'Sarah Smith', served: 38, rating: 4.7 },
  { name: 'Emma Davis', served: 35, rating: 4.9 },
  { name: 'Mike Johnson', served: 45, rating: 4.6 },
  { name: 'Lisa Chen', served: 40, rating: 4.8 },
];

const queueTypeData = [
  { name: 'Regular', value: 65, color: '#2563EB' },
  { name: 'Senior', value: 15, color: '#22C55E' },
  { name: 'Handicap', value: 10, color: '#F59E0B' },
  { name: 'VIP', value: 5, color: '#8B5CF6' },
  { name: 'Emergency', value: 5, color: '#EF4444' },
];

const noShowData = [
  { date: 'Week 1', noShow: 3.5, target: 3.0 },
  { date: 'Week 2', noShow: 4.2, target: 3.0 },
  { date: 'Week 3', noShow: 2.8, target: 3.0 },
  { date: 'Week 4', noShow: 3.1, target: 3.0 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analytics & Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Comprehensive queue and performance analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,701</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 8% vs last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8.3m</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ 2% vs last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Service Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">6.8m</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Optimal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.6/5</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 4% vs last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">No-Show Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3.4%</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ 0.8% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Traffic */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Traffic Trend</CardTitle>
            <CardDescription>Customer volume and service metrics by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="customers"
                  fill="#2563EB"
                  stroke="#2563EB"
                  name="Total Customers"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="served"
                  fill="#22C55E"
                  stroke="#22C55E"
                  name="Served"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Token Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Token Distribution</CardTitle>
            <CardDescription>Peak hours analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tokens" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction Trend</CardTitle>
            <CardDescription>Weekly satisfaction scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[3, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Wait Time */}
        <Card>
          <CardHeader>
            <CardTitle>Average Wait Time Trend</CardTitle>
            <CardDescription>Daily wait time analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgWait"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Queue Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Type Distribution</CardTitle>
            <CardDescription>Percentage by customer priority</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={queueTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {queueTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* No-Show Rate Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>No-Show Rate Tracking</CardTitle>
            <CardDescription>Weekly performance vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={noShowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="noShow" fill="#EF4444" name="No-Show %" />
                <Bar dataKey="target" fill="#22C55E" name="Target %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance Ranking</CardTitle>
          <CardDescription>This week's top performers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold">Staff Member</th>
                  <th className="text-left py-3 px-4 font-semibold">Customers Served</th>
                  <th className="text-left py-3 px-4 font-semibold">Customer Rating</th>
                  <th className="text-left py-3 px-4 font-semibold">Performance</th>
                </tr>
              </thead>
              <tbody>
                {staffPerformance.map((staff, idx) => (
                  <tr key={staff.name} className="border-b border-slate-100 dark:border-slate-900">
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        #{idx + 1}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{staff.name}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{staff.served}</td>
                    <td className="py-3 px-4">
                      <span className="text-slate-900 dark:text-white">{staff.rating} ⭐</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(staff.rating / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download analytics data in your preferred format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export as Excel
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export as PDF
            </Button>
            <Button variant="outline" className="gap-2">
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
