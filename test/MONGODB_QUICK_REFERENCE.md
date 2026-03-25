# MongoDB Integration - Quick Reference

## Files Created

### 1. Connection & Models

**[src/lib/mongodb.ts](src/lib/mongodb.ts)** - MongoDB connection with caching for Next.js
- Caches connection to prevent reconnection on hot reload
- Reads `MONGODB_URI` from `.env.local`
- Used by all routes and API endpoints

**[src/lib/models/PageContent.ts](src/lib/models/PageContent.ts)** - Mongoose schema
```typescript
{
  slug: string (unique)        // "home", "about", "services", etc.
  title: string                // Page display name
  sections: object             // Flexible content structure
  status: string               // "published" or "draft"
  createdAt: Date              // Auto-generated
  updatedAt: Date              // Auto-generated
}
```

### 2. API Endpoint

**[src/app/api/pages/[slug]/route.ts](src/app/api/pages/[slug]/route.ts)** - GET page by slug

```
GET /api/pages/home
GET /api/pages/about
GET /api/pages/services
GET /api/pages/contact
```

Returns:
- ✅ 200: Page document (if found)
- ❌ 404: `{ error: "Page not found: [slug]" }`
- ❌ 500: Server error

### 3. Database Setup

**[scripts/seed.ts](scripts/seed.ts)** - Populate database
- Imports existing page data from `src/data/*.ts`
- Creates 6 page documents: home, about, services, contact, blog, projects
- Run once to populate database

**[.env.example](.env.example)** - Connection template
```
MONGODB_URI=mongodb://localhost:27017/axiom-builders
```

Copy to `.env.local` before running

### 4. Documentation

**[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Complete setup guide
- Install MongoDB Community Server
- Install MongoDB Compass
- Run seed script
- Test API
- Fetch data in Next.js pages

---

## Quick Start (5 Steps)

### Step 1: Install MongoDB

**Linux:**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Windows:** Download from https://www.mongodb.com/try/download/community

### Step 2: Install MongoDB Compass

Download from https://www.mongodb.com/products/tools/compass

Launch and connect to `mongodb://localhost:27017`

### Step 3: Install Node Packages

```bash
npm install
```

### Step 4: Create .env.local

```bash
cp .env.example .env.local
```

Content:
```
MONGODB_URI=mongodb://localhost:27017/axiom-builders
```

### Step 5: Seed Database

```bash
npm install --save-dev ts-node  # if not already installed
MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts
```

Expected output:
```
✓ Connected to MongoDB
✓ Cleared existing page content
✓ Inserted 6 pages into database
```

---

## Test the API

### Start dev server:
```bash
npm run dev
```

### In another terminal, test:

**Get home page:**
```bash
curl http://localhost:3000/api/pages/home | jq
```

**Get services page:**
```bash
curl http://localhost:3000/api/pages/services | jq
```

**Test 404:**
```bash
curl http://localhost:3000/api/pages/nonexistent | jq
```

---

## Use in Next.js Pages

### Pattern (Recommended)

```typescript
import { cache } from 'react';

const getPageContent = cache(async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/pages/home`, {
      next: { revalidate: 3600 }, // Revalidate hourly
    });
    
    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error('DB fetch failed, using fallback');
  }
  
  // Fallback to local data
  const { homeData } = await import('@/data/home');
  return homeData;
});

export default async function Home() {
  const data = await getPageContent();
  
  return (
    <div>
      <h1>{data.hero.headline}</h1>
      {/* ... render page using data ... */}
    </div>
  );
}
```

---

## MongoDB Compass Usage

### View all pages:
1. Open Compass → connect to `mongodb://localhost:27017`
2. Click `axiom-builders` database
3. Click `pagecontents` collection
4. See all 6 page documents

### Edit a page:
1. Click on a document (e.g., "home")
2. Click the pencil icon to edit
3. Modify JSON content
4. Click save
5. Changes appear immediately in API

### Delete a page:
1. Click on document
2. Click delete button (trash icon)

---

## Database Documents

All pages stored in `axiom-builders.pagecontents` collection:

| Slug | Title | Status |
|------|-------|--------|
| `home` | Home | published |
| `about` | About Axiom | published |
| `services` | Our Services | published |
| `contact` | Contact Us | published |
| `blog` | Blog | published |
| `projects` | Projects | published |

Each document contains full page content in `sections` field.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "ECONNREFUSED 127.0.0.1:27017" | Start MongoDB: `sudo systemctl start mongod` |
| "MONGODB_URI not defined" | Create `.env.local` with connection string |
| "Model is already registered" | Normal in dev mode, code handles automatically |
| Compass won't connect | Verify MongoDB running: `mongosh` |
| Seed script fails | Ensure MongoDB running + `.env.local` exists |

---

## Next: Migrate Pages to DB

Start with one page to test the pattern:

**Recommended order:**
1. Contact page (simplest, good test)
2. Home page (most important)
3. Services page (more complex)
4. About page
5. Blog/Projects (currently "coming soon")

For each page, update the component to use the `getPageContent()` pattern shown above.

---

## Important Notes

✅ **Frontend stays unchanged** - All existing components still work  
✅ **Fallback support** - Local data files available as backup  
✅ **Flexible schema** - `sections` object stores any page structure  
✅ **No auth needed** - Simple website content, no users/roles  
✅ **Incremental** - Migrate pages one at a time  
✅ **Dev-friendly** - MongoDB Compass for data management  

---

## File Locations

```
axiom-builders-site/
├── src/
│   ├── lib/
│   │   ├── mongodb.ts                 # ← Connection
│   │   └── models/
│   │       └── PageContent.ts         # ← Schema
│   └── app/
│       └── api/
│           └── pages/[slug]/
│               └── route.ts           # ← API endpoint
├── scripts/
│   └── seed.ts                        # ← Seed database
├── .env.example                       # ← Template
├── .env.local                         # ← Your config (create this)
└── MONGODB_SETUP.md                   # ← Full documentation
```

---

See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed instructions.
