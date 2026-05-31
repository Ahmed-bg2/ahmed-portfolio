import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Code2, ExternalLink, GraduationCap, LayoutDashboard } from "lucide-react";
import { KiaJourneyShowcase } from "@/components/projects/kia-journey-showcase";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { getProjectBySlug, projects } from "@/lib/portfolio";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type CaseStudyCard = {
  title: string;
  description: string;
};

const fixiTechCaseStudy: CaseStudyCard[] = [
  {
    title: "Problem",
    description:
      "Repair shops often manage customers, devices, payments, and interventions manually, which creates delays and poor visibility."
  },
  {
    title: "Solution",
    description:
      "FixiTechPRO centralizes repair workflows, point of sale, inventory, customers, and analytics in one modern ERP platform."
  },
  {
    title: "Impact",
    description:
      "The platform helps teams track operations faster, structure business data, and make better daily decisions."
  }
];

const fixiTechGallery = [
  {
    title: "Operations Dashboard",
    description: "A clear operational cockpit for repair activity, customer flow, and daily workflow visibility.",
    src: "/projects/fixitechpro/dashboard.png"
  },
  {
    title: "Point of Sale",
    description: "A focused checkout workspace for services, products, payments, and commercial operations.",
    src: "/projects/fixitechpro/point-of-sale.png"
  },
  {
    title: "Advanced Analytics",
    description: "AI-oriented indicators that help managers read performance, alerts, and business health faster.",
    src: "/projects/fixitechpro/analytics.png"
  },
  {
    title: "Landing Page",
    description: "A product-facing page presenting the ERP value proposition for repair-center clients.",
    src: "/projects/fixitechpro/landing.png"
  }
];

const schoolProModules = [
  {
    title: "Administrator Dashboard",
    description:
      "Central workspace for managing school operations, academic records, and administrative data.",
    icon: LayoutDashboard,
    image: "/projects/SchoolPro/dashbord-admin.png",
    features: [
      "Student management",
      "Class management",
      "Subject management",
      "Grades and reports",
      "Attendance tracking"
    ]
  },
  {
    title: "Student Portal",
    description:
      "Dedicated student space for accessing academic information and tracking personal progress.",
    icon: GraduationCap,
    image: "/projects/SchoolPro/dashbord-etd.png",
    features: [
      "View grades",
      "View attendance",
      "Access academic information",
      "Track academic progress"
    ]
  }
];

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: `${project.name} | Ahmed Ben Elghali`,
    description: project.description
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isFixiTech = project.slug === "fixitechpro";
  const isSchoolPro = project.slug === "schoolpro";
  const isKia = project.slug === "kia-appointment-booking-system";
  const featuredImage = project.previewImage ?? project.gallery[0]?.src;
  const gallery = isFixiTech ? fixiTechGallery : project.gallery.filter((item) => item.src);
  const kiaWorkflow = gallery;
  const caseStudyCards = isFixiTech
    ? fixiTechCaseStudy
    : project.details.map((detail, index) => ({
        title: ["Problem", "Solution", "Impact"][index] ?? "Detail",
        description: detail
      }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <AnimatedBackground />
      <section className="section-shell relative z-10 pb-10 pt-24 sm:pb-14 sm:pt-28">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-200/35 hover:text-cyan-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-emerald-300/[0.18] bg-emerald-300/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                {project.status}
              </span>
              <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                {project.year}
              </span>
            </div>

            <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {project.longDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-cyan-200/[0.16] bg-cyan-200/[0.07] px-3 py-1 text-xs font-medium text-cyan-50"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <CaseStudyButton
                href={isKia ? "#kia-workflow" : "#featured-preview"}
                icon={ExternalLink}
                label={isKia ? "View workflow" : "View project"}
                primary
              />
              <CaseStudyButton href="https://github.com/Ahmed-bg2" icon={Code2} label="Source code" external />
              <CaseStudyButton
                href={isKia ? "#kia-features" : "#case-study"}
                icon={BookOpen}
                label={isKia ? "Features" : "Case study"}
              />
            </div>
          </div>

          <FeaturedScreenshot
            id="featured-preview"
            title={project.gallery[0]?.title ?? project.name}
            description={project.gallery[0]?.description ?? project.description}
            src={featuredImage}
            variant={isSchoolPro || isKia ? "saas" : "default"}
          />
        </section>

        {isSchoolPro ? (
          <section className="mt-10 sm:mt-12" aria-labelledby="platform-modules-title">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                Role-Based Platform
              </p>
              <h2 id="platform-modules-title" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Platform Modules
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                SchoolPro separates administrative control from student access, making the platform clear for each user role.
              </p>
            </div>

            <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-2">
              {schoolProModules.map((module) => (
                <PlatformModuleCard key={module.title} {...module} />
              ))}
            </div>
          </section>
        ) : isKia ? (
          <KiaJourneyShowcase screenshots={kiaWorkflow} />
        ) : (
          <section className="mt-12" aria-labelledby="gallery-title">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                  Product Screens
                </p>
                <h2 id="gallery-title" className="mt-2 text-3xl font-semibold tracking-tight text-white">
                  Clear views of the SaaS workflow
                </h2>
              </div>
            </div>

            <div className="grid gap-5 pb-4 sm:flex sm:overflow-x-auto sm:[scrollbar-color:rgba(103,232,249,0.35)_transparent]">
              {gallery.map((item) => (
                <ScreenshotCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  src={item.src}
                />
              ))}
            </div>
          </section>
        )}

        {!isKia && (
          <section id="case-study" className="mt-12 grid gap-4 md:grid-cols-3">
            {caseStudyCards.slice(0, 3).map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-slate-950/48 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-200/25 hover:bg-cyan-100/[0.045]"
              >
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </section>
        )}

        {project.aiCenter && (
          <section className="mt-12 overflow-hidden rounded-3xl border border-cyan-200/[0.12] bg-slate-950/50 p-5 backdrop-blur-xl sm:p-7">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
                  Intelligence Engine
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {project.aiCenter.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                  {project.aiCenter.description}
                </p>
              </div>

              <div className="max-w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2">
                <Image
                  src={project.aiCenter.image}
                  alt={project.aiCenter.title}
                  width={1500}
                  height={900}
                  className="h-auto w-full max-w-full rounded-xl object-contain object-center brightness-110 contrast-[1.04]"
                />
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function CaseStudyButton({
  href,
  icon: Icon,
  label,
  primary = false,
  external = false
}: {
  href: string;
  icon: typeof ArrowUpRight;
  label: string;
  primary?: boolean;
  external?: boolean;
}) {
  const className = primary
    ? "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-200 via-sky-300 to-fuchsia-300 px-5 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-[1.02] hover:brightness-110 sm:w-auto"
    : "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 text-sm font-medium text-slate-200 transition duration-300 hover:scale-[1.02] hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] hover:text-cyan-50 sm:w-auto";

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={className}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

function FeaturedScreenshot({
  id,
  title,
  description,
  src,
  variant = "default"
}: {
  id: string;
  title: string;
  description: string;
  src?: string;
  variant?: "default" | "saas";
}) {
  const isSaas = variant === "saas";

  return (
    <article
      id={id}
      className={
        isSaas
          ? "max-w-full overflow-hidden rounded-[1.75rem] border border-cyan-100/20 bg-slate-950/30 p-2.5 shadow-[0_0_80px_rgba(34,211,238,0.16)] backdrop-blur-xl"
          : "max-w-full overflow-hidden rounded-3xl border border-cyan-200/[0.16] bg-slate-950/45 p-3 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl"
      }
    >
      <div
        className={
          isSaas
            ? "grid max-w-full place-items-center overflow-hidden rounded-[1.35rem] border border-white/15 bg-slate-900/80 p-1.5"
            : "grid max-w-full place-items-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-2"
        }
      >
        {src ? (
          <Image
            src={src}
            alt={title}
            width={1700}
            height={1050}
            priority
            className={
              isSaas
                ? "h-auto w-full max-w-full rounded-2xl object-contain object-center brightness-125 contrast-110 saturate-110 transition duration-500 sm:aspect-[1915/932]"
                : "h-auto w-full max-w-full rounded-xl object-contain object-center brightness-110 contrast-[1.04] transition duration-500 sm:aspect-[16/10]"
            }
          />
        ) : (
          <div className="aspect-[16/10] rounded-xl bg-cyan-100/[0.06]" />
        )}
      </div>
      <div className="px-2 pb-2 pt-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      </div>
    </article>
  );
}

function PlatformModuleCard({
  title,
  description,
  icon: Icon,
  image,
  features
}: {
  title: string;
  description: string;
  icon: typeof LayoutDashboard;
  image?: string;
  features: string[];
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-slate-950/48 p-4 shadow-[0_0_55px_rgba(124,58,237,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-cyan-100/[0.04] sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-100/20 bg-cyan-100/[0.08] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </div>

      <div className="mt-4 max-w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-slate-900/80 p-1.5">
        {image ? (
          <div className="grid max-w-full place-items-center overflow-hidden rounded-xl bg-white">
            <Image
              src={image}
              alt={title}
              width={1915}
              height={932}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-auto w-full max-w-full rounded-xl object-contain object-center brightness-125 contrast-110 saturate-110 transition duration-500 sm:aspect-[1915/932]"
            />
          </div>
        ) : (
          <div className="aspect-[1915/932] rounded-xl bg-cyan-100/[0.06]" />
        )}
      </div>

      <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <div key={feature} className="flex min-h-9 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-sm text-slate-200">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-200/15 text-cyan-100">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="leading-5">{feature}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ScreenshotCard({
  title,
  description,
  src
}: {
  title: string;
  description?: string;
  src?: string;
}) {
  return (
    <article className="group w-full min-w-0 flex-1 rounded-2xl border border-white/[0.08] bg-slate-950/45 p-3 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:shadow-[0_0_42px_rgba(34,211,238,0.13)] sm:min-w-[25rem] lg:min-w-[18rem]">
      <div className="grid max-w-full place-items-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035]">
        {src ? (
          <Image
            src={src}
            alt={title}
            width={1200}
            height={760}
            className="h-auto w-full max-w-full rounded-xl object-contain object-center brightness-110 contrast-[1.04] transition duration-500 sm:aspect-[16/10]"
          />
        ) : (
          <div className="h-56 bg-cyan-100/[0.06]" />
        )}
      </div>
      <div className="px-1 pb-1 pt-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {description && <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>}
      </div>
    </article>
  );
}
