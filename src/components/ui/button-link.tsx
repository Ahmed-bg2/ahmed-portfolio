"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type ButtonLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
  iconClassName?: string;
};

export function ButtonLink({
  href,
  label,
  icon: Icon,
  variant = "secondary",
  iconClassName
}: ButtonLinkProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={[
        "group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold transition-colors sm:w-auto",
        "focus:outline-none focus:ring-2 focus:ring-sky-200/70 focus:ring-offset-2 focus:ring-offset-ink",
        isPrimary
          ? "bg-gradient-to-r from-sky-200 via-emerald-200 to-pink-200 text-slate-950 shadow-glow hover:brightness-110"
          : "border border-white/[0.12] bg-white/[0.04] text-slate-100 hover:border-sky-200/45 hover:bg-sky-200/10"
      ].join(" ")}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {isPrimary && (
        <span className="absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-white/40 blur-md transition-transform duration-700 group-hover:translate-x-[220%]" />
      )}
      <Icon className={["h-4 w-4 transition-colors", iconClassName].filter(Boolean).join(" ")} aria-hidden="true" />
      <span>{label}</span>
    </motion.a>
  );
}
