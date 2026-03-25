export interface ContactData {
  hero: {
    badge: string;
    title: string;
    subheadline: string;
  };
  info: {
    emails: string[];
    phones: string[];
    address: string[];
    socials: { label: string; href: string }[];
  };
  form: {
    title: string;
    description: string;
    trustNote: string;
    buttonLabel: string;
  };
  location: {
    badge: string;
    title: string;
    description: string;
    coordinates: { lat: number; lng: number };
  };
}

export const contactData: ContactData = {
  hero: {
    badge: "Inquiry",
    title: "Initiate Your Project Sequence",
    subheadline:
      "Connect with Axiom Builders to discuss technical coordination, site feasibility, or full-spectrum construction delivery for your next development.",
  },
  info: {
    emails: ["hello@axiom.build", "partnerships@axiom.build"],
    phones: ["+1 (800) 555-0199", "+1 (212) 555-0128"],
    address: [
      "245 Urban Axis Boulevard",
      "Downtown Development District",
      "New York, NY 10001",
    ],
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X (Twitter)", href: "#" },
    ],
  },
  form: {
    title: "Submit Project Brief",
    description:
      "Provide the initial parameters of your project, and our coordination team will review the technical requirements before initial contact.",
    trustNote:
      "Your message will be sent directly to our team, and we will respond using the email address you provide.",
    buttonLabel: "Submit Brief",
  },
  location: {
    badge: "Headquarters",
    title: "Global Operations Center",
    description:
      "Centrally positioned in the Downtown Development District, serving as the core coordination hub for our cross-sector construction delivery.",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
};