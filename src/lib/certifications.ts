export type CertificationAccent = "cisco" | "networking" | "cybersecurity" | "aws";

export type Certification = {
  slug: string;
  title: string;
  provider: string;
  issued: string;
  description: string;
  skills: string[];
  accent: CertificationAccent;
  credentialUrl?: string;
  certificateImage?: string;
};

export const certifications: Certification[] = [
  {
    slug: "ccna-introduction-to-networks",
    title: "CCNA: Introduction to Networks",
    provider: "Cisco Networking Academy",
    issued: "Mar 05, 2026",
    description:
      "Network fundamentals, Ethernet, IP addressing, connectivity, and small network configuration.",
    skills: ["Networking", "Ethernet", "IP addressing", "Connectivity"],
    accent: "cisco",
    certificateImage: "/certifications/ccna-introduction-to-networks.jpg"
  },
  {
    slug: "ccna-switching-routing-wireless-essentials",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    provider: "Cisco Networking Academy",
    issued: "Mar 09, 2026",
    description:
      "VLANs, inter-VLAN routing, switching security, WLANs, and IPv4/IPv6 routing.",
    skills: ["VLANs", "Routing", "Switching", "Wireless"],
    accent: "networking",
    certificateImage: "/certifications/ccna-switching-routing-wireless-essentials.jpg"
  },
  {
    slug: "introduction-to-cybersecurity",
    title: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    issued: "Mar 27, 2026",
    description:
      "Introductory cybersecurity knowledge covering cyber threats, vulnerabilities, threat detection, privacy, and data confidentiality.",
    skills: ["Cybersecurity", "Threat Detection", "Network Vulnerabilities", "Privacy"],
    accent: "cybersecurity",
    certificateImage: "/certifications/introduction-to-cybersecurity.jpg"
  },
  {
    slug: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate - Cloud Foundations",
    provider: "AWS Academy / Amazon Web Services Training and Certification",
    issued: "2026",
    description:
      "Cloud foundations training covering AWS architecture, cloud concepts, core services, pricing, and support.",
    skills: ["AWS Cloud", "AWS Architecture", "Core Services", "Pricing"],
    accent: "aws",
    certificateImage: "/certifications/aws-academy-cloud-foundations.jpg"
  }
];

export const getCertificationBySlug = (slug: string) =>
  certifications.find((certification) => certification.slug === slug);
