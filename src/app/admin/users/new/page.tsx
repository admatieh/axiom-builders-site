import dbConnect from "@/lib/mongodb";
import Role from "@/lib/models/Role";
import AdminHeader from "@/components/admin/AdminHeader";
import UserEditorForm from "@/components/admin/UserEditorForm";

export default async function NewAdminUserPage() {
  await dbConnect();
  const roles = await Role.find().sort({ name: 1 }).lean();
  const rolesPlain = JSON.parse(JSON.stringify(roles));

  return (
    <div>
      <AdminHeader breadcrumb="Admin / Users" title="Create Admin User" />
      <div className="px-8 pb-12">
        <UserEditorForm roles={rolesPlain} />
      </div>
    </div>
  );
}
