# Axiom Builders — Premium Construction Website

A high-fidelity, cinematic business website for a modern construction firm. Axiom Builders showcases structural clarity, technical coordination, and premium architectural aesthetics with a fully integrated MongoDB backend for dynamic content management.

---

## 🚀 Quick Start (30 seconds)

Follow these 5 simple steps to run the project:

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd axiom-builders-site
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create `.env.local` File
Copy the example file:
```bash
cp .env.example .env.local
```

### Step 4: Update MongoDB Connection
Open `.env.local` with your text editor and update the `MONGODB_URI`:

**Option A: Local MongoDB (Simple)**
```env
MONGODB_URI=mongodb://localhost:27017/axiom-builders
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account & cluster
3. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/axiom-builders`)
4. Update in `.env.local`:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/axiom-builders
```

Keep the rest of the variables as-is for local development.

### Step 5: Run the Project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. **Done! 🎉**

---

## ❌ Common Issues & Solutions

### "mongodb connection refused"
**Problem:** MongoDB isn't running or wrong connection string

**Solution:**
```bash
# macOS - Start MongoDB
brew services start mongodb-community

# Linux - Start MongoDB
sudo systemctl start mongod

# Windows - Open Services and start MongoDB manually
```

**For MongoDB Atlas:** Verify your connection string in `.env.local` is correct

---

### "Cannot find module X"
**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
```

---

### "Port 3000 is already in use"
**Problem:** Another app is using port 3000

**Solution:**
```bash
# macOS/Linux - Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows - Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### "MONGODB_URI is not defined"
**Problem:** `.env.local` file not created or misconfigured

**Solution:**
1. Verify `.env.local` exists in project root (same folder as `package.json`)
2. Check it has the line `MONGODB_URI=mongodb://...`
3. Restart dev server: `npm run dev`

---

## Table of Contents
1. [Quick Start](#-quick-start-30-seconds)
2. [Common Issues & Solutions](#-common-issues--solutions)
3. [Prerequisites](#prerequisites)
4. [Project Overview](#project-overview)
5. [Available Commands](#available-commands)
6. [Environment Variables](#environment-variables)
7. [Deployment Guide](#deployment-guide)
8. [Tech Stack](#tech-stack)
9. [Key Features](#key-features)
10. [Database Management](#database-management)
11. [Project Structure](#project-structure)

---

## Prerequisites

Make sure you have these installed:

1. **Node.js v18+** — [Download](https://nodejs.org/)
   - Check: `node --version`

2. **MongoDB** — Choose ONE option:
   - **MongoDB Atlas** (Cloud) — [Sign up free](https://www.mongodb.com/cloud/atlas)
   - **Local MongoDB** — [Install Community Edition](https://docs.mongodb.com/manual/installation/)

3. **Text Editor** — VS Code, Sublime, etc. (to edit `.env.local`)

That's it! ✅

---

## Project Overview

**Axiom Builders** is a full-stack Next.js application for a professional construction company:

✅ **Dynamic Content** — Manage pages & blog posts in MongoDB  
✅ **Beautiful UI** — Cinematic animations & responsive design  
✅ **Admin Dashboard** — Edit content, users, roles  
✅ **Fallback System** — Works without database if needed  
✅ **Contact Forms** — Collect & store submissions  
✅ **Fast Performance** — Optimized images & code  

---

## Available Commands

```bash
# Development
npm run dev               # Start dev server (http://localhost:3000)

# Production
npm run build             # Create production build
npm run start             # Run production version

# Database
npm run seed              # Add sample content to database
npm run seed:home         # Seed only home page
npm run seed:about        # Seed about page
npm run seed:blog         # Seed blog posts

# Code Quality
npm run lint              # Check code quality
npm run type-check        # Find TypeScript errors
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and update as needed:

```bash
cp .env.example .env.local
```

### Important Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/axiom-builders` |
| `JWT_SECRET` | Login security | (auto-filled, don't change) |
| `SUPER_ADMIN_EMAIL` | Admin login email | `admin@axiombuilders.com` |
| `SUPER_ADMIN_PASSWORD` | Admin login password | `ChangeMe123!` |

**For local development:** Keep all other variables as-is from `.env.example`

---

## Deployment Guide

### For Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Go to **Settings → Environment Variables**
5. Add these variables:
   ```
   MONGODB_URI=<your-atlas-connection-string>
   JWT_SECRET=<keep-as-is>
   SUPER_ADMIN_EMAIL=admin@axiombuilders.com
   SUPER_ADMIN_PASSWORD=<strong-password>
   # ... and all other variables from .env.local
   ```
6. Deploy!

### For Self-Hosted (VPS/Docker)

```bash
# On your server:
npm install
npm run build
npm start

# Or with Docker:
docker build -t axiom-builders .
docker run -e MONGODB_URI=<uri> -e JWT_SECRET=<secret> -p 3000:3000 axiom-builders
```

### For MongoDB (Production)

Use **MongoDB Atlas Cloud**:
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free tier cluster
3. Get connection string
4. Add IP whitelist for your app server
5. Use connection string in deployment environment

---

## Tech Stack

- **Frontend**: [Next.js 16+](https://nextjs.org/) — React framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) — Utility CSS
- **Animation**: [Framer Motion](https://www.framer.com/motion/) — Smooth effects
- **Database**: [MongoDB](https://www.mongodb.com/) — NoSQL database
- **ORM**: [Mongoose](https://mongoosejs.com/) — MongoDB schema library

---

## Key Features

🎬 **Cinematic UI**  
Custom reveal animations, smooth transitions, 3D interactions

📱 **Responsive Design**  
Works perfectly on mobile, tablet, desktop

📝 **Dynamic Content**  
Edit pages & blog posts in admin dashboard

📋 **Contact Forms**  
Collect submissions with server-side validation

👥 **User Management**  
Admin roles & permissions system

🔄 **Fallback Architecture**  
Works with or without database

---

## Database Management

### Seeding Database

Add sample content to your database:

```bash
npm run seed              # All content
npm run seed:home         # Home page only
npm run seed:about        # About page only
npm run seed:blog         # Blog posts only
```

### Verifying Database Connection

Test API endpoints:
```bash
curl http://localhost:3000/api/pages/home
curl http://localhost:3000/api/pages/about
```

### Using MongoDB Tools

- **MongoDB Atlas Web**: https://account.mongodb.com/account/login
- **MongoDB Compass** (Desktop): [Download](https://www.mongodb.com/products/compass)
- **Terminal**: `mongosh "your-connection-string"`

---

## Project Structure

```
axiom-builders-site/
├── src/
│   ├── app/                    # Next.js pages & API routes
│   │   ├── api/               # Backend endpoints
│   │   ├── admin/             # Admin dashboard
│   │   ├── blog/              # Blog pages
│   │   ├── about/             # About page
│   │   ├── services/          # Services page
│   │   ├── contact/           # Contact page
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── home/              # Homepage sections
│   │   ├── admin/             # Admin components
│   │   ├── layout/            # Navbar, Footer
│   │   └── ui/                # Shared UI elements
│   ├── lib/                   # Utilities & helpers
│   │   ├── models/            # Database schemas
│   │   ├── seeds/             # Database seed scripts
│   │   ├── auth.ts            # Authentication
│   │   └── mongodb.ts         # DB connection
│   ├── data/                  # Static fallback content
│   └── middleware.ts          # Next.js middleware
├── public/                    # Static assets
│   ├── images/
│   ├── icons/
│   └── frames/
├── .env.example              # Environment template
├── .env.local               # Your config (don't commit)
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## Getting Help

**Have issues?** Check:
1. [Common Issues section](#-common-issues--solutions) above
2. Make sure you ran `npm install`
3. Verify MongoDB is running and connection string is correct
4. Check that `.env.local` file exists with correct values
5. Try restarting dev server: `npm run dev`

**Need more help?**
- Check official docs: [nextjs.org](https://nextjs.org/docs)
- MongoDB help: [mongodb.com/docs](https://www.mongodb.com/docs/)
- Open an issue on GitHub

---

**Ready to go?** Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) 🚀
