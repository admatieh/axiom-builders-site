import AdminHeader from "@/components/admin/AdminHeader";
import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";
import { redirect } from "next/navigation";

export default function NewCategoryPage() {
  async function createCategory(formData: FormData) {
    "use server";
    await dbConnect();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    await BlogCategory.create({ name, slug, description });
    redirect("/admin/blog-categories");
  }

  return (
    <div>
      <AdminHeader title="Create New Category" />
      <div className="p-8 max-w-2xl mx-auto">
        <form action={createCategory} className="space-y-6 bg-[#0a0a0a] border border-white/10 rounded p-6">
          <div>
            <label className="block text-xs text-white/40 uppercase mb-1">Name</label>
            <input name="name" className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase mb-1">Slug</label>
            <input name="slug" className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase mb-1">Description</label>
            <textarea name="description" className="w-full bg-[#151515] border border-white/10 text-white px-3 py-2 rounded" rows={3} />
          </div>
          <button type="submit" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded">Create Category</button>
        </form>
      </div>
    </div>
  );
}
