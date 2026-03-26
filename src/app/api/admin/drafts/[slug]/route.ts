import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageDraft from '@/lib/models/PageDraft';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();
    
    const drafts = await PageDraft.find({ slug }).sort({ updatedAt: -1 }).lean();
    
    return NextResponse.json({ success: true, data: drafts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    if (!body.sections) {
      return NextResponse.json({ success: false, message: 'Sections required' }, { status: 400 });
    }

    await dbConnect();
    
    const newDraft = await PageDraft.create({
      slug,
      title: body.title,
      draftName: body.draftName || `Draft ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      sections: body.sections
    });
    
    return NextResponse.json({ success: true, data: newDraft }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
