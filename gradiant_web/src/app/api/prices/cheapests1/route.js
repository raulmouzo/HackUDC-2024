import { NextResponse } from 'next/server';

import { cheapest1 } from '../data';

export async function GET() {
  return NextResponse.json(cheapest1);
}
