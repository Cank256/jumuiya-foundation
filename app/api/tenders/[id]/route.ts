import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!API_URL) {
    return NextResponse.json({ error: 'API URL not configured' }, { status: 503 });
  }

  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/tenders/${id}`, {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Tender not found' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
