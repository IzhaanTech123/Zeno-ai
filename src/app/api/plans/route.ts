import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 'free', name: 'Zeno Free', price: 0 },
    { id: 'pro', name: 'Zeno Pro', price: 20 },
    { id: 'business', name: 'Zeno Business', price: 50 },
  ]);
}
