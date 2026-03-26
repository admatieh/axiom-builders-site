import AdminHeader from "@/components/admin/AdminHeader";
import BlogPostEditorForm from "@/components/admin/BlogPostEditorForm";
import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";

export default async function NewBlogPostPage() {
  await dbConnect();
  const categories = await BlogCategory.find({}).sort({ name: 1 }).lean();

  return (
    <div>
      <AdminHeader title="Add New Blog Post" />
      <BlogPostEditorForm
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
}
