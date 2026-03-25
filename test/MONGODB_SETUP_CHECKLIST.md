# MongoDB Setup Checklist

Use this checklist to verify everything is set up correctly.

---

## Part 1: Install MongoDB & Tools (30 min)

### MongoDB Community Server

- [ ] **Linux (Ubuntu/Debian)**
  ```bash
  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  ```

- [ ] **macOS (Homebrew)**
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  ```

- [ ] **Windows**
  - Download from https://www.mongodb.com/try/download/community
  - Run installer and follow wizard

- [ ] Verify MongoDB is running:
  ```bash
  mongosh
  # Should connect successfully, then type: exit
  ```

### MongoDB Compass

- [ ] Download from https://www.mongodb.com/products/tools/compass
- [ ] Install (platform-specific)
- [ ] Launch MongoDB Compass
- [ ] Click "Connect" (should connect to `mongodb://localhost:27017`)
- [ ] Verify you see "Local" connection in left panel

---

## Part 2: Node Packages (5 min)

- [ ] Navigate to project directory:
  ```bash
  cd /home/adam/Desktop/axiom-builders-site
  ```

- [ ] Install dependencies:
  ```bash
  npm install
  ```

- [ ] Verify Mongoose installed:
  ```bash
  npm list mongoose
  # Should show: mongoose@8.0.0 or similar
  ```

- [ ] Install ts-node (for seed script):
  ```bash
  npm install --save-dev ts-node
  ```

---

## Part 3: Environment Configuration (2 min)

- [ ] Create `.env.local` file:
  ```bash
  cp .env.example .env.local
  ```

- [ ] Verify `.env.local` content:
  ```bash
  cat .env.local
  ```
  Should show:
  ```
  MONGODB_URI=mongodb://localhost:27017/axiom-builders
  ```

- [ ] Verify `.env.local` is NOT in git (check `.gitignore`):
  ```bash
  grep .env.local .gitignore
  # Should return the pattern
  ```

---

## Part 4: Seed Database (5 min)

- [ ] Verify MongoDB is running:
  ```bash
  sudo systemctl status mongod  # Linux
  # or
  brew services list | grep mongodb  # macOS
  ```

- [ ] Run seed script:
  ```bash
  MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts
  ```

- [ ] Expected output:
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

- [ ] If seed fails:
  - Check MongoDB is running
  - Check `.env.local` file exists
  - Check connection string in `.env.local`

---

## Part 5: Test API Endpoints (5 min)

- [ ] Start dev server:
  ```bash
  npm run dev
  ```

- [ ] Wait for server to start (should see message like "ready on http://localhost:3000")

- [ ] In another terminal, test home page:
  ```bash
  curl http://localhost:3000/api/pages/home | jq .slug
  # Should output: "home"
  ```

- [ ] Test services page:
  ```bash
  curl http://localhost:3000/api/pages/services | jq .title
  # Should output: "Our Services"
  ```

- [ ] Test contact page:
  ```bash
  curl http://localhost:3000/api/pages/contact | jq .slug
  # Should output: "contact"
  ```

- [ ] Test 404 handling:
  ```bash
  curl http://localhost:3000/api/pages/nonexistent
  # Should return: {"error":"Page not found: nonexistent"}
  ```

---

## Part 6: Verify in MongoDB Compass (3 min)

- [ ] Open MongoDB Compass
- [ ] Verify connected to `mongodb://localhost:27017`
- [ ] In left panel, navigate:
  - Click `Local`
  - Click `axiom-builders` (database)
  - Click `pagecontents` (collection)

- [ ] Verify you see 6 documents:
  - [ ] home
  - [ ] about
  - [ ] services
  - [ ] contact
  - [ ] blog
  - [ ] projects

- [ ] Click on `home` document
- [ ] Verify it contains sections like:
  - [ ] `companyName`
  - [ ] `hero`
  - [ ] `services`
  - [ ] `cta`
  - [ ] `footer`

- [ ] Click pencil icon to edit
- [ ] Modify a value (e.g., change hero.headline)
- [ ] Click save

- [ ] In terminal, test the API again:
  ```bash
  curl http://localhost:3000/api/pages/home | jq '.sections.hero.headline'
  # Should show your modified text
  ```

- [ ] Verify change was saved to database ✅

---

## Part 7: Test Frontend Connection (5 min)

### Option A: Manual Browser Test

- [ ] Open http://localhost:3000 in browser
- [ ] Verify home page loads correctly
- [ ] Check DevTools → Network tab
- [ ] Verify you see request to `/api/pages/home` (if page is migrated)

### Option B: Test with Example Fetch

- [ ] Create a test file `test-fetch.js`:
  ```javascript
  fetch('http://localhost:3000/api/pages/home')
    .then(res => res.json())
    .then(data => console.log('Home page slug:', data.slug))
    .catch(err => console.error('Error:', err))
  ```

- [ ] Run in Node:
  ```bash
  node test-fetch.js
  # Should output: Home page slug: home
  ```

---

## Part 8: Verify File Structure

- [ ] Check files were created:
  ```bash
  ls -la src/lib/mongodb.ts              # ← MongoDB connection
  ls -la src/lib/models/PageContent.ts   # ← Mongoose schema
  ls -la src/app/api/pages/\[slug\]/route.ts  # ← API route
  ls -la scripts/seed.ts                 # ← Seed script
  ```

- [ ] Verify configuration files exist:
  ```bash
  cat .env.local                         # Should show MONGODB_URI
  cat .env.example                       # Should show MONGODB_URI template
  ```

- [ ] Verify documentation files exist:
  ```bash
  ls -la MONGODB_*.md
  ls -la IMPLEMENTATION_SUMMARY.md
  ```

---

## Part 9: Test Fallback (Optional but Recommended)

- [ ] Stop MongoDB:
  ```bash
  sudo systemctl stop mongod  # Linux
  # or
  brew services stop mongodb-community  # macOS
  ```

- [ ] If you've migrated a page, visit it in browser
- [ ] Should still work (using fallback local data)
- [ ] Check console for "Using fallback..." message

- [ ] Restart MongoDB:
  ```bash
  sudo systemctl start mongod  # Linux
  # or
  brew services start mongodb-community  # macOS
  ```

---

## Part 10: Verify Original Frontend Works

- [ ] Stop dev server (Ctrl+C)
- [ ] All your existing pages should still work with local data
- [ ] Start dev server again:
  ```bash
  npm run dev
  ```

- [ ] Navigate to each page:
  - [ ] http://localhost:3000
  - [ ] http://localhost:3000/about
  - [ ] http://localhost:3000/services
  - [ ] http://localhost:3000/contact
  - [ ] http://localhost:3000/blog
  - [ ] http://localhost:3000/projects

- [ ] All pages should render correctly ✅

---

## Part 11: Ready for Migration

- [ ] All tests passed above ✅
- [ ] MongoDB running and responding ✅
- [ ] API endpoints working ✅
- [ ] MongoDB Compass can view data ✅
- [ ] Frontend still works ✅

**You are ready to migrate pages!**

See [MONGODB_PAGE_MIGRATION.md](MONGODB_PAGE_MIGRATION.md) for instructions.

---

## Troubleshooting During Setup

| Step | Error | Solution |
|------|-------|----------|
| 1 | MongoDB won't start | Check port 27017 not in use: `lsof -i :27017` |
| 1 | `mongosh` connection fails | Restart MongoDB: `sudo systemctl restart mongod` |
| 2 | npm install fails | Check npm version: `npm --version` (should be 8+) |
| 3 | MONGODB_URI error | Verify `.env.local` exists and has correct content |
| 4 | Seed script fails to connect | Check MongoDB is running first |
| 4 | "Model already registered" warning | Normal, MongoDB handles automatically |
| 5 | API returns 404 or 500 | Check MongoDB Compass - see if data is there |
| 5 | Cannot call method on undefined | Check page document structure in Compass |
| 6 | Compass won't connect | Try `mongosh` first to verify MongoDB works |
| 6 | Can't see database | Click refresh icon, ensure MongoDB running |
| 7 | Browser shows error | Check dev server console for error details |

---

## Quick Commands Reference

```bash
# Start MongoDB
sudo systemctl start mongod              # Linux
brew services start mongodb-community   # macOS

# Check MongoDB status
sudo systemctl status mongod             # Linux
brew services list | grep mongodb       # macOS

# Connect to MongoDB shell
mongosh

# Install Node packages
npm install

# Run seed script
MONGODB_URI=mongodb://localhost:27017/axiom-builders npx ts-node scripts/seed.ts

# Start dev server
npm run dev

# Test API
curl http://localhost:3000/api/pages/home | jq
curl http://localhost:3000/api/pages/services | jq
curl http://localhost:3000/api/pages/contact | jq

# Stop MongoDB
sudo systemctl stop mongod               # Linux
brew services stop mongodb-community    # macOS
```

---

## Expected Results

After completing all steps, you should have:

✅ MongoDB running locally  
✅ MongoDB Compass installed  
✅ 6 page documents in database  
✅ API endpoints responding  
✅ Fallback to local data working  
✅ Frontend unchanged and working  
✅ All documentation in place  
✅ Ready to migrate pages  

**Estimated total time: 60 minutes (first time only)**

---

## Next Steps

1. ✅ Complete this checklist
2. → Read [MONGODB_PAGE_MIGRATION.md](MONGODB_PAGE_MIGRATION.md)
3. → Migrate Contact page first (simplest)
4. → Test in browser
5. → Repeat for other pages

---

Keep this checklist for reference if you need to troubleshoot or set up on a new machine.
