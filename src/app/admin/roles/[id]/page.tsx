import dbConnect from "@/lib/mongodb";
import Role from "@/lib/models/Role";
import AdminHeader from "@/components/admin/AdminHeader";
import RoleEditorForm from "@/components/admin/RoleEditorForm";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUserFromHeader } from "@/lib/permissions";

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const role = await Role.findById(id).lean();
  if (!role) notFound();

  const headerStore = await headers();
  const user = getUserFromHeader(headerStore);

  return (
    <div>
      <AdminHeader breadcrumb="Admin / Roles" title={`Edit: ${(role as any).name}`} />
      <div className="px-8 pb-12">
        <RoleEditorForm
          initialData={JSON.parse(JSON.stringify(role))}
          userPermissions={user?.permissions ?? []}
        />
      </div>
    </div>
  );
}
