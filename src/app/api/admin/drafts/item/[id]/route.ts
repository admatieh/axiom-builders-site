import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PageDraft from '@/lib/models/PageDraft';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await dbConnect();
    
    const updatedDraft = await PageDraft.findByIdAndUpdate(
      id, 
      { 
        $set: {
          sections: body.sections,
          title: body.title,
           // Update name if provided, otherwise keep existing
           ...(body.draftName && { draftName: body.draftName })
        }
      },
      { new: true }
    );

    if (!updatedDraft) {
      return NextResponse.json({ success: false, message: 'Draft not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedDraft }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const deleted = await PageDraft.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Draft not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Draft deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
