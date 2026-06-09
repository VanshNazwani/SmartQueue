import { connectDB } from '@/lib/db/connection';
import { Token, BranchAnalytics } from '@/lib/db/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get('branchId');
    const days = parseInt(searchParams.get('days') || '30', 10);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query: any = {
      issueTime: { $gte: startDate },
    };

    if (branchId) {
      query.branchId = branchId;
    }

    const tokens = await Token.find(query);

    // Group by date
    const analyticsData: any = {};

    tokens.forEach(token => {
      const date = token.issueTime.toISOString().split('T')[0];
      if (!analyticsData[date]) {
        analyticsData[date] = {
          date,
          totalCustomers: 0,
          served: 0,
          cancelled: 0,
          noShow: 0,
          totalWaitTime: 0,
          totalServiceTime: 0,
        };
      }

      analyticsData[date].totalCustomers++;

      if (token.status === 'served') {
        analyticsData[date].served++;
        if (token.actualWaitTime)
          analyticsData[date].totalWaitTime += token.actualWaitTime;
        if (token.actualServiceTime)
          analyticsData[date].totalServiceTime += token.actualServiceTime;
      } else if (token.status === 'cancelled') {
        analyticsData[date].cancelled++;
      } else if (token.status === 'no_show') {
        analyticsData[date].noShow++;
      }
    });

    // Calculate metrics
    const result = Object.values(analyticsData).map((data: any) => ({
      ...data,
      averageWaitTime: data.served > 0 ? Math.round(data.totalWaitTime / data.served) : 0,
      averageServiceTime: data.served > 0 ? Math.round(data.totalServiceTime / data.served) : 0,
      noShowRate: ((data.noShow / data.totalCustomers) * 100).toFixed(2),
    }));

    // Overall metrics
    const totalServed = tokens.filter(t => t.status === 'served').length;
    const avgWaitTime = totalServed > 0
      ? Math.round(
          tokens
            .filter(t => t.status === 'served' && t.actualWaitTime)
            .reduce((sum, t) => sum + (t.actualWaitTime || 0), 0) / totalServed
        )
      : 0;

    const avgServiceTime = totalServed > 0
      ? Math.round(
          tokens
            .filter(t => t.status === 'served' && t.actualServiceTime)
            .reduce((sum, t) => sum + (t.actualServiceTime || 0), 0) / totalServed
        )
      : 0;

    return NextResponse.json({
      dailyAnalytics: result,
      overallMetrics: {
        totalCustomers: tokens.length,
        totalServed,
        averageWaitTime: avgWaitTime,
        averageServiceTime: avgServiceTime,
        noShowRate: ((tokens.filter(t => t.status === 'no_show').length / tokens.length) * 100).toFixed(2),
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
