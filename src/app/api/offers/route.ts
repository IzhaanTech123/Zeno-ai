import { NextResponse } from 'next/server';

export async function GET() {
  // Mock offers for now
  return NextResponse.json([
    {
      id: 'offer_1',
      name: 'Zeno New User Offer',
      discount: '20%',
      duration: '30 days',
      eligibleUsers: 'New users',
      status: 'Active'
    }
  ]);
}
