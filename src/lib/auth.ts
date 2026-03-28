import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export interface AdminTokenPayload {
  userId: string;
  email: string;
  name: string;
  roleSlug: string;
  permissions: string[];
}

const COOKIE_NAME = 'admin_token';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined in environment variables');
  return new TextEncoder().encode(secret);
}

/** Create and sign a JWT with the admin user payload */
export async function signToken(payload: AdminTokenPayload): Promise<string> {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

/** Verify a JWT string — returns the decoded payload or null on failure */
export async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

/** Read and verify the JWT from the HTTP-only cookie in a Server Component */
export async function getCurrentAdmin(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
