import AdminHeader from "@/components/admin/AdminHeader";
import RoleEditorForm from "@/components/admin/RoleEditorForm";

export default function NewRolePage() {
  return (
    <div>
      <AdminHeader breadcrumb="Admin / Roles" title="Create Role" />
      <div className="px-8 pb-12">
        <RoleEditorForm />
      </div>
    </div>
  );
}
