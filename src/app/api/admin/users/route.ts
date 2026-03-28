// Users API: GET all users, POST create user
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';
import Role from '@/lib/models/Role';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();
    void Role.modelName; // ensure schema registered for populate
    const users = await AdminUser.find()
      .populate<{ role: { _id: string; name: string; slug: string } }>({ path: 'role', model: Role })
      .sort({ createdAt: -1 })
      .lean();

    // Strip passwordHash before sending
    const safe = users.map(({ passwordHash, ...u }) => u);
    return NextResponse.json({ success: true, data: safe });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, roleId, isActive } = body;

    if (!name || !email || !password || !roleId) {
      return NextResponse.json({ success: false, message: 'name, email, password, and roleId are required' }, { status: 400 });
    }

    await dbConnect();
    void Role.modelName;

    const existing = await AdminUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, message: 'An admin user with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await AdminUser.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: roleId,
      isActive: isActive !== false,
    });

    const created = await AdminUser.findById(user._id)
      .populate<{ role: any }>({ path: 'role', model: Role })
      .lean();

    const { passwordHash: _ph, ...safe } = created as any;
    return NextResponse.json({ success: true, data: safe }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
