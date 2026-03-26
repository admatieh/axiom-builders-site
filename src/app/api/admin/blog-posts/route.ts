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

export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({}).sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

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

    const duplicate = await BlogPost.findOne({ slug }).lean();
    if (duplicate) {
      return NextResponse.json({ success: false, message: "Slug already exists. Use a unique slug." }, { status: 409 });
    }

    const category = await BlogCategory.findById(categoryId).lean();
    if (!category || Array.isArray(category)) {
      return NextResponse.json({ success: false, message: "Selected category was not found" }, { status: 400 });
    }

    const newPost = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || "/images/blog/default-cover.jpg",
      category: category._id,
      categorySlug: category.slug,
      status,
      featured,
      readingTime,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
