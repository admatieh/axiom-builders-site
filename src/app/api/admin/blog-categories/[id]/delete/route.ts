import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogCategory from '@/lib/models/BlogCategory';
import BlogPost from '@/lib/models/BlogPost';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  // Find the category to delete
  const category = await BlogCategory.findById(id);
  if (!category) return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });

  // Uncategorize posts (set category to null or 'uncategorized')
  await BlogPost.updateMany({ category: category._id }, { $set: { category: null, categorySlug: 'uncategorized' } });

  // Delete the category
  await BlogCategory.deleteOne({ _id: category._id });

  return NextResponse.redirect(new URL('/admin/blog-categories', request.url));
}
