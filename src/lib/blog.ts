// src/lib/blog.ts
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/lib/models/BlogPost";
import BlogCategory from "@/lib/models/BlogCategory";

// Ensure models are registered
import "@/lib/models/BlogPost";
import "@/lib/models/BlogCategory";

export interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  galleryImages?: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  categorySlug: string; // Legacy/Redundant but useful
  status: string;
  featured: boolean;
  readingTime: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoryType {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

// Fetch all published posts
export async function getPublishedPosts() {
  await dbConnect();
  const posts = await BlogPost.find({ status: 'published' })
    .populate('category', 'name slug')
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
    
  return JSON.parse(JSON.stringify(posts));
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  await dbConnect();
  const post = await BlogPost.findOne({ slug, status: 'published' })
    .populate('category', 'name slug')
    .lean();
    
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

// Fetch all categories
export async function getCategories() {
  await dbConnect();
  const categories = await BlogCategory.find({}).sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}
