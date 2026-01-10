import { NextResponse } from 'next/server';

import { cheapest2 } from '../data';

export async function GET() {
  return NextResponse.json(cheapest2);
}
