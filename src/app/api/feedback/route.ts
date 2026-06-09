import { connectDB } from '@/lib/db/connection';
import { Feedback } from '@/lib/db/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get('branchId');

    let query: any = {};

    if (branchId) {
      query.branchId = branchId;
    }

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('customerId tokenId');

    // Calculate sentiment distribution
    const sentimentCounts = {
      positive: feedbacks.filter(f => f.sentiment === 'positive').length,
      neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
      negative: feedbacks.filter(f => f.sentiment === 'negative').length,
    };

    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

    return NextResponse.json({
      feedbacks,
      sentiment: sentimentCounts,
      averageRating: avgRating,
      total: feedbacks.length,
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { tokenId, customerId, branchId, rating, feedback } = body;

    const newFeedback = new Feedback({
      tokenId,
      customerId,
      branchId,
      rating,
      feedback,
    });

    await newFeedback.save();

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}
