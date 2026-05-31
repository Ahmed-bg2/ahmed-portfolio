"use client";

import Image from "next/image";
import { BrainCircuit, GraduationCap, MapPin, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { SectionTitle } from "@/components/ui/section";

type ProfileInfo = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string;
};

const profilePhotoSrc = "/profile/profile-photo.png";

const profileInfo: ProfileInfo[] = [
  {
    label: "Education",
    value: "Computer Engineering",
    icon: GraduationCap,
    accent: "79 209 255"
  },
  {
    label: "Focus",
    value: "Full-Stack Development",
    icon: Sparkles,
    accent: "139 92 246"
  },
  {
    label: "AI Direction",
    value: "Artificial Intelligence",
    icon: BrainCircuit,
    accent: "16 185 129"
  },
  {
    label: "Location",
    value: "Sousse, Tunisia",
    icon: MapPin,
    accent: "245 158 11"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-28 py-14 sm:py-20">
      <SectionTitle title="About" />
      <div className="grid items-stretch gap-5 lg:grid-cols-[0.96fr_1.04fr] xl:grid-cols-[0.9fr_1.1fr]">
        <motion.article
          className="glass-panel relative flex min-h-[28rem] flex-col overflow-hidden rounded-3xl border-white/[0.18] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.58)] sm:min-h-[30rem] sm:p-8 lg:min-h-[34rem]"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-300/[0.14] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-violet-300/[0.13] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_34%,rgba(255,255,255,0.025))]" />

          <div className="relative flex h-full flex-col">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/85">
                Profile
              </p>
              <p className="mt-5 text-base leading-8 text-white/76 sm:text-lg sm:leading-9">
                I am a Computer Engineering student focused on building real-world digital
                products. I enjoy turning ideas into clean, useful, and scalable systems,
                with a growing interest in Artificial Intelligence and intelligent software
                experiences.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:mt-auto sm:grid-cols-2 sm:pt-8 lg:pt-10">
              {profileInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="identity-card rounded-2xl p-4 sm:p-5"
                  style={{ "--identity-accent": item.accent } as CSSProperties}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="identity-icon mb-3 grid h-10 w-10 place-items-center rounded-xl border">
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-100">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.article>

        <ProfilePhotoCard />
      </div>
    </section>
  );
}

function ProfilePhotoCard() {
  return (
    <motion.article
      className="relative min-h-[30rem] overflow-hidden rounded-3xl border border-white/[0.12] bg-slate-950/45 p-3 shadow-[0_34px_110px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:min-h-[32rem] lg:min-h-[34rem]"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08, duration: 0.65 }}
    >
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-300/[0.16] blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-violet-300/[0.16] blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(79,209,255,0.11),rgba(139,92,246,0.07)_42%,transparent_68%)] blur-2xl" />
      <div className="absolute inset-x-10 top-8 h-32 rounded-full bg-white/[0.04] blur-2xl" />

      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.12] bg-[radial-gradient(circle_at_72%_12%,rgba(79,209,255,0.2),transparent_24rem),radial-gradient(circle_at_10%_82%,rgba(139,92,246,0.18),transparent_25rem),linear-gradient(145deg,rgba(15,23,42,0.78),rgba(2,6,23,0.93))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <Image
          src={profilePhotoSrc}
          alt="Ahmed Ben Elghali"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover object-center saturate-[1.05] contrast-[1.05]"
          priority={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/82 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.035]" />
      </div>
    </motion.article>
  );
}
