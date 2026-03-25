import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { homeSeed } from './home.seed';
import PageContent from '../models/PageContent';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function seedHome() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    console.log('Starting Home page seed...');

    const result = await PageContent.findOneAndUpdate(
      { slug: homeSeed.slug },
      homeSeed,
      { upsert: true, new: true, runValidators: true }
    );

    console.log(`✓ Seeded Home page successfully.`);
    console.log(`  ID: ${result._id}`);
    console.log(`  Title: ${result.title}`);
    
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedHome();
