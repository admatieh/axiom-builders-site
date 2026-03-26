import dbConnect from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";
import PageDraft from "@/lib/models/PageDraft";
import AdminHeader from "@/components/admin/AdminHeader";
import PageEditorForm from "@/components/admin/PageEditorForm";
import { notFound } from "next/navigation";

async function getPageData(slug: string) {
  await dbConnect();
  
  // 1. Get Live Page
  const page = await PageContent.findOne({ slug }).lean();
  
  // 2. Get Drafts
  const drafts = await PageDraft.find({ slug }).sort({ updatedAt: -1 }).lean();

  if (!page) return null;

  return {
    livePage: JSON.parse(JSON.stringify(page)),
    drafts: JSON.parse(JSON.stringify(drafts))
  };
}

export default async function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <AdminHeader title={`Edit Page: ${data.livePage.title}`} />
      
      <div className="px-8 pb-12">
        <PageEditorForm 
          slug={slug}
          initialLivePage={data.livePage}
          initialDrafts={data.drafts}
        />
      </div>
    </div>
  );
}
