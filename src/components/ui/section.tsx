"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionProps = {
  id: string;
  title?: string;
  hideHeader?: boolean;
  children: ReactNode;
};

type SectionTitleProps = {
  title: string;
  className?: string;
};

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={["relative mb-12 sm:mb-16", className].join(" ")}>
      <div className="pointer-events-none absolute -left-6 top-1/2 h-24 w-72 -translate-y-1/2 rounded-full bg-cyan-300/[0.12] blur-3xl sm:h-32 sm:w-[28rem]" />
      <div className="pointer-events-none absolute -bottom-4 left-0 h-px w-28 bg-gradient-to-r from-cyan-200/80 via-cyan-200/30 to-transparent shadow-[0_0_18px_rgba(125,211,252,0.42)] sm:w-40" />
      <h2 className="relative max-w-5xl bg-gradient-to-br from-white via-cyan-50 to-cyan-200 bg-clip-text text-4xl font-black leading-none tracking-normal text-transparent drop-shadow-[0_0_24px_rgba(125,211,252,0.16)] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
    </div>
  );
}

export function Section({
  id,
  title,
  hideHeader = false,
  children
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "section-shell scroll-mt-28",
        hideHeader ? "py-12 sm:py-16" : "py-20 sm:py-24"
      ].join(" ")}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {!hideHeader && title && <SectionTitle title={title} />}
        {children}
      </motion.div>
    </section>
  );
}
