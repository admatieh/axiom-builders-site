export interface ComingSoonData {
  badge: string;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref: string;
}

export const blogComingSoon: ComingSoonData = {
  badge: "Perspective",
  title: "Industry Insights & Perspectives",
  message:
    "We are currently structuring our editorial platform to share technical insights on construction precision, material innovation, and urban development. Check back soon for our first release.",
  buttonLabel: "Go Home",
  buttonHref: "/",
};

export const projectsComingSoon: ComingSoonData = {
  badge: "Portfolio",
  title: "The Project Archive",
  message:
    "Our comprehensive gallery of commercial, residential, and mixed-use developments is being compiled into a high-fidelity digital archive. Our signature delivery remains visible on-site throughout the urban landscape.",
  buttonLabel: "Go Home",
  buttonHref: "/",
};