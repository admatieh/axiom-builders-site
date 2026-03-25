# Page Migration Examples

This guide shows how to migrate your Next.js pages from hardcoded data to database-backed content.

## Pattern: Fetching from Database

### Before (Current - Hardcoded Data)

```typescript
// src/app/page.tsx (BEFORE - using local data files)
import { homeData } from '@/data/home';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';

export default function Home() {
  return (
    <main>
      <Hero data={homeData.hero} />
      <Services data={homeData.services} />
    </main>
  );
}
```

### After (Database-Backed)

```typescript
// src/app/page.tsx (AFTER - using MongoDB)
import { cache } from 'react';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';

// Wrap fetch in cache() to prevent multiple requests during SSR
const getPageContent = cache(async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages/home`, {
      // Revalidate every hour in production (ISR)
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error('[Home] Failed to fetch from database:', error);
  }

  // Fallback to local data if database fails
  console.log('[Home] Using fallback local data');
  const { homeData } = await import('@/data/home');
  return homeData;
});

export default async function Home() {
  const data = await getPageContent();

  return (
    <main>
      <Hero data={data.hero} />
      <Services data={data.services} />
    </main>
  );
}
```

---

## Example 1: Contact Page (Simplest)

### Current Code

```typescript
// src/app/contact/page.tsx
import { contactData } from '@/data/pages';
import ContactHero from '@/components/contact/ContactHero';
import ContactFormSection from '@/components/contact/ContactFormSection';
import LocationBlock from '@/components/contact/LocationBlock';

export default function ContactPage() {
  return (
    <main>
      <ContactHero {...contactData.hero} />
      <ContactFormSection {...contactData.form} />
      <LocationBlock {...contactData.location} />
    </main>
  );
}
```

### Updated to Use Database

```typescript
// src/app/contact/page.tsx
import { cache } from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactFormSection from '@/components/contact/ContactFormSection';
import LocationBlock from '@/components/contact/LocationBlock';

const getContactData = cache(async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages/contact`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error('[Contact] Failed to fetch from database:', error);
  }

  // Fallback to local data
  const { contactData } = await import('@/data/pages');
  return contactData;
});

export default async function ContactPage() {
  const data = await getContactData();

  return (
    <main>
      <ContactHero {...data.hero} />
      <ContactFormSection {...data.form} />
      <LocationBlock {...data.location} />
    </main>
  );
}
```

**What Changed:**
- ✅ Added `const getContactData` function
- ✅ Fetch from `/api/pages/contact` instead of importing
- ✅ Added fallback to local data
- ✅ Wrapped in `cache()` to prevent duplicate requests
- ✅ Added `next: { revalidate: 3600 }` for ISR
- ✅ Page marked as `async`

**That's it!** No component changes needed.

---

## Example 2: Services Page (More Complex)

### Current Code

```typescript
// src/app/services/page.tsx
import { servicesData } from '@/data/services';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesIntro from '@/components/services/ServicesIntro';
import ServiceShowcase from '@/components/services/ServiceShowcase';
import ServiceValues from '@/components/services/ServiceValues';
import SectorsSection from '@/components/services/SectorsSection';

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero {...servicesData.hero} />
      <ServicesIntro {...servicesData.intro} />
      
      {servicesData.mainServices.map((service) => (
        <ServiceShowcase key={service.id} {...service} />
      ))}
      
      <ServiceValues {...servicesData.values} />
      <SectorsSection {...servicesData.sectors} />
    </main>
  );
}
```

### Updated to Use Database

```typescript
// src/app/services/page.tsx
import { cache } from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesIntro from '@/components/services/ServicesIntro';
import ServiceShowcase from '@/components/services/ServiceShowcase';
import ServiceValues from '@/components/services/ServiceValues';
import SectorsSection from '@/components/services/SectorsSection';

const getServicesData = cache(async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages/services`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error('[Services] Failed to fetch from database:', error);
  }

  // Fallback to local data
  const { servicesData } = await import('@/data/services');
  return servicesData;
});

export default async function ServicesPage() {
  const data = await getServicesData();

  return (
    <main>
      <ServicesHero {...data.hero} />
      <ServicesIntro {...data.intro} />
      
      {data.mainServices.map((service) => (
        <ServiceShowcase key={service.id} {...service} />
      ))}
      
      <ServiceValues {...data.values} />
      <SectorsSection {...data.sectors} />
    </main>
  );
}
```

**Changes:**
- Added `const getServicesData` function
- Fetch from database instead of import
- Everything else stays the same! ✅

---

## Example 3: About Page

### Current Code

```typescript
// src/app/about/page.tsx
import { aboutData } from '@/data/about';
import AboutHero from '@/components/about/AboutHero';
import StorySection from '@/components/about/StorySection';
import PhilosophySection from '@/components/about/PhilosophySection';
import CoreValues from '@/components/about/CoreValues';
import WhyChooseUs from '@/components/about/WhyChooseUs';

export default function AboutPage() {
  return (
    <main>
      <AboutHero {...aboutData.hero} />
      <StorySection {...aboutData.story} />
      <PhilosophySection {...aboutData.philosophy} />
      <CoreValues {...aboutData.values} />
      <WhyChooseUs {...aboutData.whyUs} />
    </main>
  );
}
```

### Updated to Use Database

```typescript
// src/app/about/page.tsx
import { cache } from 'react';
import AboutHero from '@/components/about/AboutHero';
import StorySection from '@/components/about/StorySection';
import PhilosophySection from '@/components/about/PhilosophySection';
import CoreValues from '@/components/about/CoreValues';
import WhyChooseUs from '@/components/about/WhyChooseUs';

const getAboutData = cache(async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages/about`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error('[About] Failed to fetch from database:', error);
  }

  // Fallback to local data - NOTE: you'll need to import aboutData here
  const { aboutData } = await import('@/data/about');
  return aboutData;
});

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <main>
      <AboutHero {...data.hero} />
      <StorySection {...data.story} />
      <PhilosophySection {...data.philosophy} />
      <CoreValues {...data.values} />
      <WhyChooseUs {...data.whyUs} />
    </main>
  );
}
```

---

## Generic Template

Use this template for any page:

```typescript
// src/app/[page]/page.tsx
import { cache } from 'react';
import { ComponentA } from '@/components/[page]';
import { ComponentB } from '@/components/[page]';

// Helper function to fetch from database with fallback
const getPageData = cache(async (slug: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/pages/${slug}`, {
      next: { revalidate: 3600 }, // ISR - revalidate hourly
    });

    if (res.ok) {
      const page = await res.json();
      return page.sections;
    }
  } catch (error) {
    console.error(`Failed to fetch page: ${slug}`, error);
  }

  // Fallback to local data
  const { [slug + 'Data']: fallbackData } = await import(`@/data/[data-file]`);
  return fallbackData;
});

export default async function Page() {
  const data = await getPageData('[slug]');

  return (
    <main>
      <ComponentA {...data.section1} />
      <ComponentB {...data.section2} />
    </main>
  );
}
```

---

## Key Points

### ✅ Do This:

```typescript
// Good: cache() prevents duplicate requests
import { cache } from 'react';

const getData = cache(async () => {
  const res = await fetch('/api/pages/home');
  return await res.json();
});

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### ❌ Don't Do This:

```typescript
// Bad: No cache - fetch called multiple times in SSR
export default async function Page() {
  const res = await fetch('/api/pages/home');
  const data = await res.json();
  return <div>{data.title}</div>;
}
```

### ✅ Do This:

```typescript
// Good: Has fallback if database fails
const getData = cache(async () => {
  try {
    const res = await fetch('/api/pages/home');
    if (res.ok) {
      return (await res.json()).sections;
    }
  } catch (error) {
    console.error('DB failed:', error);
  }

  // Fallback
  const { homeData } = await import('@/data/home');
  return homeData;
});
```

### ❌ Don't Do This:

```typescript
// Bad: No fallback - page breaks if database fails
const getData = cache(async () => {
  const res = await fetch('/api/pages/home');
  return (await res.json()).sections;
});
```

---

## Environment Variables

Add to `.env.local`:

```
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3000

# For production (optional)
# NEXT_PUBLIC_API_URL=https://yourdomain.com
```

In your code:
```typescript
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const res = await fetch(`${baseUrl}/api/pages/home`);
```

---

## Migration Checklist

For each page you migrate:

- [ ] Add `import { cache } from 'react';`
- [ ] Create `const getPageData = cache(async () => { ... })`
- [ ] Fetch from `/api/pages/[slug]` instead of importing
- [ ] Add fallback to local data
- [ ] Add `next: { revalidate: 3600 }`
- [ ] Make component `async`
- [ ] Change `homeData` to `data` in JSX
- [ ] Test locally: `npm run dev`
- [ ] Test API: `curl http://localhost:3000/api/pages/[slug]`
- [ ] Check MongoDB Compass: See data in database

---

## Testing

### 1. Start dev server:
```bash
npm run dev
```

### 2. Verify page loads:
- Visit http://localhost:3000/[page] in browser
- Should render correctly

### 3. Check API:
```bash
curl http://localhost:3000/api/pages/[slug] | jq
```

### 4. Verify database was used:
- Open MongoDB Compass
- See the query in Network tab (DevTools)
- Check `axiom-builders.pagecontents` collection

### 5. Test fallback:
- Stop MongoDB: `sudo systemctl stop mongod`
- Refresh page
- Should use fallback local data
- Page should still work!
- Restart MongoDB: `sudo systemctl start mongod`

---

## Common Issues

### Page doesn't update after DB change

**Problem:** Using `revalidate: false` or no revalidate  
**Solution:** Use `next: { revalidate: 3600 }` for hourly updates, or set to a lower number like 60 for testing

```typescript
const res = await fetch('/api/pages/home', {
  next: { revalidate: 60 }, // Update every 60 seconds
});
```

### Component styling breaks

**Problem:** Data structure changed  
**Solution:** Ensure MongoDB document structure matches local data structure, or update component to handle new format

### "Cannot read property 'hero' of undefined"

**Problem:** Fetch returned null or failed  
**Solution:** Add proper error handling and fallback:

```typescript
if (!data || !data.hero) {
  console.error('Invalid data structure');
  return <div>Error loading page</div>;
}
```

---

## Recommended Order to Migrate

1. **Contact Page** - Simplest structure, good test
2. **Services Page** - More complex, arrays of items
3. **Home Page** - Most important, lots of sections
4. **About Page** - Similar to home
5. **Blog/Projects** - Currently "coming soon", lower priority

---

For detailed setup, see [MONGODB_SETUP.md](MONGODB_SETUP.md)
For database structure, see [MONGODB_DOCUMENT_EXAMPLES.md](MONGODB_DOCUMENT_EXAMPLES.md)
