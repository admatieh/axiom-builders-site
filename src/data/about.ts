import { NavLink } from "./home";

export interface ValueCard {
  title: string;
  description: string;
}

export interface AboutData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
  };
  story: {
    badge: string;
    title: string;
    content: string[];
  };
  philosophy: {
    mission: {
      title: string;
      content: string;
    };
    vision: {
      title: string;
      content: string;
    };
  };
  values: {
    badge: string;
    title: string;
    items: ValueCard[];
  };
  whyUs: {
    badge: string;
    title: string;
    items: string[];
  };
  stats: {
    badge: string;
    title: string;
    description: string;
    items: { value: string; suffix: string; label: string }[];
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    sectors: string[];
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
  };
}

export const aboutData: AboutData = {
  hero: {
    badge: "About Axiom Builders",
    headline: "Built on Precision. Defined by Delivery.",
    subheadline: "Axiom Builders is a construction and development firm focused on disciplined execution, structural clarity, and long-term project value across commercial, residential, and mixed-use environments.",
  },
  story: {
    badge: "Our Narrative",
    title: "Engineering the Future of Built Environments",
    content: [
      "Axiom Builders approaches construction as a system of planning, coordination, and controlled execution. From early feasibility and design alignment through site delivery and handover, the firm works with a long-view mindset centered on build quality, material discipline, and measurable outcomes.",
      "We believe that premium construction requires more than just labor—it requires technical intelligence and structural integrity at every layer of the process.",
    ],
  },
  philosophy: {
    mission: {
      title: "Our Mission",
      content: "To deliver architecturally ambitious spaces through disciplined construction, technical coordination, and dependable project execution.",
    },
    vision: {
      title: "Our Vision",
      content: "To shape modern built environments through precision, clarity, and a long-range approach to development.",
    },
  },
  values: {
    badge: "Core Principles",
    title: "The Axiom Standard",
    items: [
      {
        title: "Precision",
        description: "Every detail is approached with planning discipline and execution control.",
      },
      {
        title: "Accountability",
        description: "Clear coordination, reliable communication, and measurable delivery standards.",
      },
      {
        title: "Quality",
        description: "Material integrity, finishing standards, and long-term performance matter at every phase.",
      },
      {
        title: "Collaboration",
        description: "Strong outcomes are built through alignment across clients, consultants, and site teams.",
      },
      {
        title: "Longevity",
        description: "We focus on spaces that perform well over time, not just on launch day.",
      },
    ],
  },
  whyUs: {
    badge: "Strategic Advantage",
    title: "Why Clients Partner with Axiom",
    items: [
      "Design-led project thinking",
      "Disciplined planning and coordination",
      "Experience across primary sectors",
      "Strong execution standards",
      "Clear communication and delivery oversight",
      "Focus on long-term asset value",
    ],
  },
  stats: {
    badge: "Operational Snapshot",
    title: "A Legacy of Performance",
    description: "Measured success across decades of delivery and millions of square feet of realized architectural vision.",
    items: [
      { value: "12", suffix: "+", label: "Years of Practice" },
      { value: "180", suffix: "+", label: "Completed Projects" },
      { value: "2.4", suffix: "M+", label: "Sq Ft Delivered" },
      { value: "6", suffix: "", label: "Cities Served" },
    ],
  },
  cta: {
    badge: "Build With Confidence",
    title: "Start Your Next Project with Axiom Builders",
    description: "Partner with a team that brings together planning discipline, construction precision, and design-led delivery across every phase of the build.",
    sectors: ["Commercial", "Residential", "Mixed-Use", "Institutional"],
    primaryButton: { label: "View Services", href: "/services" },
    secondaryButton: { label: "Contact Us", href: "/contact" },
  },
};
