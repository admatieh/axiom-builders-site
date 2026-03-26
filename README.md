# Axiom Builders — Premium Construction Website

Axiom Builders is a high-fidelity, cinematic business website for a modern construction firm. Built with Next.js and Framer Motion, it emphasizes structural clarity, technical coordination, and premium architectural aesthetics. The project is fully integrated with a MongoDB backend for dynamic content management.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Key Features](#key-features)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Database Management](#database-management)
6. [Project Structure](#project-structure)

---

## Tech Stack
- **Framework**: [Next.js 16+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## Key Features
- **Dynamic Content System**: All public pages (Home, About, Services, Contact) fetch content from MongoDB.
- **Fail-Safe Architecture**: Automatically falls back to local static files if the database is unavailable.
- **Contact Form Backend**: Fully functional submission system with server-side validation and storage.
- **Consent-Based Logging**: Tracks approximate location/IP only when user explicitly consents.
- **Cinematic UI**: Custom reveal animations, 3D interactions, and responsive layouts.

## Prerequisites
Before you begin, ensure you have:
- **Node.js** (v18 or higher recommended)
- **MongoDB** installed and running locally (or a cloud connection string)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd axiom-builders-site
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env.local` in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/axiom-builders
```

### 4. Seed the Database
Populate your local database with the initial site content using the included seed script:

```bash
npm run seed
```
*This command reads the static data from `src/data/` and upserts it into your MongoDB instance.*

### 5. Run the Project
Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Database Management

### Content Seeding
The project includes a robust seeding system to ensure your local DB always has the correct structure.
- **Seed All Content**: `npm run seed` (page content + blog page content + blog categories + blog posts)
- **Seed Home Only**: `npm run seed:home`

### Verification
You can verify data is loading from the DB by checking the API endpoints:
- `http://localhost:3000/api/pages/home`
- `http://localhost:3000/api/pages/about`
- `http://localhost:3000/api/pages/services`

If you modify data in MongoDB (e.g., using MongoDB Compass), refresh the page to see changes instantly.

## Project Structure
```text
src/
├── app/              # Next.js App Router
│   ├── api/          # Backend API routes (Contact form, Page content)
│   ├── blog/         # Public blog listing and detail pages
│   ├── admin/        # Admin dashboard (pages, blog posts, blog categories)
│   └── page.tsx      # Home page
├── components/       # UI Components
│   ├── home/         # Homepage sections
│   ├── layout/       # Navbar, Footer
│   └── ui/           # Shared elements
├── data/             # Static fallback content (Source of truth for seeds)
├── lib/              # Backend utilities
│   ├── models/       # Mongoose Schemas (PageContent, PageDraft, BlogPost, BlogCategory, ContactSubmission)
│   ├── seeds/        # Database seed scripts
│   └── mongodb.ts    # DB Connection helper
└── public/           # Static assets
```
