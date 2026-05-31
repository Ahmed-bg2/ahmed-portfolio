"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/lib/portfolio";
import type { Project } from "@/lib/portfolio";
import { Section } from "@/components/ui/section";

const featuredStats = ["SaaS ERP", "AI Center", "GSM & PC Repair", "Used by clients"];

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects"
    >
      <div className="project-card-shell grid w-full max-w-full min-w-0 gap-5 overflow-hidden lg:grid-cols-6">
        {projects.map((project, index) => (
          project.featured ? (
            <FeaturedProjectCard key={project.name} project={project} index={index} />
          ) : (
            <ProjectCard key={project.name} project={project} index={index} />
          )
        ))}
      </div>
    </Section>
  );
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const imageSrc = project.previewImage ?? project.gallery[0]?.src;

  return (
    <motion.article
      className="project-card-shell group w-full max-w-full min-w-0 overflow-hidden rounded-3xl p-[1px] lg:col-span-4"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      <div className="project-card-shell relative flex h-full w-full max-w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-amber-200/[0.16] bg-slate-950/58 p-4 shadow-[0_0_70px_rgba(245,158,11,0.1)] backdrop-blur-xl transition duration-300 group-hover:border-amber-200/34 group-hover:shadow-[0_0_92px_rgba(245,158,11,0.16)] sm:p-7">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/[0.14] blur-3xl transition group-hover:bg-amber-300/[0.2]" />
        <div className="absolute -left-24 bottom-12 h-64 w-64 rounded-full bg-cyan-300/[0.07] blur-3xl" />

        <div className="project-image-frame relative w-full max-w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.035] p-2 shadow-2xl">
          {imageSrc ? (
            <div className="project-screenshot-shell relative block w-full max-w-full overflow-hidden rounded-xl bg-slate-900">
              <Image
                src={imageSrc}
                alt={`${project.name} featured screenshot`}
                width={1700}
                height={1050}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="project-screenshot-image block h-full w-full max-w-full rounded-xl object-contain object-center brightness-[1.08] contrast-[1.04] transition duration-700"
                priority={false}
              />
            </div>
          ) : (
            <ProjectPlaceholder large />
          )}
        </div>
        <p className="relative mt-3 text-xs text-white/50">
          Featured product preview with clear interface visibility.
        </p>

        <div className="relative mt-7 grid gap-6 xl:grid-cols-[1fr_auto] xl:items-start">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/[0.16] bg-amber-200/[0.07] px-3 py-1 text-xs font-medium text-amber-50">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              SaaS product case study
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {project.description}
            </p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-amber-200/[0.18] bg-amber-200/[0.075] px-4 text-sm font-medium text-amber-50 transition hover:border-amber-100/40 hover:bg-amber-200/[0.12]"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {featuredStats.map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/78"
            >
              {stat}
            </span>
          ))}
        </div>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-amber-200/[0.14] bg-amber-200/[0.06] px-3 py-1 text-xs text-amber-50/90"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imageSrc = project.logoImage ?? project.previewImage ?? project.gallery[0]?.src;
  const isLogoPreview = Boolean(project.logoImage);
  const isBrandCover = project.coverStyle === "brand";
  const isSchoolProCover = project.slug === "schoolpro";

  return (
    <motion.article
      className="project-card-shell group w-full max-w-full min-w-0 overflow-hidden rounded-3xl p-[1px] lg:col-span-2"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <div className="project-card-shell relative flex h-full w-full max-w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/52 p-5 backdrop-blur-xl transition duration-300 group-hover:border-white/[0.16] group-hover:bg-white/[0.045] group-hover:shadow-[0_0_54px_rgba(15,23,42,0.45)] sm:min-h-[27rem] sm:p-6">
        <div className={`absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br ${project.accent} opacity-[0.13] blur-3xl transition group-hover:opacity-[0.22]`} />

        <div className="project-image-frame relative mb-6 w-full max-w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-2">
          {isSchoolProCover ? (
            <SchoolProProductCover />
          ) : isBrandCover ? (
            <BrandProjectCover projectName={project.name} />
          ) : imageSrc ? (
            <div className={isLogoPreview ? "project-screenshot-shell relative block w-full max-w-full overflow-hidden rounded-xl bg-slate-100" : "project-screenshot-shell relative block w-full max-w-full overflow-hidden rounded-xl bg-slate-900"}>
              <Image
                src={imageSrc}
                alt={isLogoPreview ? `${project.name} logo` : `${project.name} screenshot`}
                width={1200}
                height={760}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className={
                  isLogoPreview
                    ? "project-screenshot-image block h-full w-full max-w-full object-contain object-center brightness-110 contrast-110 transition duration-500"
                    : "project-screenshot-image block h-full w-full max-w-full rounded-xl object-contain object-center brightness-[1.05] transition duration-500"
                }
              />
            </div>
          ) : (
            <ProjectPlaceholder />
          )}
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.045] px-3 py-1 text-xs font-medium text-white/76">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Platform
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{project.name}</h3>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition group-hover:border-cyan-200/30 group-hover:text-cyan-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 flex-1 text-sm leading-7 text-white/62">{project.description}</p>

        <div className="mt-7 h-px w-full hairline opacity-40" />
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-cyan-200/[0.12] bg-cyan-200/[0.055] px-3 py-1 text-xs text-cyan-50/85"
            >
              {technology}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 text-sm font-medium text-white/82 transition hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] hover:text-cyan-50"
        >
          View Details
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

function SchoolProProductCover() {
  const moduleWidgets = [
    { label: "Students", value: "1.2k", icon: Users },
    { label: "Classes", value: "42", icon: BookOpen },
    { label: "Grades", value: "A+", icon: GraduationCap },
    { label: "Attendance", value: "96%", icon: CalendarCheck }
  ];

  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-cyan-100/20 bg-[radial-gradient(circle_at_24%_22%,rgba(34,211,238,0.35),transparent_27%),radial-gradient(circle_at_86%_16%,rgba(129,140,248,0.38),transparent_30%),linear-gradient(135deg,#071126_0%,#11175a_48%,#071126_100%)] shadow-[0_0_52px_rgba(34,211,238,0.16)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_32%,rgba(34,211,238,0.1)_68%,transparent)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.18),transparent_38%)]" />
      <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-cyan-300/24 blur-3xl" />
      <div className="absolute -bottom-16 right-2 h-36 w-36 rounded-full bg-indigo-400/28 blur-3xl" />

      <div className="absolute left-4 top-4 flex items-start gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-100/30 bg-white/[0.12] text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_0_34px_rgba(34,211,238,0.28)] backdrop-blur-xl">
          <GraduationCap className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="pt-0.5">
          <h4 className="text-2xl font-semibold text-white">SchoolPro</h4>
          <p className="mt-0.5 text-[0.68rem] font-medium text-cyan-50/78">
            Academic Management Platform
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-cyan-100/22 bg-cyan-100/[0.12] px-2 py-1 text-[0.6rem] font-semibold text-cyan-50">
              Admin Dashboard
            </span>
            <span className="rounded-full border border-indigo-100/22 bg-indigo-100/[0.12] px-2 py-1 text-[0.6rem] font-semibold text-indigo-50">
              Student Portal
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-3 top-4 w-[7.5rem] rounded-2xl border border-white/16 bg-white/[0.11] p-2 shadow-[0_18px_45px_rgba(2,6,23,0.3)] backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[0.58rem] font-semibold text-white/82">
            <LayoutDashboard className="h-3 w-3 text-cyan-100" aria-hidden="true" />
            Live Console
          </div>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
        </div>
        <div className="grid gap-1.5">
          <div className="h-2 rounded-full bg-cyan-100/55" />
          <div className="h-2 w-4/5 rounded-full bg-white/18" />
          <div className="mt-1 grid grid-cols-3 items-end gap-1.5">
            <span className="h-8 rounded-md bg-cyan-300/45" />
            <span className="h-11 rounded-md bg-indigo-300/50" />
            <span className="h-6 rounded-md bg-sky-200/42" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 grid grid-cols-4 gap-1.5">
        {moduleWidgets.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="min-w-0 rounded-xl border border-white/13 bg-white/[0.09] px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
          >
            <div className="mb-1 flex items-center justify-between gap-1">
              <Icon className="h-3 w-3 shrink-0 text-cyan-100" aria-hidden="true" />
              <span className="text-[0.58rem] font-semibold text-white">{value}</span>
            </div>
            <p className="truncate text-[0.56rem] font-medium text-cyan-50/76">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandProjectCover({ projectName }: { projectName: string }) {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-cyan-100/[0.12] bg-[#07111f] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_44px_rgba(34,211,238,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(168,85,247,0.14),transparent_32%),radial-gradient(circle_at_50%_54%,rgba(239,68,68,0.09),transparent_35%),linear-gradient(135deg,#08111f_0%,#101b31_48%,#07101d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.09),transparent_33%,rgba(34,211,238,0.07)_68%,transparent)] opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-28 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.12] blur-3xl" />
      <div className="absolute -right-14 bottom-0 h-32 w-60 rounded-full bg-cyan-300/[0.08] blur-3xl" />

      <div className="absolute inset-5 rounded-2xl border border-white/[0.11] bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_34px_rgba(125,211,252,0.035),0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl" />
      <div
        aria-label={`${projectName} logo`}
        className="absolute left-1/2 top-1/2 grid h-28 w-[15.25rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-100/[0.18] bg-slate-950/45 px-9 shadow-[0_0_32px_rgba(239,68,68,0.14),0_18px_54px_rgba(2,6,23,0.44),inset_0_0_30px_rgba(255,255,255,0.055)] backdrop-blur-xl"
      >
        <span className="text-[4.65rem] font-black leading-none tracking-[0.02em] text-white drop-shadow-[0_0_16px_rgba(125,211,252,0.16)]">
          KIA
        </span>
      </div>
    </div>
  );
}

function ProjectPlaceholder({ large = false }: { large?: boolean }) {
  return (
    <div className={large ? "p-5" : "p-4"}>
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
      </div>
      <div className="grid gap-3">
        <div className="h-3 rounded-full bg-white/[0.08]" />
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 h-20 rounded-xl border border-cyan-200/[0.12] bg-cyan-200/[0.055]" />
          <div className="h-20 rounded-xl border border-fuchsia-200/[0.1] bg-fuchsia-200/[0.04]" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }, (_, mockIndex) => (
            <div
              key={mockIndex}
              className="h-10 rounded-lg border border-white/[0.06] bg-white/[0.035]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
