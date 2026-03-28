import dbConnect from "@/lib/mongodb";
import Role from "@/lib/models/Role";
import AdminHeader from "@/components/admin/AdminHeader";
import RoleEditorForm from "@/components/admin/RoleEditorForm";
import { notFound } from "next/navigation";

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const role = await Role.findById(id).lean();
  if (!role) notFound();

  const roleData = JSON.parse(JSON.stringify(role));

  return (
    <div>
      <AdminHeader breadcrumb="Admin / Roles" title={`Edit: ${roleData.name}`} />
      <div className="px-8 pb-12">
        <RoleEditorForm initialData={roleData} />
      </div>
    </div>
  );
}
