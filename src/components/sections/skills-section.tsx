"use client";

import { BrainCircuit, Cloud, Code2, Database, GitBranch, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  siArduino,
  siC,
  siGit,
  siJavascript,
  siLinux,
  siN8n,
  siNextdotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import type { CSSProperties } from "react";
import { useState } from "react";
import { SectionTitle } from "@/components/ui/section";

type SkillCategory = {
  title: string;
  technologies: string[];
  icon: LucideIcon;
  accent: {
    rgb: string;
    pill: string;
  };
};

type TechnologyLogo =
  | {
      type: "simple";
      icon: SimpleIcon;
    }
  | {
      type: "lucide";
      icon: LucideIcon;
      color: string;
    };

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    technologies: ["TypeScript", "JavaScript", "Python", "Java", "C", "SQL"],
    icon: Code2,
    accent: {
      rgb: "125 211 252",
      pill: "hover:border-sky-200/35 hover:bg-sky-200/[0.085] hover:text-sky-50 hover:shadow-[0_0_24px_rgba(125,211,252,0.18)]"
    }
  },
  {
    title: "Web Technologies",
    technologies: ["React", "Next.js", "Tailwind CSS", "PHP"],
    icon: Globe2,
    accent: {
      rgb: "196 181 253",
      pill: "hover:border-violet-200/35 hover:bg-violet-200/[0.08] hover:text-violet-50 hover:shadow-[0_0_24px_rgba(196,181,253,0.17)]"
    }
  },
  {
    title: "Databases & Cloud",
    technologies: ["PostgreSQL", "Supabase", "AWS"],
    icon: Database,
    accent: {
      rgb: "52 211 153",
      pill: "hover:border-emerald-200/35 hover:bg-emerald-200/[0.08] hover:text-emerald-50 hover:shadow-[0_0_24px_rgba(52,211,153,0.17)]"
    }
  },
  {
    title: "AI & Automation",
    technologies: ["Python", "n8n Automation", "Data Models"],
    icon: BrainCircuit,
    accent: {
      rgb: "251 191 36",
      pill: "hover:border-amber-200/35 hover:bg-amber-200/[0.08] hover:text-amber-50 hover:shadow-[0_0_24px_rgba(251,191,36,0.16)]"
    }
  },
  {
    title: "Engineering Tools",
    technologies: ["Git", "Linux", "Arduino"],
    icon: GitBranch,
    accent: {
      rgb: "244 114 182",
      pill: "hover:border-pink-200/35 hover:bg-pink-200/[0.08] hover:text-pink-50 hover:shadow-[0_0_24px_rgba(244,114,182,0.16)]"
    }
  }
];

const technologyLogos: Record<string, TechnologyLogo> = {
  TypeScript: { type: "simple", icon: siTypescript },
  JavaScript: { type: "simple", icon: siJavascript },
  Python: { type: "simple", icon: siPython },
  Java: { type: "simple", icon: siOpenjdk },
  C: { type: "simple", icon: siC },
  SQL: { type: "lucide", icon: Database, color: "96 165 250" },
  React: { type: "simple", icon: siReact },
  "Next.js": { type: "simple", icon: siNextdotjs },
  "Tailwind CSS": { type: "simple", icon: siTailwindcss },
  PHP: { type: "simple", icon: siPhp },
  PostgreSQL: { type: "simple", icon: siPostgresql },
  Supabase: { type: "simple", icon: siSupabase },
  AWS: { type: "lucide", icon: Cloud, color: "251 191 36" },
  "n8n Automation": { type: "simple", icon: siN8n },
  "Data Models": { type: "lucide", icon: BrainCircuit, color: "52 211 153" },
  Git: { type: "simple", icon: siGit },
  Linux: { type: "simple", icon: siLinux },
  Arduino: { type: "simple", icon: siArduino }
};

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState(skillCategories[0].title);
  const activeCategory =
    skillCategories.find((category) => category.title === activeSkill) ?? skillCategories[0];

  return (
    <section id="skills" className="section-shell relative scroll-mt-28 py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-12 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-emerald-300/[0.012] blur-[130px]" />

      <div className="relative mx-auto max-w-[62rem]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionTitle title="Skills" />
        </motion.div>

        <div className="relative w-full">
          <div className="grid gap-6 md:grid-cols-[15.5rem_minmax(0,1fr)] md:items-start">
            <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:gap-2 md:overflow-visible md:pb-0">
              {skillCategories.map((category) => (
                <SkillTab
                  key={category.title}
                  category={category}
                  isActive={category.title === activeCategory.title}
                  onSelect={() => setActiveSkill(category.title)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <SkillCategoryPanel key={activeCategory.title} category={activeCategory} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillTab({
  category,
  isActive,
  onSelect
}: {
  category: SkillCategory;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      className={[
        "group relative flex shrink-0 items-center gap-3 rounded-full border px-3 py-2 text-left text-sm font-semibold text-white/56 backdrop-blur-xl transition duration-500 ease-out md:w-full md:rounded-[1.25rem]",
        isActive
          ? "border-[rgba(var(--skill-accent),0.34)] bg-[rgba(var(--skill-accent),0.075)] text-white shadow-[0_0_26px_rgba(var(--skill-accent),0.14),inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "border-white/[0.075] bg-white/[0.025] hover:border-[rgba(var(--skill-accent),0.24)] hover:bg-white/[0.04] hover:text-white/78"
      ].join(" ")}
      style={{ "--skill-accent": category.accent.rgb } as CSSProperties}
      onClick={onSelect}
      aria-pressed={isActive}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.08] bg-white/[0.035] text-[rgb(var(--skill-accent))] shadow-[0_0_16px_rgba(var(--skill-accent),0.1)] transition duration-500 group-hover:shadow-[0_0_22px_rgba(var(--skill-accent),0.16)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap">{category.title}</span>
    </button>
  );
}

function SkillCategoryPanel({ category }: { category: SkillCategory }) {
  const Icon = category.icon;

  return (
    <motion.article
      className="group relative grid gap-4 py-2 transition duration-500 ease-out hover:-translate-y-0.5 sm:grid-cols-[4.25rem_1fr] sm:items-start sm:py-2.5"
      initial={{ opacity: 0, x: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{ "--skill-accent": category.accent.rgb } as CSSProperties}
    >
      <div className="pointer-events-none absolute -left-6 top-0 h-20 w-48 rounded-full bg-[radial-gradient(circle,rgba(var(--skill-accent),0.032),transparent_72%)] opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4 sm:block sm:-mt-2 sm:pt-0">
        <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/[0.105] bg-white/[0.04] text-[rgb(var(--skill-accent))] shadow-[0_0_22px_rgba(var(--skill-accent),0.14),inset_0_1px_0_rgba(255,255,255,0.065)] backdrop-blur-xl transition duration-500 ease-out group-hover:border-[rgba(var(--skill-accent),0.38)] group-hover:bg-[rgba(var(--skill-accent),0.07)] group-hover:shadow-[0_0_30px_rgba(var(--skill-accent),0.23),inset_0_1px_0_rgba(255,255,255,0.09)]">
          <Icon className="h-5 w-5 transition duration-500 ease-out group-hover:scale-105" aria-hidden="true" />
        </div>

        <div className="sm:hidden">
          <h3 className="text-lg font-semibold text-white">{category.title}</h3>
        </div>
      </div>

      <div className="min-w-0">
        <div className="hidden sm:block">
          <h3 className="text-xl font-semibold text-white">{category.title}</h3>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2.5 sm:gap-3">
          {category.technologies.map((technology) => (
            <SkillPill
              key={technology}
              technology={technology}
              accentClassName={category.accent.pill}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function SkillPill({
  technology,
  accentClassName
}: {
  technology: string;
  accentClassName: string;
}) {
  const logo = technologyLogos[technology] ?? { type: "lucide", icon: Code2, color: "255 255 255" };
  const logoColor = logo.type === "simple" ? `#${logo.icon.hex}` : `rgb(${logo.color})`;
  const logoGlow =
    logo.type === "simple" ? `rgba(${hexToRgb(logo.icon.hex)}, 0.38)` : `rgba(${logo.color}, 0.36)`;

  return (
    <span
      className={[
        "group/skill inline-flex items-center gap-2.5 rounded-full border border-white/[0.085] bg-white/[0.032] px-3.5 py-1.5 text-sm font-semibold text-white/64 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-0.5",
        accentClassName
      ].join(" ")}
      style={
        {
          "--logo-color": logoColor,
          "--logo-glow": logoGlow
        } as CSSProperties
      }
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center text-[var(--logo-color)] opacity-80 transition duration-500 ease-out group-hover/skill:opacity-100 group-hover/skill:drop-shadow-[0_0_7px_var(--logo-glow)]">
        <TechnologyLogoIcon logo={logo} />
      </span>
      <span>{technology}</span>
    </span>
  );
}

function TechnologyLogoIcon({ logo }: { logo: TechnologyLogo }) {
  if (logo.type === "simple") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d={logo.icon.path} fill="currentColor" />
      </svg>
    );
  }

  const Icon = logo.icon;

  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

function hexToRgb(hex: string) {
  const normalized = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
  const value = Number.parseInt(normalized, 16);

  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}
