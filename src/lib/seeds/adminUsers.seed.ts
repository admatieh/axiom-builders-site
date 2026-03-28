import bcrypt from 'bcryptjs';

/**
 * Seeded admin users — one per role.
 * Passwords are read from env vars; safe defaults are provided for local dev.
 * Change all passwords before deploying to production!
 */
export const adminUsersData = [
  {
    roleSlug: 'super-admin',
    name: 'Super Admin',
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@axiombuilders.com',
    password: process.env.SUPER_ADMIN_PASSWORD || 'ChangeMe123!',
  },
  {
    roleSlug: 'pages-manager',
    name: 'Pages Manager',
    email: process.env.PAGES_MANAGER_EMAIL || 'pages@axiombuilders.com',
    password: process.env.PAGES_MANAGER_PASSWORD || 'PagesManager123!',
  },
  {
    roleSlug: 'submissions-manager',
    name: 'Submissions Manager',
    email: process.env.SUBMISSIONS_MANAGER_EMAIL || 'submissions@axiombuilders.com',
    password: process.env.SUBMISSIONS_MANAGER_PASSWORD || 'Submissions123!',
  },
  {
    roleSlug: 'content-manager',
    name: 'Content Manager',
    email: process.env.CONTENT_MANAGER_EMAIL || 'content@axiombuilders.com',
    password: process.env.CONTENT_MANAGER_PASSWORD || 'ContentManager123!',
  },
  {
    roleSlug: 'blog-manager',
    name: 'Blog Manager',
    email: process.env.BLOG_MANAGER_EMAIL || 'blog@axiombuilders.com',
    password: process.env.BLOG_MANAGER_PASSWORD || 'BlogManager123!',
  },
];

export async function seedAdminUsers(AdminUser: any, Role: any) {
  console.log('Seeding admin users...');

  for (const userData of adminUsersData) {
    const role = await Role.findOne({ slug: userData.roleSlug });
    if (!role) {
      console.warn(`  ⚠ Role not found for slug "${userData.roleSlug}" — skipping user "${userData.email}"`);
      continue;
    }

    // Only hash and update password if the user doesn't already exist
    const existing = await AdminUser.findOne({ email: userData.email });
    if (existing) {
      console.log(`  → User already exists: ${userData.email} — skipping`);
      continue;
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);

    await AdminUser.create({
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: role._id,
      isActive: true,
    });

    console.log(`  ✓ User: ${userData.name} <${userData.email}> (role: ${userData.roleSlug})`);
  }
}
