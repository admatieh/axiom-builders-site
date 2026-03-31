import { PERMISSIONS } from '../permissions';

export const rolesData = [
  {
    name: 'Super Admin',
    slug: 'super-admin',
    description: 'Full access to all admin sections',
    permissions: [PERMISSIONS.FULL_ACCESS],
  },
  {
    name: 'Pages Manager',
    slug: 'pages-manager',
    description: 'View, edit, publish pages and manage drafts',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_PAGES,
      PERMISSIONS.UPDATE_PAGES,
      PERMISSIONS.PUBLISH_PAGES,
      PERMISSIONS.MANAGE_PAGE_DRAFTS,
    ],
  },
  {
    name: 'Submissions Manager',
    slug: 'submissions-manager',
    description: 'View and manage contact form submissions',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_SUBMISSIONS,
      PERMISSIONS.VIEW_SUBMISSION_DETAILS,
      PERMISSIONS.UPDATE_SUBMISSIONS_STATUS,
    ],
  },
  {
    name: 'Content Manager',
    slug: 'content-manager',
    description: 'Manage pages, drafts, and projects',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_PAGES,
      PERMISSIONS.UPDATE_PAGES,
      PERMISSIONS.PUBLISH_PAGES,
      PERMISSIONS.MANAGE_PAGE_DRAFTS,
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.CREATE_PROJECTS,
      PERMISSIONS.UPDATE_PROJECTS,
      PERMISSIONS.PUBLISH_PROJECTS,
    ],
  },
  {
    name: 'Blog Manager',
    slug: 'blog-manager',
    description: 'Create, edit, and publish blog posts and categories — no delete',
    permissions: [
      PERMISSIONS.VIEW_DASHBOARD,
      PERMISSIONS.VIEW_BLOG_POSTS,
      PERMISSIONS.CREATE_BLOG_POSTS,
      PERMISSIONS.UPDATE_BLOG_POSTS,
      PERMISSIONS.PUBLISH_BLOG_POSTS,
      // NOTE: No DELETE_BLOG_POSTS — intentional
      PERMISSIONS.VIEW_BLOG_CATEGORIES,
      PERMISSIONS.CREATE_BLOG_CATEGORIES,
      PERMISSIONS.UPDATE_BLOG_CATEGORIES,
      // NOTE: No DELETE_BLOG_CATEGORIES — intentional
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
