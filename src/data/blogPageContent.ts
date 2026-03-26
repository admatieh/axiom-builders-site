export interface BlogPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  intro: {
    title: string;
    copy: string;
  };
  featuredSection: {
    badge: string;
    title: string;
    subtitle: string;
  };
  categoriesBar: {
    title: string;
    categories: string[];
  };
  searchBox: {
    placeholder: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttons: { label: string; href: string }[];
  };
}

export const blogPageContent: BlogPageContent = {
  hero: {
    eyebrow: "Perspective",
    title: "Industry Insights & Perspectives",
    subtitle: "Technical insights on construction precision, material innovation, and urban development.",
  },
  intro: {
    title: "Welcome to the Axiom Builders Blog",
    copy: "Explore our editorial platform for deep dives into construction methodology, project updates, and thought leadership on the future of building.",
  },
  featuredSection: {
    badge: "Featured",
    title: "Spotlight Article",
    subtitle: "A highlighted perspective from our editorial team.",
  },
  categoriesBar: {
    title: "Browse by Category",
    categories: [
      "Insights",
      "Project Updates",
      "Industry Perspective",
      "Materials",
      "Planning",
      "Case Study"
    ],
  },
  searchBox: {
    placeholder: "Search articles, topics, or keywords...",
  },
  cta: {
    eyebrow: "Stay Informed",
    title: "Subscribe for Updates",
    subtitle: "Get the latest articles and project news delivered to your inbox.",
    buttons: [
      { label: "Subscribe", href: "/subscribe" },
      { label: "Contact Us", href: "/contact" }
    ],
  },
};
