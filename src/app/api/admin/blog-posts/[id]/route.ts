import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/lib/models/BlogPost";
import BlogCategory from "@/lib/models/BlogCategory";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    const post = await BlogPost.findById(id).lean();
    if (!post || Array.isArray(post)) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to load post" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await dbConnect();

    const existingPost = await BlogPost.findById(id);
    if (!existingPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    const title = String(body.title || "").trim();
    const incomingSlug = String(body.slug || "").trim();
    const slug = (incomingSlug || toSlug(title)).toLowerCase();
    const excerpt = String(body.excerpt || "").trim();
    const content = String(body.content || "").trim();
    const coverImage = String(body.coverImage || "").trim();
    const readingTime = String(body.readingTime || "5 min read").trim();
    const status = body.status === "published" ? "published" : "draft";
    const featured = Boolean(body.featured);
    const categoryId = String(body.categoryId || "").trim();

    if (!title) return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    if (!slug) return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    if (!excerpt) return NextResponse.json({ success: false, message: "Excerpt is required" }, { status: 400 });
    if (!content) return NextResponse.json({ success: false, message: "Content is required" }, { status: 400 });
    if (!categoryId) return NextResponse.json({ success: false, message: "Category is required" }, { status: 400 });

    const duplicate = await BlogPost.findOne({ slug, _id: { $ne: id } }).lean();
    if (duplicate) {
      return NextResponse.json({ success: false, message: "Slug already exists. Use a unique slug." }, { status: 409 });
    }

    const category = await BlogCategory.findById(categoryId).lean();
    if (!category || Array.isArray(category)) {
      return NextResponse.json({ success: false, message: "Selected category was not found" }, { status: 400 });
    }

    existingPost.title = title;
    existingPost.slug = slug;
    existingPost.excerpt = excerpt;
    existingPost.content = content;
    existingPost.coverImage = coverImage || "/images/blog/default-cover.jpg";
    existingPost.category = category._id;
    existingPost.categorySlug = category.slug;
    existingPost.readingTime = readingTime;
    existingPost.featured = featured;
    existingPost.status = status;

    if (status === "published" && !existingPost.publishedAt) {
      existingPost.publishedAt = new Date();
    }

    await existingPost.save();

    return NextResponse.json({ success: true, data: existingPost }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    const deleted = await BlogPost.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to delete post" }, { status: 500 });
  }
}
