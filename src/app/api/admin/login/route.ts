import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';
import Role from '@/lib/models/Role'; // must be imported so Mongoose registers the schema before populate()
import { signToken, COOKIE_NAME } from '@/lib/auth';
import type { AdminTokenPayload } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Explicitly reference Role so the schema is registered before populate() runs.
    // Bundlers can otherwise tree-shake an unused import away.
    void Role.modelName;

    // Find user by email and populate their role
    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() })
      .populate<{ role: { slug: string; permissions: string[]; name: string } }>({ path: 'role', model: Role });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password against hash
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Build JWT payload — embed permissions so we don't need a DB hit on every request.
    // Spread to plain primitives: jose's SignJWT uses structured cloning and chokes on Mongoose arrays.
    const payload: AdminTokenPayload = {
      userId: (user._id as any).toString(),
      email: String(user.email),
      name: String(user.name),
      roleSlug: String(user.role.slug),
      permissions: [...user.role.permissions].map(String),
    };

    const token = await signToken(payload);

    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role.slug },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[admin/login] error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
