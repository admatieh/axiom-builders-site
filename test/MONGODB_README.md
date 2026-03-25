# Axiom Builders - MongoDB Integration

This project has been configured with a local MongoDB backend. Here's a quick guide to get started.

## ⚡ Quick Start (10 Minutes)

```bash
# 1. Install MongoDB Community Server
# - Linux: sudo apt-get install -y mongodb-org
# - macOS: brew install mongodb-community
# - Windows: Download from https://www.mongodb.com/try/download/community

# 2. Start MongoDB
sudo systemctl start mongod  # or: brew services start mongodb-community

# 3. Install MongoDB Compass (GUI)
# Download from https://www.mongodb.com/products/tools/compass
# Launch and connect to mongodb://localhost:27017

# 4. Install Node packages
npm install

# 5. Create .env.local
cp .env.example .env.local

# 6. Seed database
MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts

# 7. Start dev server
npm run dev

# 8. Test API in another terminal
curl http://localhost:3000/api/pages/home | jq

# ✅ Done! Your database is ready.
```

---

## 📚 Documentation

### Getting Started
- **[MONGODB_SETUP_CHECKLIST.md](MONGODB_SETUP_CHECKLIST.md)** ← **START HERE** (step-by-step verification)
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Complete setup guide (30 min read)
- **[MONGODB_QUICK_REFERENCE.md](MONGODB_QUICK_REFERENCE.md)** - Quick reference

### Implementation Details
- **[MONGODB_DOCUMENT_EXAMPLES.md](MONGODB_DOCUMENT_EXAMPLES.md)** - Exact database structure
- **[MONGODB_PAGE_MIGRATION.md](MONGODB_PAGE_MIGRATION.md)** - How to update your pages
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Complete implementation overview

---

## 🏗️ What's Been Set Up

### Code Files
```
src/lib/mongodb.ts                    # MongoDB connection (cached for Next.js)
src/lib/models/PageContent.ts         # Mongoose schema with flexible sections
src/app/api/pages/[slug]/route.ts     # GET /api/pages/[slug] endpoint

scripts/seed.ts                       # Populate database with existing page data
```

### Configuration
```
.env.example                          # Template (shows MONGODB_URI)
.env.local                            # Your local config (create from .env.example)
```

### Database
```
Database: axiom-builders
Collection: pagecontents
Documents: home, about, services, contact, blog, projects
```

---

## 📖 How to Use

### View Database Data
1. Open **MongoDB Compass**
2. Connect to `mongodb://localhost:27017`
3. Navigate to `axiom-builders` → `pagecontents`
4. See all 6 page documents
5. Click any document to view full JSON
6. Click pencil icon to edit
7. Changes appear immediately via API

### Test API Endpoints
```bash
# Get home page
curl http://localhost:3000/api/pages/home | jq

# Get services page
curl http://localhost:3000/api/pages/services | jq

# Get contact page
curl http://localhost:3000/api/pages/contact | jq

# Test 404
curl http://localhost:3000/api/pages/nonexistent
```

### Migrate Your Pages
Start with Contact page, then Services, then Home, etc.

**Before (hardcoded data):**
```typescript
import { contactData } from '@/data/pages';

export default function ContactPage() {
  return <Contact {...contactData} />
}
```

**After (database-backed):**
```typescript
import { cache } from 'react';

const getPageData = cache(async () => {
  try {
    const res = await fetch('/api/pages/contact', { next: { revalidate: 3600 } });
    if (res.ok) return (await res.json()).sections;
  } catch (e) { console.error(e); }
  
  const { contactData } = await import('@/data/pages');
  return contactData;
});

export default async function ContactPage() {
  const data = await getPageData();
  return <Contact {...data} />
}
```

See [MONGODB_PAGE_MIGRATION.md](MONGODB_PAGE_MIGRATION.md) for detailed examples for each page.

---

## ✅ Key Points

✅ **Frontend Unchanged** - No redesign, no component changes  
✅ **Fallback Support** - Pages work if database goes down  
✅ **Local MongoDB** - Runs on your machine, no cloud  
✅ **Simple Schema** - Flexible `sections` object for any content  
✅ **Easy to Edit** - Use MongoDB Compass GUI to manage data  
✅ **Incremental** - Migrate pages one at a time  
✅ **No Auth** - Website content only, no users/roles  
✅ **Production Ready** - Proper caching and error handling  

---

## 🚀 Next Steps

### Immediate
1. Run through [MONGODB_SETUP_CHECKLIST.md](MONGODB_SETUP_CHECKLIST.md)
2. Verify everything works
3. Test API endpoints

### Short Term
1. Read [MONGODB_PAGE_MIGRATION.md](MONGODB_PAGE_MIGRATION.md)
2. Migrate Contact page first (simplest)
3. Migrate Services page
4. Migrate Home page
5. Migrate About page

### Medium Term
1. Edit page content via MongoDB Compass
2. Add new pages to database as needed
3. Consider admin interface (if needed)

---

## 🔧 Useful Commands

```bash
# Start MongoDB
sudo systemctl start mongod              # Linux
brew services start mongodb-community   # macOS

# Check MongoDB status
sudo systemctl status mongod             # Linux
brew services list | grep mongodb       # macOS

# Run seed script
npm run seed  # (after setting up npm script)
# or manually:
MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts

# Start dev server
npm run dev

# Test API
curl http://localhost:3000/api/pages/home | jq
```

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB won't connect | Ensure running: `sudo systemctl status mongod` |
| Seed script fails | Check `.env.local` exists with correct URI |
| API returns 404 | Run seed script again or check Compass |
| Changes don't appear | Clear browser cache or use DevTools Network tab |
| Page doesn't load from DB | Check that page slug is lowercase |

See [MONGODB_SETUP.md](MONGODB_SETUP.md#troubleshooting) for more troubleshooting.

---

## 📋 Files Reference

| File | Purpose |
|------|---------|
| [MONGODB_SETUP_CHECKLIST.md](MONGODB_SETUP_CHECKLIST.md) | Step-by-step verification checklist |
| [MONGODB_SETUP.md](MONGODB_SETUP.md) | Complete setup guide with details |
| [MONGODB_QUICK_REFERENCE.md](MONGODB_QUICK_REFERENCE.md) | Quick reference card |
| [MONGODB_DOCUMENT_EXAMPLES.md](MONGODB_DOCUMENT_EXAMPLES.md) | Exact database structure with examples |
| [MONGODB_PAGE_MIGRATION.md](MONGODB_PAGE_MIGRATION.md) | How to update each page |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Overview of what was implemented |

---

## 💡 Quick Tips

1. **Always use `cache()`** - Prevents duplicate requests in SSR
2. **Always add fallback** - Pages work if database is down
3. **Edit in Compass** - Easier than writing seed scripts
4. **Revalidate hourly** - `next: { revalidate: 3600 }`
5. **Start with Contact** - Simplest page, good first test
6. **Keep local data files** - As backup/fallback

---

## ✨ You're All Set!

Your MongoDB integration is ready. Your original frontend is completely unchanged and working. All documentation is in place.

**Start with the [MONGODB_SETUP_CHECKLIST.md](MONGODB_SETUP_CHECKLIST.md) to verify everything is working correctly.**

Happy building! 🏗️

---

**Need help?** Check the documentation files listed above, or review [MONGODB_SETUP.md](MONGODB_SETUP.md#troubleshooting) for troubleshooting.

---

Last updated: March 25, 2026
