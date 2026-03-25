import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/lib/models/PageContent';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    
    await dbConnect();

    const page = await PageContent.findOne({ slug }).lean() as any;

    if (!page) {
      return NextResponse.json(
        { success: false, message: 'Page content not found' },
        { status: 404 }
      );
    }

    // Return the full page object, but structure data property for cleanliness
    return NextResponse.json({ success: true, data: page }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
