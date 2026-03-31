import AdminHeader from "@/components/admin/AdminHeader";
import BlogPostEditorForm from "@/components/admin/BlogPostEditorForm";
import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";
import BlogPost from "@/lib/models/BlogPost";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUserFromHeader } from "@/lib/permissions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headerStore = await headers();
  const user = getUserFromHeader(headerStore);

  await dbConnect();
  const [post, categories] = await Promise.all([
    BlogPost.findById(id).lean(),
    BlogCategory.find({}).sort({ name: 1 }).lean(),
  ]);

  if (!post || Array.isArray(post)) {
    notFound();
  }

  const initialData = {
    _id: String(post._id),
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage || "",
    galleryImages: Array.isArray(post.galleryImages) ? post.galleryImages : [],
    categoryId: post.category ? String(post.category) : "",
    readingTime: post.readingTime || "5 min read",
    featured: Boolean(post.featured),
    status: post.status,
  };

  return (
    <div>
      <AdminHeader breadcrumb="Blog Posts" title={`Edit: ${post.title}`} />
      <BlogPostEditorForm
        categories={JSON.parse(JSON.stringify(categories))}
        initialData={initialData}
        permissions={user?.permissions ?? []}
      />
    </div>
  );
}
