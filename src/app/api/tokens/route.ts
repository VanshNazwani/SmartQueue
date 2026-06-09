import { connectDB } from '@/lib/db/connection';
import { Token } from '@/lib/db/models';
import { NextRequest, NextResponse } from 'next/server';
import { TokenStatus, PriorityLevel } from '@/types';

// GET all tokens
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const branchId = searchParams.get('branchId');

    let query: any = {};

    if (status) {
      query.status = status;
    }

    if (branchId) {
      query.branchId = branchId;
    }

    const tokens = await Token.find(query).sort({ issueTime: -1 }).limit(100);

    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}

// POST - Create new token
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      customerId,
      branchId,
      priority = 'normal',
    } = body;

    // Generate token number
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tokensToday = await Token.countDocuments({
      branchId,
      issueTime: { $gte: today },
    });

    const tokenNumber = `T${(tokensToday + 1).toString().padStart(3, '0')}`;

    const token = new Token({
      tokenNumber,
      customerId,
      branchId,
      status: 'waiting',
      priority,
      issueTime: new Date(),
      estimatedWaitTime: 10, // Default estimate
    });

    await token.save();

    return NextResponse.json(token, { status: 201 });
  } catch (error) {
    console.error('Error creating token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}
