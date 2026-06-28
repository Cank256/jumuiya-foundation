import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LOGS_DIR = path.join(process.cwd(), 'logs');
const ERRORS_FILE = path.join(LOGS_DIR, 'errors.json');
const MAX_ERRORS = 1000;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await fs.mkdir(LOGS_DIR, { recursive: true });
    
    let errors = [];
    try {
      const fileData = await fs.readFile(ERRORS_FILE, 'utf-8');
      errors = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist or is invalid
    }
    
    errors.unshift({ ...data, ip: request.headers.get('x-forwarded-for') || 'unknown' });
    
    if (errors.length > MAX_ERRORS) {
      errors = errors.slice(0, MAX_ERRORS);
    }
    
    await fs.writeFile(ERRORS_FILE, JSON.stringify(errors, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}