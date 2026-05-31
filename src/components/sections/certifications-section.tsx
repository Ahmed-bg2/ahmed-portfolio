"use client";

import Link from "next/link";
import { BadgeCheck, Cloud, ExternalLink, Network, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { certifications } from "@/lib/certifications";
import type { Certification, CertificationAccent } from "@/lib/certifications";
import { SectionTitle } from "@/components/ui/section";

type AccentStyle = {
  border: string;
  glow: string;
  icon: string;
  pill: string;
  text: string;
  iconComponent: LucideIcon;
};

const accentStyles: Record<CertificationAccent, AccentStyle> = {
  cisco: {
    border: "hover:border-cyan-200/35",
    glow: "bg-cyan-300/[0.11] group-hover:bg-cyan-300/[0.18]",
    icon: "border-cyan-200/20 bg-cyan-200/10 text-cyan-100",
    pill: "border-cyan-200/[0.14] bg-cyan-200/[0.06] text-cyan-50/90",
    text: "text-cyan-100",
    iconComponent: Network
  },
  networking: {
    border: "hover:border-sky-200/35",
    glow: "bg-sky-300/[0.1] group-hover:bg-sky-300/[0.17]",
    icon: "border-sky-200/20 bg-sky-200/10 text-sky-100",
    pill: "border-sky-200/[0.14] bg-sky-200/[0.06] text-sky-50/90",
    text: "text-sky-100",
    iconComponent: Network
  },
  cybersecurity: {
    border: "hover:border-emerald-200/35",
    glow: "bg-emerald-300/[0.1] group-hover:bg-emerald-300/[0.16]",
    icon: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100",
    pill: "border-emerald-200/[0.14] bg-emerald-200/[0.06] text-emerald-50/90",
    text: "text-emerald-100",
    iconComponent: ShieldCheck
  },
  aws: {
    border: "hover:border-amber-200/35",
    glow: "bg-amber-300/[0.1] group-hover:bg-amber-300/[0.16]",
    icon: "border-amber-200/20 bg-amber-200/10 text-amber-100",
    pill: "border-amber-200/[0.14] bg-amber-200/[0.06] text-amber-50/90",
    text: "text-amber-100",
    iconComponent: Cloud
  }
};

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-shell scroll-mt-28 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionTitle title="Certifications" />

        <div className="grid gap-5 lg:grid-cols-2">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.title}
              certification={certification}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CertificationCard({
  certification,
  index
}: {
  certification: Certification;
  index: number;
}) {
  const accent = accentStyles[certification.accent];
  const Icon = accent.iconComponent;

  return (
    <motion.article
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/52 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.05] hover:shadow-[0_0_58px_rgba(15,23,42,0.5)]",
        accent.border
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
    >
      <div className={["absolute -right-14 -top-16 h-44 w-44 rounded-full blur-3xl transition duration-300", accent.glow].join(" ")} />
      <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.055),transparent_44%,rgba(255,255,255,0.025))] opacity-70" />

      <div className="relative flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className={["grid h-14 w-14 shrink-0 place-items-center rounded-2xl border shadow-[0_0_30px_rgba(34,211,238,0.1)]", accent.icon].join(" ")}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={["rounded-full border px-3 py-1 text-xs font-medium", accent.pill].join(" ")}>
              {certification.issued}
            </span>
            <span className={["inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold", accent.pill].join(" ")}>
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verified
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {certification.title}
          </h3>
          <p className={["mt-3 text-sm font-semibold", accent.text].join(" ")}>
            {certification.provider}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/64">{certification.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {certification.skills.map((skill) => (
            <span
              key={skill}
              className={["rounded-full border px-3 py-1.5 text-xs font-medium transition hover:-translate-y-0.5 hover:border-white/20", accent.pill].join(" ")}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-1 items-end">
          <Link
            href={`/certifications/${certification.slug}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 text-sm font-medium text-white/86 transition hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] hover:text-cyan-50"
          >
            View credential
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
