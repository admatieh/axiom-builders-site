import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";
import ContactSubmission from "@/lib/models/ContactSubmission";
import BlogPost from "@/lib/models/BlogPost";
import AdminHeader from "@/components/admin/AdminHeader";
import SummaryCard from "@/components/admin/SummaryCard";
import { headers } from "next/headers";
import type { AdminTokenPayload } from "@/lib/auth";
import Link from "next/link";

async function getStats() {
  await dbConnect();
  const [pageCount, submissionCount, blogCount, recentSubmission] = await Promise.all([
    PageContent.countDocuments(),
    ContactSubmission.countDocuments(),
    BlogPost.countDocuments({ status: "published" }),
    ContactSubmission.findOne().sort({ createdAt: -1 }).lean() as any,
  ]);

  return {
    pageCount,
    submissionCount,
    blogCount,
    lastSubmissionDate: recentSubmission
      ? new Date(recentSubmission.createdAt).toLocaleDateString()
      : "None",
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const headerStore = await headers();
  const userHeader = headerStore.get("x-admin-user");
  let user: AdminTokenPayload | null = null;
  if (userHeader) {
    try { user = JSON.parse(userHeader); } catch {}
  }

  return (
    <div>
      <AdminHeader
        title={user ? `Welcome back, ${user.name.split(" ")[0]}` : "Dashboard"}
        breadcrumb={user ? user.roleSlug.replace(/-/g, " ") : undefined}
      />

      <div className="px-8 space-y-8 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Content Pages" value={stats.pageCount} subtext="Active pages" accent="cyan" />
          <SummaryCard label="Inquiries" value={stats.submissionCount} subtext="Total submissions" accent="white" />
          <SummaryCard label="Published Posts" value={stats.blogCount} subtext="Live blog articles" accent="green" />
          <SummaryCard label="Last Inquiry" value={stats.lastSubmissionDate} subtext="Most recent" accent="yellow" />
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6">
          <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/pages"
              className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-sm text-white/70 hover:text-white rounded-sm transition-all"
            >
              Manage Pages
            </Link>
            <Link
              href="/admin/submissions"
              className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-sm text-white/70 hover:text-white rounded-sm transition-all"
            >
              View Inquiries
            </Link>
            <Link
              href="/admin/blog-posts/new"
              className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-sm text-white/70 hover:text-white rounded-sm transition-all"
            >
              New Blog Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
