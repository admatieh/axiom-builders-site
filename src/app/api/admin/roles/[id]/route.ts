// Individual role CRUD: GET, PUT, DELETE
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Role from '@/lib/models/Role';
import AdminUser from '@/lib/models/AdminUser';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const role = await Role.findById(id).lean();
    if (!role) return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: role });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, permissions } = body;

    await dbConnect();

    const updateData: any = {};
    if (name)        updateData.name = name.trim();
    if (slug)        updateData.slug = slug.toLowerCase().trim();
    if (description !== undefined) updateData.description = description.trim();
    if (permissions) updateData.permissions = Array.isArray(permissions) ? permissions : [];

    // Slug uniqueness check
    if (slug) {
      const conflict = await Role.findOne({ slug: slug.toLowerCase(), _id: { $ne: id } });
      if (conflict) return NextResponse.json({ success: false, message: 'Slug already in use' }, { status: 409 });
    }

    const updated = await Role.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
    if (!updated) return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();

    // Prevent deletion if users are assigned to this role
    const usersWithRole = await AdminUser.countDocuments({ role: id });
    if (usersWithRole > 0) {
      return NextResponse.json(
        { success: false, message: `Cannot delete: ${usersWithRole} user(s) are assigned to this role. Reassign them first.` },
        { status: 409 }
      );
    }

    const deleted = await Role.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Role deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
