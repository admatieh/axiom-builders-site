import dbConnect from '@/lib/mongodb';
import BlogCategory from '../models/BlogCategory';
import BlogPost from '../models/BlogPost';

const categories = [
  {
    name: "Insights",
    slug: "insights",
    description: "Deep dives into construction methodology and approach."
  },
  {
    name: "Project Updates",
    slug: "project-updates",
    description: "Milestones and progress from our active sites."
  },
  {
    name: "Industry Perspective",
    slug: "industry-perspective",
    description: "Thought leadership on the future of building."
  },
  {
    name: "Materials",
    slug: "materials",
    description: "Exploring the physical elements that shape our work."
  },
  {
    name: "Planning",
    slug: "planning",
    description: "The strategy before the structure."
  },
  {
    name: "Case Study",
    slug: "case-study",
    description: "Detailed analysis of past projects."
  }
];

const posts = [
  {
    title: "Design-Led Construction in Modern Urban Projects",
    slug: "design-led-construction-modern-urban-projects",
    excerpt: "How integrated architectural thinking transforms standard building processes into landmark developments.",
    content: `The Intersection of Design and Execution

In modern urban development, the separation between design intent and construction reality often creates friction. At Axiom Builders, we believe in closing this gap through design-led construction.

Why It Matters

When builders understand the architectural vision fundamentally, decisions on site are made to enhance, not compromise, the final form. This approach requires earlier collaboration and a shared language between architects and engineers.

Our recent work on the silica facade projects demonstrated this perfectly. By modeling the tolerance issues in pre-construction, we avoided costly re-designs later.`,
    coverImage: "/images/blog/urban-design.jpg",
    galleryImages: [
      "/images/blog/urban-design.jpg",
      "/images/blog/facade.jpg",
      "/images/blog/coordination.jpg"
    ],
    categorySlug: "insights",
    readingTime: "5 min read",
    status: "published",
    featured: true,
    publishedAt: new Date('2024-03-12')
  },
  {
    title: "How Early Planning Reduces Build Delays",
    slug: "how-early-planning-reduces-build-delays",
    excerpt: "The critical role of pre-construction strategy in identifying bottlenecks before ground is broken.",
    content: `Front-Loading the Effort

The most expensive changes happen after the concrete is poured. This is why we invest heavily in pre-construction planning.

By simulating logistics, crane positions, and material deliveries months in advance, we turn potential chaos into a choreographed sequence.`,
    coverImage: "/images/blog/planning.jpg",
    galleryImages: [
      "/images/blog/planning.jpg",
      "/images/blog/genesis-tower.jpg"
    ],
    categorySlug: "planning",
    readingTime: "4 min read",
    status: "published",
    featured: false,
    publishedAt: new Date('2024-02-28')
  },
  {
    title: "Material Discipline and Long-Term Project Value",
    slug: "material-discipline-long-term-value",
    excerpt: "Why selecting the right materials is an investment in the building's lifecycle, not just an aesthetic choice.",
    content: `More Than Texture

Materiality defines the aging process of a building. Cheap materials look good on day one but fail by year five. Premium materials require discipline to spec and install, but they pay dividends for decades.`,
    coverImage: "/images/blog/materials.jpg",
    galleryImages: [
      "/images/blog/materials.jpg",
      "/images/blog/facade.jpg"
    ],
    categorySlug: "materials",
    readingTime: "6 min read",
    status: "published",
    featured: false,
    publishedAt: new Date('2024-02-15')
  },
  {
    title: "Inside the Genesis Tower Development Approach",
    slug: "inside-genesis-tower-development",
    excerpt: "A case study on vertical engineering challenges and the innovative solutions that overcame them.",
    content: "Genesis Tower represented a unique challenge: a tight urban footprint with complex seismic requirements...",
    coverImage: "/images/blog/genesis-tower.jpg",
    galleryImages: [
      "/images/blog/genesis-tower.jpg",
      "/images/blog/urban-design.jpg"
    ],
    categorySlug: "project-updates",
    readingTime: "8 min read",
    status: "published",
    featured: false,
    publishedAt: new Date('2024-01-30')
  },
  {
    title: "Exterior Systems That Balance Identity and Performance",
    slug: "exterior-systems-identity-performance",
    excerpt: "Designing facades that define a skyline while delivering exceptional energy efficiency.",
    content: "The skin of the building is its first defense and its primary statement...",
    coverImage: "/images/blog/facade.jpg",
    galleryImages: [
      "/images/blog/facade.jpg",
      "/images/blog/materials.jpg"
    ],
    categorySlug: "industry-perspective",
    readingTime: "5 min read",
    status: "published",
    featured: false,
    publishedAt: new Date('2024-01-14')
  },
  {
    title: "Why Coordinated Execution Matters at Scale",
    slug: "coordinated-execution-at-scale",
    excerpt: "Managing complex multi-stakeholder projects with precise communication and shared digital frameworks.",
    content: "Scale amplifies error. In large projects, a 1mm deviation at the base becomes a 1m problem at the roof if not tracked...",
    coverImage: "/images/blog/coordination.jpg",
    galleryImages: [
      "/images/blog/coordination.jpg",
      "/images/blog/planning.jpg"
    ],
    categorySlug: "planning",
    readingTime: "7 min read",
    status: "published",
    featured: false,
    publishedAt: new Date('2023-12-22')
  }
];

export async function seedBlog() {
  await dbConnect();

  console.log('Seeding Blog Categories...');
  await BlogCategory.deleteMany({});
  
  const categoryMap = new Map();
  
  for (const cat of categories) {
    const existing = await BlogCategory.findOne({ slug: cat.slug });
    if (!existing) {
        const newCat = await BlogCategory.create(cat);
        categoryMap.set(cat.slug, newCat._id);
        console.log(`Created category: ${cat.name}`);
    } else {
        categoryMap.set(cat.slug, existing._id);
    }
  }

  console.log('Seeding Blog Posts...');
  await BlogPost.deleteMany({});

  for (const post of posts) {
    const categoryId = categoryMap.get(post.categorySlug);
    
    if (categoryId) {
        await BlogPost.create({
            ...post,
            category: categoryId
        });
        console.log(`Created post: ${post.title}`);
    } else {
        console.warn(`Category not found for post: ${post.title} (slug: ${post.categorySlug})`);
    }
  }

  console.log('Blog Seed Complete!');
}
