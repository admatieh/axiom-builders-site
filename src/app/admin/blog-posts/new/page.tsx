import AdminHeader from "@/components/admin/AdminHeader";
import BlogPostEditorForm from "@/components/admin/BlogPostEditorForm";
import dbConnect from "@/lib/mongodb";
import BlogCategory from "@/lib/models/BlogCategory";
import { headers } from "next/headers";
import { getUserFromHeader, hasPermission, PERMISSIONS } from "@/lib/permissions";
import { redirect } from "next/navigation";

export default async function NewBlogPostPage() {
  const headerStore = await headers();
  const user = getUserFromHeader(headerStore);

  // Guard: require create_blog_posts
  if (!user || !hasPermission(user.permissions, PERMISSIONS.CREATE_BLOG_POSTS)) {
    redirect("/admin/blog-posts");
  }

  await dbConnect();
  const categories = await BlogCategory.find({}).sort({ name: 1 }).lean();

  return (
    <div>
      <AdminHeader breadcrumb="Blog Posts" title="New Blog Post" />
      <BlogPostEditorForm
        categories={JSON.parse(JSON.stringify(categories))}
        permissions={user.permissions}
      />
    </div>
  );
}
