import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 3;

    const record = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    if (now - record.timestamp > windowMs) {
      record.count = 1;
      record.timestamp = now;
    } else {
      record.count += 1;
    }
    
    rateLimitMap.set(ip, record);

    if (record.count > maxRequests) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 2. Validation
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 3. Send Email
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'deepaksaivighneshpanidam@gmail.com',
      subject: 'Portfolio Contact Form Submission',
      text: `Name: ${name.trim()}\n\nEmail: ${email.trim()}\n\nMessage:\n\n${message.trim()}`,
    });

    if (data.error) {
      console.error('Resend Error:', data.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
