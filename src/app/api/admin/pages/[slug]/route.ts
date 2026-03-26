import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageContent from '@/lib/models/PageContent';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await request.json();
    
    // Validate request body
    if (!data.sections) {
      return NextResponse.json(
        { success: false, message: 'Sections data is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedPage = await PageContent.findOneAndUpdate(
      { slug },
      { 
        $set: { 
          title: data.title,
          status: data.status,
          sections: data.sections
        } 
      },
      { new: true }
    );

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, message: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPage }, { status: 200 });
  } catch (error: any) {
    console.error('Admin page update error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
