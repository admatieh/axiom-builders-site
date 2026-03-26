import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";
import BlogPost from "@/lib/models/BlogPost";
import AdminHeader from "@/components/admin/AdminHeader";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AdminCategoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  let category: any = await BlogCategory.findById(id).lean();
  if (Array.isArray(category)) {
    throw new Error('Expected a single category, but got an array.');
  }
  if (!category) notFound();
  const categoryId = String(category._id);

  // Find posts in this category
  const posts = await BlogPost.find({ category: category._id }).lean();

  return (
    <div>
      <AdminHeader title={`Edit Category: ${category.name}`} />
      <div className="p-8 max-w-2xl mx-auto">
        <form id="edit-category-form" action={`/api/admin/blog-categories/${categoryId}`} method="POST" className="space-y-6 bg-[#0a0a0a] border border-white/10 rounded p-6">
          <div>
            <label className="block text-xs text-white/40 uppercase mb-1">Name</label>
            <input name="name" defaultValue={category.name} className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase mb-1">Slug</label>
            <input name="slug" defaultValue={category.slug} className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase mb-1">Description</label>
            <textarea name="description" defaultValue={category.description} className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded" rows={3} />
          </div>
        </form>
        <div className="flex gap-4 items-center mt-4">
          <button form="edit-category-form" type="submit" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded">Save Changes</button>
          <form action={`/api/admin/blog-categories/${categoryId}/delete`} method="POST">
            <button type="submit" className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded">
              Delete Category
            </button>
          </form>
        </div>
        <div className="mt-10">
          <h3 className="text-white/70 text-lg mb-2">Posts in this Category</h3>
          {posts.length === 0 ? (
            <div className="text-white/30 italic">No posts in this category.</div>
          ) : (
            <ul className="space-y-2">
              {posts.map((post: any) => (
                <li key={post._id} className="text-white/80">
                  <Link href={`/admin/blog-posts/${String(post._id)}`} className="hover:text-cyan-400">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
