import { connectDB } from '@/lib/db/connection';
import { Token } from '@/lib/db/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const token = await Token.findById(params.id);

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    return NextResponse.json(token);
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { status, counterId, priority } = body;

    const token = await Token.findByIdAndUpdate(
      params.id,
      {
        ...(status && { status }),
        ...(counterId && { counterId }),
        ...(priority && { priority }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    return NextResponse.json(token);
  } catch (error) {
    console.error('Error updating token:', error);
    return NextResponse.json({ error: 'Failed to update token' }, { status: 500 });
  }
}
