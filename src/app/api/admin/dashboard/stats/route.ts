import { connectDB } from '@/lib/db/connection';
import { Token } from '@/lib/db/models';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Fetch today's token statistics
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalTokens = await Token.countDocuments({
      issueTime: { $gte: today },
    });

    const servedTokens = await Token.countDocuments({
      issueTime: { $gte: today },
      status: 'served',
    });

    const activeTokens = await Token.countDocuments({
      issueTime: { $gte: today },
      status: { $in: ['waiting', 'called', 'serving'] },
    });

    // Calculate average wait time
    const waitingTokens = await Token.find({
      issueTime: { $gte: today },
      status: { $in: ['waiting', 'called', 'serving'] },
    });

    const avgWaitTime =
      waitingTokens.length > 0
        ? Math.round(
            waitingTokens.reduce((sum, token) => sum + token.estimatedWaitTime, 0) /
              waitingTokens.length
          )
        : 0;

    // Calculate average service time
    const servedTokensList = await Token.find({
      issueTime: { $gte: today },
      status: 'served',
      actualServiceTime: { $exists: true },
    });

    const avgServiceTime =
      servedTokensList.length > 0
        ? Math.round(
            servedTokensList.reduce((sum, token) => sum + (token.actualServiceTime || 0), 0) /
              servedTokensList.length
          )
        : 0;

    return NextResponse.json({
      totalCustomers: totalTokens,
      averageWaitTime: avgWaitTime,
      activeTokens,
      servedCount: servedTokens,
      averageServiceTime: avgServiceTime,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
