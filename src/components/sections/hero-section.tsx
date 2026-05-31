"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { profile } from "@/lib/portfolio";
import { getSocialStyle } from "@/lib/social-styles";
import { ButtonLink } from "@/components/ui/button-link";
import { HolographicCore } from "@/components/ui/holographic-core";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" }
  }
};

const heroHighlights = [
  {
    label: "AI-Oriented Learning Path",
    className:
      "border-sky-200/[0.18] bg-sky-200/[0.07] text-sky-50 shadow-[0_0_28px_rgba(125,211,252,0.13)] hover:border-sky-100/35 hover:bg-sky-100/[0.1]"
  },
  {
    label: "Real-World SaaS Projects",
    className:
      "border-emerald-200/[0.16] bg-emerald-200/[0.06] text-emerald-50 shadow-[0_0_28px_rgba(52,211,153,0.12)] hover:border-emerald-100/32 hover:bg-emerald-100/[0.095]"
  },
  {
    label: "CCNA Certified",
    className:
      "border-amber-200/[0.16] bg-amber-200/[0.06] text-amber-50 shadow-[0_0_28px_rgba(251,191,36,0.11)] hover:border-amber-100/32 hover:bg-amber-100/[0.095]"
  },
  {
    label: "AWS Cloud Foundations",
    className:
      "border-pink-200/[0.16] bg-pink-200/[0.055] text-pink-50 shadow-[0_0_28px_rgba(244,114,182,0.1)] hover:border-pink-100/32 hover:bg-pink-100/[0.09]"
  }
];

export function HeroSection() {
  return (
    <section id="home" className="section-shell flex min-h-[100svh] items-center pb-14 pt-24 sm:pb-20 sm:pt-32">
      <div className="mx-auto grid w-full items-center gap-9 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-200/[0.16] bg-slate-950/45 px-3.5 py-2 text-xs text-cyan-50 shadow-[0_0_38px_rgba(34,211,238,0.16)] backdrop-blur-xl sm:mb-7 sm:px-4 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-cyan-100" aria-hidden="true" />
            <span className="truncate">Software engineering portfolio / AI-ready systems</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg font-medium text-slate-200 sm:mt-6 sm:text-2xl">
            <motion.span
              className="inline-block bg-[linear-gradient(110deg,#ffffff,#7dd3fc,#86efac,#f9a8d4,#ffffff)] bg-[length:260%_100%] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              Full-Stack Developer
            </motion.span>{" "}
            <span className="text-slate-400">& Computer Engineering Student</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8"
          >
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex max-w-2xl gap-2.5 overflow-x-auto pb-1 sm:mt-7 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {heroHighlights.map((highlight) => (
              <span
                key={highlight.label}
                className={[
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium backdrop-blur-xl transition",
                  highlight.className
                ].join(" ")}
              >
                {highlight.label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-8 grid grid-cols-1 gap-3 min-[430px]:grid-cols-3 sm:mt-9 sm:flex sm:flex-wrap">
            {profile.socials.map((social, index) => {
              const style = getSocialStyle(social.label);
              const variant = index === 0 ? "primary" : "secondary";

              return (
                <ButtonLink
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  icon={social.icon}
                  variant={variant}
                  iconClassName={
                    variant === "primary" ? style.primaryIconClassName : style.iconClassName
                  }
                />
              );
            })}
          </motion.div>

          <motion.a
            variants={item}
            href="#about"
            className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-100 sm:mt-12"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
            Explore portfolio
          </motion.a>
        </motion.div>

        <motion.div
          className="relative min-h-[19rem] sm:min-h-[28rem] lg:min-h-[34rem]"
          initial={{ opacity: 0, x: 34, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.15),rgba(52,211,153,0.07)_34%,rgba(244,114,182,0.06)_52%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-x-10 bottom-8 h-px bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent" />
          <HolographicCore />
        </motion.div>
      </div>
    </section>
  );
}
