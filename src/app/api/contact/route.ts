import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactSubmission from '@/lib/models/ContactSubmission';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { fullName, email, phone, projectType, subject, message, consent } = data;

    // Simple server-side validation
    if (!fullName || !email || !phone || !projectType || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Prepare location data if consent is given
    let approximateLocation = {};

    if (consent) {
      const forwardedFor = request.headers.get('x-forwarded-for');
      let ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
      
      // In local dev, IP might be ::1, map to 127.0.0.1 for clarity
      if (ip === '::1') ip = '127.0.0.1';

      // We can grab other headers provided by hosting platforms (e.g. Vercel)
      const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
      const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown';
      const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
      const userAgent = request.headers.get('user-agent') || 'Unknown';

      approximateLocation = {
        ip,
        city,
        region,
        country,
        userAgent,
      };
    }

    const newSubmission = new ContactSubmission({
      fullName,
      email,
      phone,
      projectType,
      subject,
      message,
      approximateLocation, // Will be empty object if no consent
    });

    await newSubmission.save();

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle Mongoose validation errors specifically
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: messages.join(' ') },
        { status: 400 } // Bad Request
      );
    }
    
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
