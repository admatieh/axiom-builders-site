export interface ServiceDetail {
  id: string;
  num: string;
  title: string;
  intro: string;
  description: string;
  deliverables: string[];
  icon?: string;
  image: string;
}

export interface ServicesData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
  };
  intro: {
    badge: string;
    title: string;
    content: string;
  };
  mainServices: ServiceDetail[];
  values: {
    headline: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  sectors: {
    badge: string;
    title: string;
    items: string[];
  };
  processConnection: {
    title: string;
    content: string;
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
  };
}

export const servicesData: ServicesData = {
  hero: {
    badge: "Core Expertise",
    headline: "Construction Services Built on Precision",
    subheadline: "Axiom Builders delivers coordinated construction, interior, and exterior solutions across commercial, residential, hospitality, and mixed-use environments.",
  },
  intro: {
    badge: "Structural Approach",
    title: "The System of Delivery",
    content: "We approach every service through planning discipline, technical coordination, and controlled execution—ensuring each phase contributes to a stronger final result.",
  },
  mainServices: [
    {
      id: "interior-design",
      num: "01",
      title: "Interior Design",
      intro: "Spatial identity shaped through material discipline.",
      description: "Axiom Builders creates interior environments that balance visual identity, user flow, material discipline, and functional performance.",
      deliverables: [
        "Spatial Programming & Layout",
        "Material Procurement & Specification",
        "FF&E Coordination",
        "Custom Millwork Execution",
      ],
      icon: "/icons/interior.png",
      image: "/images/interior.webp",
    },
    {
      id: "construction",
      num: "02",
      title: "Construction",
      intro: "Disciplined delivery from planning to execution.",
      description: "We manage construction delivery from planning to execution with a focus on sequencing, supervision, site control, and measurable quality.",
      deliverables: [
        "Core & Shell Development",
        "Site Supervision & Safety",
        "Schedule & Sequence Control",
        "Quality Assurance Management",
      ],
      icon: "/icons/construction.png",
      image: "/images/construction.webp",
    },
    {
      id: "exterior-design",
      num: "03",
      title: "Exterior Design",
      intro: "Architectural clarity that performs over time.",
      description: "Our exterior work shapes building identity through facade systems, durable finishes, and architectural clarity that performs over time.",
      deliverables: [
        "High-Performance Envelope Systems",
        "Curtain Wall & Glazing Installation",
        "Exterior Finish Coordination",
        "Structural Facade Solutions",
      ],
      icon: "/icons/exterior.png",
      image: "/images/exterior.webp",
    },
    {
      id: "project-planning",
      num: "04",
      title: "Project Planning",
      intro: "Technical coordination built for execution confidence.",
      description: "Early-stage planning, feasibility thinking, coordination strategy, and scope definition that reduce friction during execution.",
      deliverables: [
        "Feasibility Studies",
        "Technical Coordination",
        "Budget & Cost Estimation",
        "Risk Mitigation Strategy",
      ],
      icon: "/icons/planning.png",
      image: "/images/project-planning.webp",
    },
  ],
  values: {
    headline: "What Clients Gain",
    items: [
      {
        title: "Disciplined Planning",
        description: "Front-loaded coordination that defines project success before site activity begins.",
      },
      {
        title: "Coordinated Execution",
        description: "Seamless synchronization across trades, consultants, and technical systems.",
      },
      {
        title: "Material Quality Control",
        description: "Rigorous standards for procurement, inspection, and installation of every component.",
      },
      {
        title: "Clearer Timelines",
        description: "Measurable sequencing and milestone tracking that eliminate delivery ambiguity.",
      },
      {
        title: "Long-term Asset Value",
        description: "Built-to-perform spaces that maintain operational and aesthetic value over time.",
      },
      {
        title: "Clear Communication",
        description: "Transparent updates and disciplined reporting across every project phase.",
      },
    ],
  },
  sectors: {
    badge: "Sectors",
    title: "Applications of Expertise",
    items: ["Commercial", "Residential", "Hospitality", "Institutional", "Mixed-Use"],
  },
  processConnection: {
    title: "Unified Delivery System",
    content: "From concept and technical planning through build execution and final completion, every service is integrated into one disciplined delivery system.",
  },
  cta: {
    badge: "Start the Right Build",
    title: "Let’s Plan the Next Phase of Your Project",
    description: "Talk with Axiom Builders about the services, scope, and execution strategy needed for your next commercial, residential, or mixed-use development.",
    primaryButton: { label: "Contact Us", href: "/contact" },
    secondaryButton: { label: "View Projects", href: "/projects" },
  },
};
