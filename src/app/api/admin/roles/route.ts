// Roles API: GET all roles, POST create role
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Role from '@/lib/models/Role';

export async function GET() {
  try {
    await dbConnect();
    const roles = await Role.find().sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: roles });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, permissions } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: 'name and slug are required' }, { status: 400 });
    }

    await dbConnect();

    const existing = await Role.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, message: 'A role with this slug already exists' }, { status: 409 });
    }

    const role = await Role.create({
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      description: description?.trim() || '',
      permissions: Array.isArray(permissions) ? permissions : [],
    });

    return NextResponse.json({ success: true, data: role }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
