// Individual user CRUD: GET, PUT, DELETE
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';
import Role from '@/lib/models/Role';
import bcrypt from 'bcryptjs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    void Role.modelName;
    const user = await AdminUser.findById(id)
      .populate<{ role: any }>({ path: 'role', model: Role })
      .lean();
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    const { passwordHash, ...safe } = user as any;
    return NextResponse.json({ success: true, data: safe });
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
    const { name, email, password, roleId, isActive } = body;

    await dbConnect();
    void Role.modelName;

    const updateData: any = {};
    if (name)    updateData.name = name.trim();
    if (email)   updateData.email = email.toLowerCase().trim();
    if (roleId)  updateData.role = roleId;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (password) updateData.passwordHash = await bcrypt.hash(password, 12);

    // Check email uniqueness if changing email
    if (email) {
      const conflict = await AdminUser.findOne({ email: email.toLowerCase(), _id: { $ne: id } });
      if (conflict) return NextResponse.json({ success: false, message: 'Email already in use' }, { status: 409 });
    }

    const updated = await AdminUser.findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .populate<{ role: any }>({ path: 'role', model: Role })
      .lean();

    if (!updated) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    const { passwordHash, ...safe } = updated as any;
    return NextResponse.json({ success: true, data: safe });
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
    const deleted = await AdminUser.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
