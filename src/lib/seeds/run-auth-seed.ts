import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local BEFORE any other imports
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import Role from '../models/Role';
import AdminUser from '../models/AdminUser';
import { seedRoles } from './roles.seed';
import { seedAdminUsers } from './adminUsers.seed';

async function runAuthSeed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected.\n');

    await seedRoles(Role);
    console.log('');
    await seedAdminUsers(AdminUser, Role);

    console.log('\n✅ Auth seed complete!');
    console.log('\nSeeded users (default local dev credentials):');
    console.log('  admin@axiombuilders.com        — Super Admin       — ChangeMe123!');
    console.log('  pages@axiombuilders.com        — Pages Manager     — PagesManager123!');
    console.log('  submissions@axiombuilders.com  — Submissions Mgr   — Submissions123!');
    console.log('  content@axiombuilders.com      — Content Manager   — ContentManager123!');
    console.log('  blog@axiombuilders.com         — Blog Manager      — BlogManager123!');
    console.log('\nChange these passwords before going to production!');
  } catch (error) {
    console.error('Auth seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB.');
  }
}

runAuthSeed();
