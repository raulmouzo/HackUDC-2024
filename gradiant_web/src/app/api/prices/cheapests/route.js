import { NextResponse } from 'next/server';

import { getCheapests } from '../data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawCount = Number.parseInt(searchParams.get('n') ?? '2', 10);
  const count = Number.isFinite(rawCount) && rawCount > 0 ? rawCount : 2;

  return NextResponse.json(getCheapests(count));
}
