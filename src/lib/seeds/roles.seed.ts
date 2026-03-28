import { PERMISSIONS } from '../permissions';

export const rolesData = [
  {
    name: 'Super Admin',
    slug: 'super-admin',
    description: 'Full access to all admin sections',
    permissions: [
      PERMISSIONS.FULL_ACCESS,
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.MANAGE_PAGES,
      PERMISSIONS.MANAGE_PAGE_DRAFTS,
      PERMISSIONS.VIEW_SUBMISSIONS,
      PERMISSIONS.VIEW_SUBMISSION_DETAILS,
      PERMISSIONS.MANAGE_BLOG_POSTS,
      PERMISSIONS.MANAGE_BLOG_CATEGORIES,
      PERMISSIONS.MANAGE_PROJECTS,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_ROLES,
    ],
  },
  {
    name: 'Pages Manager',
    slug: 'pages-manager',
    description: 'Manage site pages and drafts',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.MANAGE_PAGES,
      PERMISSIONS.MANAGE_PAGE_DRAFTS,
    ],
  },
  {
    name: 'Submissions Manager',
    slug: 'submissions-manager',
    description: 'View contact form submissions',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_SUBMISSIONS,
      PERMISSIONS.VIEW_SUBMISSION_DETAILS,
    ],
  },
  {
    name: 'Content Manager',
    slug: 'content-manager',
    description: 'Manage pages, drafts, and projects',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.MANAGE_PAGES,
      PERMISSIONS.MANAGE_PAGE_DRAFTS,
      PERMISSIONS.MANAGE_PROJECTS,
    ],
  },
  {
    name: 'Blog Manager',
    slug: 'blog-manager',
    description: 'Manage blog posts and categories',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.MANAGE_BLOG_POSTS,
      PERMISSIONS.MANAGE_BLOG_CATEGORIES,
    ],
  },
];

export async function seedRoles(Role: any) {
  console.log('Seeding roles...');
  for (const role of rolesData) {
    await Role.findOneAndUpdate({ slug: role.slug }, role, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    console.log(`  ✓ Role: ${role.name}`);
  }
}
