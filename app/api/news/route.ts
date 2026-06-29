import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!API_URL) {
    return NextResponse.json({ error: 'API URL not configured' }, { status: 503 });
  }

  try {
    const res = await fetch(`${API_URL}/news`, {
      next: { revalidate: 60 }, // cache for 60 seconds
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
