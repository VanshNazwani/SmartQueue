import { connectDB } from '@/lib/db/connection';
import { Branch } from '@/lib/db/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const branches = await Branch.find().populate('counters').populate('staff');

    return NextResponse.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json({ error: 'Failed to fetch branches' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, location, address, latitude, longitude, operatingHours } = body;

    const branch = new Branch({
      name,
      location,
      address,
      latitude,
      longitude,
      operatingHours,
    });

    await branch.save();

    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    console.error('Error creating branch:', error);
    return NextResponse.json({ error: 'Failed to create branch' }, { status: 500 });
  }
}
