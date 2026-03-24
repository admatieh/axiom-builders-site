export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  endTitle: string;
  endHighlight: string;
}

export interface Metric {
  value: string;
  suffix: string;
  label: string;
  description: string;
}

export interface Service {
  num: string;
  title: string;
  desc: string;
  icon: string;
  marginTop: string;
}

export interface Project {
  badge: string;
  name: string;
  tagline: string;
  description: string;
  description2: string;
  metrics: { label: string; value: string }[];
  id: string;
  assetName: string;
  status: string;
  category: string;
  tags: string[];
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  tone: string;
}

export interface HomeData {
  companyName: {
    first: string;
    last: string;
  };
  navItems: NavLink[];
  hero: HeroContent;
  aboutPreview: {
    badge: string;
    title: string;
    description1: string;
    description2: string;
    metrics: { label: string; value: string }[];
    ctaText: string;
  };
  trustedBy: {
    badge: string;
    title: string;
    description: string;
    sectors: string[];
  };
  services: {
    badge: string;
    title: string;
    description: string;
    items: Service[];
  };
  featuredProject: Project;
  metrics: {
    badge: string;
    title: string;
    description: string;
    items: Metric[];
  };
  process: {
    badge: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    sectors: string[];
    buttonText: string;
  };
  footer: {
    description: string;
    stats: { label: string; value: string }[];
    links: NavLink[];
    contact: {
      email: string;
      phone: string;
      address: string[];
      status: string;
    };
  };
}

export const homeData: HomeData = {
  companyName: {
    first: "Axiom",
    last: "Builders",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  hero: {
    badge: "Architecture & Construction",
    headline: "Precision Construction.",
    subheadline: "Leading-edge delivery for commercial, residential, and mixed-use developments through structural excellence and material discipline.",
    ctaText: "Explore Projects",
    endTitle: "Structural",
    endHighlight: "Precision",
  },
  trustedBy: {
    badge: "Sector Expertise",
    title: "The Standard of Delivery",
    description: "Partnering with leading developers and institutional clients to deliver high-performance assets across primary sectors.",
    sectors: [
      "Private Developers",
      "Property Owners",
      "Hospitality Brands",
      "Corporate Clients",
      "Institutional Partners",
    ],
  },
  aboutPreview: {
    badge: "The Firm",
    title: "Engineering the Future of Built Environments",
    description1: "Axiom Builders is a premier construction firm dedicated to structural clarity, delivery discipline, and design-led execution.",
    description2: "We specialize in complex urban developments where site control, technical coordination, and material quality are paramount to project success.",
    metrics: [
      { label: "Practice", value: "12+ Years" },
      { label: "Projects", value: "180+" },
      { label: "Built Area", value: "2.4M+ Sq Ft" },
    ],
    ctaText: "About Axiom",
  },
  services: {
    badge: "Our Capability",
    title: "Integrated Delivery.",
    description: "Full-spectrum construction services structured as a unified executive system—from core shell development to final interior handovers.",
    items: [
      {
        num: "01",
        title: "Interior Fit-Out",
        desc: "Specialized execution of high-end commercial and residential interiors with focused material procurement.",
        icon: "/icons/interior.png",
        marginTop: "mt-0",
      },
      {
        num: "02",
        title: "General Construction",
        desc: "Comprehensive site deployment and structural management for large-scale developments.",
        icon: "/icons/construction.png",
        marginTop: "mt-10 md:mt-20",
      },
      {
        num: "03",
        title: "Facade Systems",
        desc: "Technical installation of high-performance envelopes, glazing, and architectural structural systems.",
        icon: "/icons/exterior.png",
        marginTop: "mt-20 md:mt-40",
      },
    ],
  },
  featuredProject: {
    badge: "Featured Work",
    name: "The Genesis Tower",
    tagline: "Mixed-Use Development",
    description: "Our flagship mixed-use high-rise, designed to redefine the urban edge through layered steel geometry, high-performance facade systems, and integrated public-facing ground-level programming.",
    description2: "Developed as a benchmark project, Genesis Tower combines architectural expression with delivery discipline, balancing structural efficiency, premium materiality, and long-range city presence.",
    metrics: [
      { label: "Levels", value: "32" },
      { label: "Sq Ft Gross Area", value: "410K" },
      { label: "Program Type", value: "Mixed-Use" },
    ],
    id: "PROJECT_0942",
    assetName: "GENESIS_TWR",
    status: "FEATURED",
    category: "Urban Core Prototype",
    tags: ["Steel", "Glass", "Public Interface"],
  },
  metrics: {
    badge: "Operational Scale",
    title: "Measured Success.",
    description: "Quantified performance across capital deployment, delivery volume, and cross-sector recognition.",
    items: [
      {
        value: "4.2",
        suffix: "B",
        label: "Capital Deployed",
        description: "Strategic project value managed across our portfolio of active and completed developments.",
      },
      {
        value: "18",
        suffix: "M",
        label: "Sq Ft Constructed",
        description: "Total build area delivered across commercial, residential, and institutional programs.",
      },
      {
        value: "24",
        suffix: "+",
        label: "Industry Awards",
        description: "Recognition for execution quality, site safety standards, and project coordination.",
      },
      {
        value: "0",
        suffix: "%",
        label: "Delivery Delay",
        description: "Our core commitment to rigorous scheduling, site control, and disciplined sequence management.",
      },
    ],
  },
  process: {
    badge: "Methodology",
    title: "Controlled Execution.",
    description: "A process system built like construction itself—layered, locked, and assembled with discipline from concept through final delivery.",
    steps: [
      {
        num: "01",
        title: "Conceptualization",
        desc: "Rigorous planning, feasibility analysis, spatial studies, and early blueprint alignment before site activity begins.",
        tone: "Planning Block",
      },
      {
        num: "02",
        title: "Engineering",
        desc: "Structural calculations, systems coordination, material strategy, and technical detailing built for execution confidence.",
        tone: "Technical Block",
      },
      {
        num: "03",
        title: "Execution",
        desc: "Disciplined on-site deployment with controlled sequencing, supervision, and measurable construction precision.",
        tone: "Site Block",
      },
      {
        num: "04",
        title: "Completion",
        desc: "Quality validation, systems review, final finishing control, and handover structured around long-term performance.",
        tone: "Delivery Block",
      },
    ],
  },
  cta: {
    badge: "Project Inquiry",
    title: "Initiate Project.",
    description: "Partner with Axiom Builders to develop your next commercial, residential, or mixed-use project through a process defined by structural clarity, delivery control, and design-led execution.",
    sectors: ["Commercial", "Residential", "Mixed-Use", "Fit-Out"],
    buttonText: "Contact Firm",
  },
  footer: {
    description: "Premium construction and development built around structural precision, disciplined execution, and a long-view approach to architectural delivery.",
    stats: [
      { value: "12+", label: "Years Active" },
      { value: "180+", label: "Projects" },
      { value: "6", label: "Cities Served" },
    ],
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "News", href: "/news" },
    ],
    contact: {
      email: "hello@axiom.build",
      phone: "+1 (800) 555-0199",
      address: [
        "245 Urban Axis Boulevard",
        "Downtown Development District",
        "New York, NY 10001",
      ],
      status: "Open for Project Inquiries",
    },
  },
};
