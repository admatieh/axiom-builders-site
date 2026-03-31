import dbConnect from "@/lib/mongodb";
import AdminUser from "@/lib/models/AdminUser";
import Role from "@/lib/models/Role";
import AdminHeader from "@/components/admin/AdminHeader";
import UserEditorForm from "@/components/admin/UserEditorForm";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUserFromHeader } from "@/lib/permissions";

export default async function EditAdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  void Role.modelName;

  const headerStore = await headers();
  const actingUser = getUserFromHeader(headerStore);

  const [user, roles] = await Promise.all([
    AdminUser.findById(id)
      .populate<{ role: any }>({ path: "role", model: Role })
      .lean(),
    Role.find().sort({ name: 1 }).lean(),
  ]);

  if (!user) notFound();

  const { passwordHash, ...safeUser } = user as any;
  const userData = JSON.parse(JSON.stringify(safeUser));
  const rolesData = JSON.parse(JSON.stringify(roles));

  return (
    <div>
      <AdminHeader breadcrumb="Admin / Users" title={`Edit: ${userData.name}`} />
      <div className="px-8 pb-12">
        <UserEditorForm
          roles={rolesData}
          initialData={userData}
          userPermissions={actingUser?.permissions ?? []}
        />
      </div>
    </div>
  );
}
