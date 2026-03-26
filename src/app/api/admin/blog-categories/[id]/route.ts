import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogCategory from '@/lib/models/BlogCategory';
import BlogPost from '@/lib/models/BlogPost';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();

  const data = await request.formData();
  const name = String(data.get('name') || '').trim();
  const slug = String(data.get('slug') || '').trim().toLowerCase();
  const description = String(data.get('description') || '').trim();

  const existing = await BlogCategory.findById(id);
  if (!existing) {
    return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
  }

  const previousSlug = existing.slug;
  await BlogCategory.findByIdAndUpdate(id, { name, slug, description }, { new: true, runValidators: true });

  // Keep redundant `categorySlug` in sync for posts in this category.
  if (previousSlug !== slug) {
    await BlogPost.updateMany({ category: existing._id }, { $set: { categorySlug: slug } });
  }

  return NextResponse.redirect(new URL(`/admin/blog-categories/${id}`, request.url));
}
