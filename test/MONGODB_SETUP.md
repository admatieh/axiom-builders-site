# MongoDB Setup Guide for Axiom Builders Site

This guide walks you through setting up local MongoDB, connecting MongoDB Compass, and testing the API.

## Table of Contents
1. [Install MongoDB Community Server](#install-mongodb-community-server)
2. [Install MongoDB Compass](#install-mongodb-compass)
3. [Configure Your Next.js Project](#configure-your-nextjs-project)
4. [Run the Seed Script](#run-the-seed-script)
5. [Test the API](#test-the-api)
6. [View Data in MongoDB Compass](#view-data-in-mongodb-compass)
7. [Fetch Data in Your Pages](#fetch-data-in-your-pages)

---

## Install MongoDB Community Server

### Linux (Ubuntu/Debian)

```bash
# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod

# Verify it's running
sudo systemctl status mongod

# To enable automatic startup on boot:
sudo systemctl enable mongod
```

### macOS (Homebrew)

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

### Windows

1. Download the MongoDB Community Server installer from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will typically start automatically as a Windows service

### Verify MongoDB is Running

```bash
# Connect to MongoDB shell to verify
mongosh

# You should see a connection like:
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0
# Type "exit" to quit
```

---

## Install MongoDB Compass

MongoDB Compass is the GUI for inspecting and managing your database.

### Download & Install

Visit: https://www.mongodb.com/products/tools/compass

- **Linux**: Download `.deb` or `.rpm` file
- **macOS**: Download `.dmg` file
- **Windows**: Download `.msi` file

### Launch MongoDB Compass

1. Open MongoDB Compass
2. The default connection string should be: `mongodb://localhost:27017`
3. Click **Connect**
4. You should see `Local` connection in the left panel

---

## Configure Your Next.js Project

### 1. Install Mongoose Package

```bash
npm install mongoose
```

The package has already been added to `package.json`, so just run:

```bash
npm install
```

### 2. Create `.env.local`

Copy the template from `.env.example`:

```bash
cp .env.example .env.local
```

Verify the content of `.env.local`:

```
MONGODB_URI=mongodb://localhost:27017/axiom-builders
```

This connects to MongoDB running locally on the default port with a database named `axiom-builders`.

### 3. Project Structure

Your new files are organized as:

```
src/
├── lib/
│   ├── mongodb.ts              # MongoDB connection (cached for Next.js)
│   └── models/
│       └── PageContent.ts       # Mongoose schema for page data
└── app/
    └── api/
        └── pages/
            └── [slug]/
                └── route.ts     # API endpoint: GET /api/pages/[slug]

scripts/
└── seed.ts                      # Script to populate database
```

---

## Run the Seed Script

The seed script populates your database with page content from your existing `src/data/*.ts` files.

### Install ts-node (if not already installed)

```bash
npm install --save-dev ts-node
```

### Run the Seed Script

```bash
# Make sure MongoDB is running first!
MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts
```

You should see output like:

```
✓ Connected to MongoDB
✓ Cleared existing page content
✓ Inserted 6 pages into database

Database seed completed successfully!

Pages created:
  - home (Home)
  - about (About Axiom)
  - services (Our Services)
  - contact (Contact Us)
  - blog (Blog)
  - projects (Projects)
```

---

## Test the API

### Start the Next.js Development Server

```bash
npm run dev
```

The server should start at `http://localhost:3000`

### Test the API Endpoint

Open a new terminal and test with `curl`:

#### Get Home Page

```bash
curl http://localhost:3000/api/pages/home
```

Expected response (formatted):

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "slug": "home",
  "title": "Home",
  "sections": {
    "companyName": {
      "first": "Axiom",
      "last": "Builders"
    },
    "hero": {
      "badge": "Architecture & Construction",
      "headline": "Precision Construction.",
      ...
    },
    ...
  },
  "status": "published",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Get Services Page

```bash
curl http://localhost:3000/api/pages/services
```

#### Test Not Found (404)

```bash
curl http://localhost:3000/api/pages/nonexistent
```

Expected response:

```json
{
  "error": "Page not found: nonexistent"
}
```

---

## View Data in MongoDB Compass

### 1. Open MongoDB Compass

You should already have it connected at `mongodb://localhost:27017`

### 2. Navigate to the Database

In the left panel, you'll see:

```
Local
└── axiom-builders (database)
    └── pagecontents (collection)
```

### 3. View Your Pages

- Click on `pagecontents` to see all page documents
- Click on any document to view its full content
- You can edit documents directly in Compass and save changes

### 4. Edit a Page

In Compass, you can:

- **View** page content by clicking on a document
- **Edit** content by clicking the pencil icon
- **Add/Remove** fields as needed
- **Delete** documents
- **Insert** new documents using the `+` button

The changes will immediately be reflected when you fetch from the API.

---

## Fetch Data in Your Pages

Now you can update your Next.js pages to fetch content from the database instead of hardcoded files.

### Example: Home Page

**Before (using hardcoded data):**

```typescript
// src/app/page.tsx
import { homeData } from '@/data/home';

export default function Home() {
  return (
    <div>
      <h1>{homeData.hero.headline}</h1>
      {/* ... */}
    </div>
  );
}
```

**After (fetching from database):**

```typescript
// src/app/page.tsx
import { cache } from 'react';

// Cache the fetch to avoid multiple requests during SSR
const getPageContent = cache(async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/pages/home`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    console.error('Failed to fetch page content');
    // Fallback to local data if needed
    const { homeData } = await import('@/data/home');
    return homeData;
  }

  const page = await res.json();
  return page.sections;
});

export default async function Home() {
  const data = await getPageContent();

  return (
    <div>
      <h1>{data.hero.headline}</h1>
      {/* ... rest of component using data from DB ... */}
    </div>
  );
}
```

### Example: Contact Page

```typescript
// src/app/contact/page.tsx
import { cache } from 'react';

const getPageContent = cache(async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/pages/contact`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const { contactData } = await import('@/data/pages');
    return contactData;
  }

  const page = await res.json();
  return page.sections;
});

export default async function ContactPage() {
  const data = await getPageContent();

  return (
    <div>
      <h1>{data.hero.title}</h1>
      <p>{data.hero.subheadline}</p>
      {/* ... render contact form using data from DB ... */}
    </div>
  );
}
```

---

## Keeping Fallback Data

For a gradual migration, you can keep your local `src/data/*.ts` files as fallback:

```typescript
const getPageContent = cache(async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages/home`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error('Failed to fetch from database:', error);
  }

  // Fallback to local data
  const { homeData } = await import('@/data/home');
  console.log('Using fallback local data for home page');
  return homeData;
});
```

---

## Database Schema

### PageContent Collection

Each document has this structure:

```json
{
  "_id": ObjectId("..."),
  "slug": "home",
  "title": "Home",
  "sections": {
    "hero": { ... },
    "services": { ... },
    "metrics": { ... },
    ...
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

**Fields:**

- `slug` (string, unique): URL-friendly identifier (e.g., "home", "about", "services")
- `title` (string): Display name for the page
- `sections` (object): Flexible object containing all page-specific content
- `status` (string): "published" or "draft"
- `createdAt` (date): Auto-generated creation timestamp
- `updatedAt` (date): Auto-generated update timestamp

---

## Troubleshooting

### Connection Error: "connect ECONNREFUSED 127.0.0.1:27017"

**Solution**: MongoDB is not running

```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows
# Start MongoDB service from Services app or command line
```

### "MONGODB_URI not defined" Error

**Solution**: Create `.env.local` with the correct connection string

```bash
cp .env.example .env.local
```

### "Model is already registered" Error

This is normal in development (hot reloading). The code handles this automatically in `src/lib/models/PageContent.ts`.

### MongoDB Compass Won't Connect

- Verify MongoDB is running: `sudo systemctl status mongod`
- Check default connection: `mongodb://localhost:27017`
- Try connecting with `mongosh` first to verify connection

### Seed Script Fails

- Ensure MongoDB is running first
- Check that `.env.local` exists with correct `MONGODB_URI`
- Verify the `scripts/seed.ts` path is correct

---

## Next Steps

1. ✅ Install MongoDB locally
2. ✅ Install and connect MongoDB Compass
3. ✅ Configure `.env.local`
4. ✅ Run the seed script
5. ✅ Test the API endpoints
6. ⏭️ Update your Next.js pages to fetch from the database (start with one page)
7. ⏭️ Edit page content in MongoDB Compass
8. ⏭️ Keep existing `src/data/*.ts` files as backup/fallback

---

## Commands Reference

```bash
# Start development server
npm run dev

# Install packages
npm install

# Run seed script
MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts

# Test API (in separate terminal)
curl http://localhost:3000/api/pages/home

# Start MongoDB (Linux)
sudo systemctl start mongod

# Check MongoDB status (Linux)
sudo systemctl status mongod

# Connect to MongoDB shell
mongosh
```

---

## File Reference

| File | Purpose |
|------|---------|
| `src/lib/mongodb.ts` | MongoDB connection helper with caching for Next.js |
| `src/lib/models/PageContent.ts` | Mongoose schema for page content |
| `src/app/api/pages/[slug]/route.ts` | API endpoint to fetch pages by slug |
| `scripts/seed.ts` | Script to populate database from `src/data/*.ts` |
| `.env.local` | Local environment variables (MongoDB URI) |
| `.env.example` | Template for `.env.local` |

---

For questions or issues, check the troubleshooting section or verify all MongoDB services are running correctly.
