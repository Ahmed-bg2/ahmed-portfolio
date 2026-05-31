"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems, profile } from "@/lib/portfolio";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const sections = navItems.map((item) => item.href.replace("#", ""));

    const onScroll = () => {
      const current = sections
        .map((id) => {
          const element = document.getElementById(id);
          return {
            id,
            top: element ? Math.abs(element.getBoundingClientRect().top - 120) : Infinity
          };
        })
        .sort((a, b) => a.top - b.top)[0];

      if (current) {
        setActiveSection(`#${current.id}`);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-4 z-50 px-4"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="glass-panel mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full px-4 sm:px-5">
        <a href="#home" className="flex items-center gap-3" aria-label="Go to hero section">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-sky-200/25 bg-gradient-to-br from-sky-200/22 via-emerald-200/14 to-pink-300/14 text-sm font-bold text-sky-50 shadow-glow">
            AB
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-slate-100 lg:inline">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-full px-3 py-2 text-sm text-slate-300 transition hover:text-white lg:px-4"
            >
              {activeSection === item.href && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-full border border-sky-200/[0.18] bg-gradient-to-r from-sky-100/[0.09] via-emerald-100/[0.055] to-pink-100/[0.07] shadow-[0_0_24px_rgba(125,211,252,0.16)]"
                  transition={{ duration: 0.32, ease: "easeOut" }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        <span className="hidden w-9 sm:block" aria-hidden="true" />
      </nav>
    </motion.header>
  );
}
