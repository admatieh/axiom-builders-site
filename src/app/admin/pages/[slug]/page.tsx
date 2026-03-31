import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";
import PageDraft from "@/lib/models/PageDraft";
import AdminHeader from "@/components/admin/AdminHeader";
import PageEditorForm from "@/components/admin/PageEditorForm";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUserFromHeader } from "@/lib/permissions";

async function getPageData(slug: string) {
  await dbConnect();
  const page = await PageContent.findOne({ slug }).lean();
  const drafts = await PageDraft.find({ slug }).sort({ updatedAt: -1 }).lean();
  if (!page) return null;
  return {
    livePage: JSON.parse(JSON.stringify(page)),
    drafts: JSON.parse(JSON.stringify(drafts)),
  };
}

export default async function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPageData(slug);
  if (!data) notFound();

  const headerStore = await headers();
  const user = getUserFromHeader(headerStore);

  return (
    <div>
      <AdminHeader breadcrumb="Pages" title={`Edit: ${data.livePage.title}`} />
      <div className="px-8 pb-12">
        <PageEditorForm
          slug={slug}
          initialLivePage={data.livePage}
          initialDrafts={data.drafts}
          permissions={user?.permissions ?? []}
        />
      </div>
    </div>
  );
}
