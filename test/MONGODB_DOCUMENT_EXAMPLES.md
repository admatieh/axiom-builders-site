# MongoDB Document Examples

This file shows the exact structure of each page document in MongoDB.

## Collection: `pagecontents`

Each document represents one page with this structure:

```typescript
{
  _id: ObjectId,
  slug: string,        // unique, lowercase
  title: string,
  sections: object,    // any page-specific content
  status: "published" | "draft",
  createdAt: Date,
  updatedAt: Date
}
```

---

## Page Documents

### 1. HOME PAGE

**Slug:** `home`  
**Collection Path:** `axiom-builders.pagecontents`

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
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
      "subheadline": "Leading-edge delivery for commercial, residential, and mixed-use developments...",
      "ctaText": "Explore Projects",
      "endTitle": "Structural",
      "endHighlight": "Precision"
    },
    "trustedBy": {
      "badge": "Sector Expertise",
      "title": "The Standard of Delivery",
      "description": "Partnering with leading developers...",
      "sectors": [
        "Private Developers",
        "Property Owners",
        "Hospitality Brands",
        "Corporate Clients",
        "Institutional Partners"
      ]
    },
    "aboutPreview": {
      "badge": "The Firm",
      "title": "Engineering the Future of Built Environments",
      "description1": "Axiom Builders is a premier construction firm...",
      "description2": "We specialize in complex urban developments...",
      "metrics": [
        { "label": "Practice", "value": "12+ Years" },
        { "label": "Projects", "value": "180+" },
        { "label": "Built Area", "value": "2.4M+ Sq Ft" }
      ],
      "ctaText": "About Axiom"
    },
    "services": {
      "badge": "Our Capability",
      "title": "Integrated Delivery.",
      "description": "Full-spectrum construction services...",
      "items": [
        {
          "num": "01",
          "title": "Interior Fit-Out",
          "desc": "Specialized execution of high-end commercial and residential interiors...",
          "icon": "/icons/interior.png",
          "marginTop": "mt-0"
        }
      ]
    },
    "featuredProject": {
      "badge": "Featured Work",
      "name": "The Genesis Tower",
      "tagline": "Mixed-Use Development",
      "description": "Our flagship mixed-use high-rise...",
      "metrics": [
        { "label": "Levels", "value": "32" }
      ]
    },
    "metrics": {
      "badge": "Operational Scale",
      "title": "Measured Success.",
      "description": "Quantified performance across capital deployment...",
      "items": [
        {
          "value": "4.2",
          "suffix": "B",
          "label": "Capital Deployed",
          "description": "Strategic project value managed..."
        }
      ]
    },
    "process": {
      "badge": "Methodology",
      "title": "Controlled Execution.",
      "description": "A process system built like construction itself...",
      "steps": [
        {
          "num": "01",
          "title": "Conceptualization",
          "desc": "Rigorous planning, feasibility analysis...",
          "tone": "Planning Block"
        }
      ]
    },
    "cta": {
      "badge": "Project Inquiry",
      "title": "Initiate Project.",
      "description": "Partner with Axiom Builders...",
      "sectors": ["Commercial", "Residential", "Mixed-Use", "Fit-Out"],
      "buttonText": "Contact Firm"
    },
    "footer": {
      "description": "Premium construction and development...",
      "stats": [
        { "value": "12+", "label": "Years Active" },
        { "value": "180+", "label": "Projects" },
        { "value": "6", "label": "Cities Served" }
      ],
      "links": [
        { "label": "About Us", "href": "/about" }
      ],
      "contact": {
        "email": "hello@axiom.build",
        "phone": "+1 (800) 555-0199",
        "address": ["245 Urban Axis Boulevard", "..."],
        "status": "Open for Project Inquiries"
      }
    }
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

**Access in Code:**
```typescript
const res = await fetch('/api/pages/home');
const page = await res.json();
const data = page.sections;

// Use:
data.hero.headline
data.services.items[0].title
data.cta.buttonText
```

---

### 2. ABOUT PAGE

**Slug:** `about`  
**Collection Path:** `axiom-builders.pagecontents`

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "slug": "about",
  "title": "About Axiom",
  "sections": {
    "hero": {
      "badge": "The Firm",
      "headline": "Engineering the Future of Built Environments",
      "subheadline": "Come from database..."
    },
    "story": {
      "badge": "Our Journey",
      "title": "Built on Foundation",
      "content": [
        "Since our founding...",
        "We've grown to..."
      ]
    },
    "philosophy": {
      "mission": {
        "title": "Mission",
        "content": "To deliver precision construction..."
      },
      "vision": {
        "title": "Vision",
        "content": "To be the premier construction firm..."
      }
    },
    "values": {
      "badge": "Core Values",
      "title": "What Drives Us",
      "items": [
        {
          "title": "Precision",
          "description": "Every detail matters"
        }
      ]
    },
    "whyUs": {
      "badge": "Why Axiom",
      "title": "The Difference",
      "items": [
        "12+ years of experience",
        "180+ completed projects"
      ]
    },
    "stats": {
      "badge": "By the Numbers",
      "title": "Our Scale",
      "description": "Proven delivery capacity",
      "items": [
        { "value": "12", "suffix": "+", "label": "Years" }
      ]
    },
    "cta": {
      "badge": "Next Step",
      "title": "Start Your Project",
      "description": "Partner with Axiom...",
      "sectors": ["Commercial", "Residential"],
      "primaryButton": { "label": "Contact", "href": "/contact" }
    }
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

---

### 3. SERVICES PAGE

**Slug:** `services`  
**Collection Path:** `axiom-builders.pagecontents`

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "slug": "services",
  "title": "Our Services",
  "sections": {
    "hero": {
      "badge": "Core Expertise",
      "headline": "Construction Services Built on Precision",
      "subheadline": "Axiom Builders delivers coordinated construction..."
    },
    "intro": {
      "badge": "Structural Approach",
      "title": "The System of Delivery",
      "content": "We approach every service through planning discipline..."
    },
    "mainServices": [
      {
        "id": "interior-design",
        "num": "01",
        "title": "Interior Design",
        "intro": "Spatial identity shaped through material discipline.",
        "description": "Axiom Builders creates interior environments...",
        "deliverables": [
          "Spatial Programming & Layout",
          "Material Procurement & Specification",
          "FF&E Coordination",
          "Custom Millwork Execution"
        ],
        "icon": "/icons/interior.png",
        "image": "/images/interior.webp"
      },
      {
        "id": "construction",
        "num": "02",
        "title": "Construction",
        "intro": "Disciplined delivery from planning to execution.",
        "description": "We manage construction delivery...",
        "deliverables": [
          "Core & Shell Development",
          "Site Supervision & Safety"
        ],
        "icon": "/icons/construction.png",
        "image": "/images/construction.webp"
      }
    ],
    "values": {
      "headline": "What Clients Gain",
      "items": [
        {
          "title": "Disciplined Planning",
          "description": "Front-loaded coordination that defines project success..."
        }
      ]
    },
    "sectors": {
      "badge": "Sectors We Serve",
      "title": "Across Industries",
      "items": [
        "Commercial Development",
        "Residential",
        "Hospitality",
        "Institutional"
      ]
    },
    "processConnection": {
      "title": "Connected Process",
      "content": "Our services integrate through our methodology..."
    },
    "cta": {
      "badge": "Ready to Discuss",
      "title": "Start Your Service Inquiry",
      "description": "Let's discuss how Axiom can serve your project...",
      "primaryButton": { "label": "Contact Us", "href": "/contact" },
      "secondaryButton": { "label": "See Our Process", "href": "#process" }
    }
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

---

### 4. CONTACT PAGE

**Slug:** `contact`  
**Collection Path:** `axiom-builders.pagecontents`

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "slug": "contact",
  "title": "Contact Us",
  "sections": {
    "hero": {
      "badge": "Inquiry",
      "title": "Initiate Your Project Sequence",
      "subheadline": "Connect with Axiom Builders to discuss technical coordination..."
    },
    "info": {
      "emails": [
        "hello@axiom.build",
        "partnerships@axiom.build"
      ],
      "phones": [
        "+1 (800) 555-0199",
        "+1 (212) 555-0128"
      ],
      "address": [
        "245 Urban Axis Boulevard",
        "Downtown Development District",
        "New York, NY 10001"
      ],
      "socials": [
        { "label": "LinkedIn", "href": "#" },
        { "label": "Instagram", "href": "#" },
        { "label": "X (Twitter)", "href": "#" }
      ]
    },
    "form": {
      "title": "Submit Project Brief",
      "description": "Provide the initial parameters of your project...",
      "trustNote": "Your message will be sent directly to our team...",
      "buttonLabel": "Submit Brief"
    },
    "location": {
      "badge": "Headquarters",
      "title": "Global Operations Center",
      "description": "Centrally positioned in the Downtown Development District...",
      "coordinates": {
        "lat": 40.7128,
        "lng": -74.006
      }
    }
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

---

### 5. BLOG PAGE (Coming Soon)

**Slug:** `blog`  
**Collection Path:** `axiom-builders.pagecontents`

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439015"),
  "slug": "blog",
  "title": "Blog",
  "sections": {
    "badge": "Perspective",
    "title": "Industry Insights & Perspectives",
    "message": "We are currently structuring our editorial platform to share technical insights...",
    "buttonLabel": "Go Home",
    "buttonHref": "/"
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

---

### 6. PROJECTS PAGE (Coming Soon)

**Slug:** `projects`  
**Collection Path:** `axiom-builders.pagecontents`

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439016"),
  "slug": "projects",
  "title": "Projects",
  "sections": {
    "badge": "Portfolio",
    "title": "The Project Archive",
    "message": "Our comprehensive gallery of commercial, residential, and mixed-use developments is being compiled into a high-fidelity digital archive...",
    "buttonLabel": "Go Home",
    "buttonHref": "/"
  },
  "status": "published",
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

---

## Query Examples

### MongoDB Compass

**Find all published pages:**
```json
{ "status": "published" }
```

**Find a specific page:**
```json
{ "slug": "home" }
```

**Find pages with draft status:**
```json
{ "status": "draft" }
```

---

## Accessing Data in Your Code

### Fetch entire page:
```typescript
const res = await fetch('/api/pages/home');
const page = await res.json();

page._id          // MongoDB ID
page.slug         // "home"
page.title        // "Home"
page.sections     // All page content
page.status       // "published"
page.createdAt    // Date
page.updatedAt    // Date
```

### Access specific sections:
```typescript
const res = await fetch('/api/pages/home');
const { sections } = await res.json();

sections.hero.headline              // "Precision Construction."
sections.services.items[0].title    // "Interior Fit-Out"
sections.cta.buttonText             // "Contact Firm"
sections.footer.contact.email       // "hello@axiom.build"
```

---

## Modifying in MongoDB Compass

### To edit a page:
1. Connect to `mongodb://localhost:27017`
2. Open `axiom-builders` → `pagecontents`
3. Click on the document (e.g., "home")
4. Click pencil icon to edit
5. Modify the JSON
6. Click save

Changes immediately available via API.

---

## Adding a New Page

**Example: Adding a "Team" page**

```json
{
  "slug": "team",
  "title": "Our Team",
  "sections": {
    "hero": {
      "badge": "Leadership",
      "headline": "Meet Axiom's Team"
    },
    "members": [
      {
        "name": "John Doe",
        "role": "Founder & CEO",
        "bio": "15+ years in construction..."
      }
    ]
  },
  "status": "published"
}
```

Insert in MongoDB Compass:
1. Click `+` button in `pagecontents` collection
2. Paste document (without `_id`, `createdAt`, `updatedAt`)
3. Click insert
4. Access via `/api/pages/team`

---

## Schema Design Notes

✅ **Flexible `sections` object** - Store any page structure  
✅ **Slug is unique** - Only one "home" page  
✅ **Status field** - Draft/publish workflow ready  
✅ **Timestamps** - Auto-managed by Mongoose  
✅ **No user/auth** - Simple content storage  
✅ **Scalable** - Easy to add more pages  

---

For questions about structure, see [MONGODB_SETUP.md](MONGODB_SETUP.md) or [MONGODB_QUICK_REFERENCE.md](MONGODB_QUICK_REFERENCE.md).
