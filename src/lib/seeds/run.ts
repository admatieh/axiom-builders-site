import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env BEFORE any other imports
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import mongoose from 'mongoose';
import { homeSeed } from './home.seed';
import { aboutSeed } from './about.seed';
import { servicesSeed } from './services.seed';
import { contactSeed } from './contact.seed';
import { blogSeed } from './blogPage.seed';
import { seedBlog as blogCollectionSeed } from './blog.seed';
import { projectsSeed } from './projects.seed';
import PageContent from '../models/PageContent';

const seeds = [
  homeSeed,
  aboutSeed,
  servicesSeed,
  contactSeed,
  blogSeed,
  projectsSeed,
  blogCollectionSeed,
];

async function seed() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    console.log('Starting seed process...');

    for (const seed of seeds) {
      if (typeof seed === 'function') {
        // Handle new collection-based seeds (like blog)
        console.log('Running dedicated collection seed function...');
        await seed();
        console.log('✓ Seeded collection');
      } else {
        // Handle legacy page content seeds
        console.log(`Seeding page: ${seed.slug}`);

        await PageContent.findOneAndUpdate(
          { slug: seed.slug },
          seed,
          { upsert: true, new: true, runValidators: true }
        );
        console.log(`✓ Seeded ${seed.slug}`);
      }
    }

    console.log('All pages seeded successfully.');

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
