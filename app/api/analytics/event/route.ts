import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LOGS_DIR = path.join(process.cwd(), 'logs');
const EVENTS_FILE = path.join(LOGS_DIR, 'events.json');
const MAX_EVENTS = 5000;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await fs.mkdir(LOGS_DIR, { recursive: true });
    
    let events = [];
    try {
      const fileData = await fs.readFile(EVENTS_FILE, 'utf-8');
      events = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist or is invalid
    }
    
    events.unshift({ ...data, ip: request.headers.get('x-forwarded-for') || 'unknown' });
    
    if (events.length > MAX_EVENTS) {
      events = events.slice(0, MAX_EVENTS);
    }
    
    await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}