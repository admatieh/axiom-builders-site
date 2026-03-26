import { redirect } from "next/navigation";

export default function LegacyAdminBlogRoute() {
  redirect("/admin/blog-posts");
}
