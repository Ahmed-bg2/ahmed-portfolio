import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type ExperienceItem = {
  role: string;
  company: string;
  companyFullName?: string;
  logoSrc?: string;
  logoFit?: "contain" | "cover";
  period: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  accent: string;
  accentText: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  technologies: string[];
  accent: string;
  featured?: boolean;
  previewImage?: string;
  logoImage?: string;
  cardLogoImage?: string;
  coverStyle?: "screenshot" | "brand";
  status: string;
  year: string;
  clientNote?: string;
  details: string[];
  aiCenter?: {
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  gallery: {
    title: string;
    description: string;
    src?: string;
    secondarySrc?: string;
    frame?: "wide" | "square" | "portrait" | "confirmation";
  }[];
};

export const profile = {
  name: "Ahmed Ben Elghali",
  title: "Full-Stack Developer & Computer Engineering Student",
  intro:
    "Building modern digital products with clean design, reliable systems, and an AI-oriented mindset.",
  about:
    "I am a Computer Engineering student passionate about full-stack development, clean interfaces, and scalable web systems. I enjoy building real-world platforms such as ERP systems, booking applications, and school management tools.",
  email: "mailto:AhmedBenelghali@protonmail.com",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Ahmed-bg2",
      icon: Github
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ahmed-ben-elghali-6aaaa729b/",
      icon: Linkedin
    },
    {
      label: "Contact",
      href: "mailto:AhmedBenelghali@protonmail.com",
      icon: Mail
    }
  ] satisfies SocialLink[]
};

export const experiences: ExperienceItem[] = [
  {
    role: "Full-Stack Developer Intern",
    company: "SBI",
    companyFullName: "Sté Belghali Informatique",
    logoSrc: "/logos/sbi.png",
    logoFit: "cover",
    period: "Jun 2025 - Aug 2025",
    title: "FixiTechPRO ERP Platform",
    description:
      "Developed FixiTechPRO, a web ERP platform for repair shop management and business process digitization.",
    highlights: [
      "Built responsive interfaces using React, Next.js, and TailwindCSS.",
      "Worked on repair workflows, customer management, and operational tracking.",
      "Helped digitize business processes through structured full-stack features."
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Supabase", "TypeScript"],
    accent: "from-blue-500 via-cyan-300 to-emerald-400",
    accentText: "text-emerald-100"
  },
  {
    role: "Software Engineering Student",
    company: "EPI Digital School",
    logoSrc: "/logos/epi.png",
    period: "2023 - 2028",
    title: "Software Engineering Studies",
    description:
      "Pursuing a degree at EPI Digital School, where I build software engineering foundations through practical academic work.",
    highlights: [
      "Pursuing a degree at EPI Digital School.",
      "Focused coursework in Full-Stack Development, with a specialty in Artificial Intelligence.",
      "Engaged in hands-on academic projects blending software architecture with practical problem solving."
    ],
    technologies: ["Full-Stack Development", "Artificial Intelligence", "Software Architecture", "Academic Projects"],
    accent: "from-fuchsia-400 via-cyan-300 to-blue-500",
    accentText: "text-cyan-100"
  }
];

export const projects: Project[] = [
  {
    slug: "fixitechpro",
    name: "FixiTechPRO",
    description:
      "AI-first B2B SaaS ERP platform dedicated to GSM and PC repair centers.",
    longDescription:
      "FixiTechPRO is an AI-first B2B SaaS ERP platform dedicated to GSM and PC repair centers. Built in collaboration with a project partner on a modern stack with Next.js 14, Supabase, and TypeScript, it orchestrates repair workflows and transforms every business interaction into structured, actionable data.",
    technologies: ["Next.js 14", "Supabase", "TypeScript"],
    accent: "from-cyan-300 to-blue-500",
    featured: true,
    previewImage: "/projects/fixitechpro/landing.png",
    status: "Deployed and used by clients",
    year: "2025",
    clientNote: "Built with a project partner and used by repair-shop clients.",
    details: [
      "Designed for real repair shop workflows, including device intake, repair status tracking, and customer management.",
      "Built with a responsive interface so teams can manage operations from desktop and smaller screens.",
      "Supports business process digitization by replacing manual tracking with structured operational data."
    ],
    aiCenter: {
      title: "Advanced AI Analysis Center",
      description:
        "FixiTechPRO includes an AI center that analyzes workshop performance in real time. It helps business owners understand operational health, identify critical issues, monitor productivity, detect anomalies, predict next week's activity, and anticipate stock or workflow problems before they affect daily operations.",
      image: "/projects/fixitechpro/analytics.png",
      features: [
        "Business health score based on multiple performance vectors.",
        "Next-week activity prediction with alerts for stock, productivity, clients, and anomalies.",
        "Strategic dashboard that turns operational data into clear decisions.",
        "Real-time indicators designed for repair shop managers."
      ]
    },
    gallery: [
      {
        title: "Operations dashboard",
        description: "A central view for monitoring repair activity, customers, and workflow status.",
        src: "/projects/fixitechpro/dashboard.png"
      },
      {
        title: "Point of sale",
        description: "Smart checkout interface for products, services, cart management, and daily sales.",
        src: "/projects/fixitechpro/point-of-sale.png"
      },
      {
        title: "Advanced analytics",
        description: "AI-oriented business analysis screens for health score, stock, productivity, and alerts.",
        src: "/projects/fixitechpro/analytics.png"
      },
      {
        title: "Landing page",
        description: "Public product page presenting the deployed ERP platform and digital cockpit positioning.",
        src: "/projects/fixitechpro/landing.png"
      }
    ]
  },
  {
    slug: "schoolpro",
    name: "SchoolPro",
    description:
      "School management platform for students, classes, grades, and academic administration.",
    longDescription:
      "SchoolPro is a role-based academic management platform designed to simplify school administration and provide students with direct access to their academic information.",
    technologies: ["PHP", "SQL", "JavaScript"],
    accent: "from-sky-300 to-indigo-500",
    previewImage: "/projects/SchoolPro/dashbord-admin.png",
    logoImage: "/projects/SchoolPro/logo.png",
    status: "Academic Platform",
    year: "2025",
    details: [
      "Organizes students, classes, grades, and school administration data.",
      "Focuses on clear workflows for academic staff and daily administration.",
      "Built as a practical full-stack project using classic web technologies."
    ],
    gallery: [
      {
        title: "Admin dashboard",
        description: "Main administration dashboard for managing SchoolPro academic operations.",
        src: "/projects/SchoolPro/dashbord-admin.png"
      },
      {
        title: "Class management",
        description: "Administrative views for classes and school structure."
      },
      {
        title: "Grades overview",
        description: "Clean layouts for grade and academic data visibility."
      }
    ]
  },
  {
    slug: "kia-appointment-booking-system",
    name: "KIA Appointment Booking System",
    description:
      "Flask web platform for KIA Tunisia maintenance appointments, OCR document extraction, OTP confirmation, and role-based dashboards.",
    longDescription:
      "Platform for managing KIA Tunisia maintenance appointments through OCR document processing, OTP validation, agency selection and operational dashboards.",
    technologies: ["Python", "Flask", "SQLite", "OCR", "Twilio SMS"],
    accent: "from-teal-300 to-cyan-500",
    previewImage: "/projects/KIA Appointment Booking System/back.png",
    cardLogoImage: "/projects/KIA Appointment Booking System/logo.png",
    coverStyle: "brand",
    status: "Booking system",
    year: "2025",
    details: [
      "Clients choose a KIA agency, upload vehicle and identity documents, then complete a maintenance appointment request.",
      "Back-office and front-office roles manage appointments, slots, agencies, and reception workflows from dedicated dashboards.",
      "OCR with pytesseract and Pillow extracts vehicle/client data, while Twilio SMS OTP secures appointment confirmation."
    ],
    gallery: [
      {
        title: "Agency booking flow",
        description: "Interactive agency selection before OCR and appointment reservation.",
        src: "/projects/KIA Appointment Booking System/Capture d'écran 2026-05-30 235706.png",
        frame: "wide"
      },
      {
        title: "OCR document upload",
        description: "Carte grise and CIN upload flow before extracting client and vehicle data.",
        src: "/projects/KIA Appointment Booking System/Capture d'écran 2026-05-31 000842.png",
        frame: "wide"
      },
      {
        title: "Client dashboard",
        description: "Client path for choosing an agency and continuing toward document OCR.",
        src: "/projects/KIA Appointment Booking System/dashbord.png",
        frame: "square"
      },
      {
        title: "OTP and SMS confirmation",
        description: "In-app OTP verification paired with the Twilio SMS received by the client.",
        src: "/projects/KIA Appointment Booking System/otp.png",
        secondarySrc: "/projects/KIA Appointment Booking System/sms.png",
        frame: "confirmation"
      },
      {
        title: "Back-office dashboard",
        description: "Administrative view for appointments, slots, agencies, and operational metrics.",
        src: "/projects/KIA Appointment Booking System/back.png",
        frame: "square"
      },
      {
        title: "Front-office reception",
        description: "Reception dashboard for today's appointments, search, filters, and quick status actions.",
        src: "/projects/KIA Appointment Booking System/front.png",
        frame: "square"
      }
    ]
  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" }
];

export const contactHighlights = [
  "Email: AhmedBenelghali@protonmail.com",
  "GitHub: github.com/Ahmed-bg2",
  "LinkedIn: Ahmed Ben Elghali",
  "Available for internships and collaborations"
];
