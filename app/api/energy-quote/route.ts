// app/api/energy-quote/route.ts
import { NextResponse } from 'next/server';
import { generateEnergyQuote } from '@/app/lib/quoteLogic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'taipei';

  try {
    const data = generateEnergyQuote(city);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate energy quote.' },
      { status: 500 }
    );
  }
}
