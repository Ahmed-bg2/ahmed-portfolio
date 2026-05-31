"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navItems, profile } from "@/lib/portfolio";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const getHref = (href: string) => (isHomePage ? href : `/${href}`);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-3 z-50 px-3 sm:top-4 sm:px-4"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="glass-panel mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 sm:h-16 sm:px-5">
        <a
          href={getHref("#home")}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          aria-label="Go to hero section"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-sky-200/25 bg-gradient-to-br from-sky-200/22 via-emerald-200/14 to-pink-300/14 text-sm font-bold text-sky-50 shadow-glow">
            AB
          </span>
          <span className="max-w-[10.5rem] truncate text-sm font-semibold tracking-wide text-slate-100 sm:max-w-none lg:inline">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={getHref(item.href)}
              className="relative rounded-full px-3 py-2 text-sm text-slate-300 transition hover:text-white lg:px-4"
              aria-current={isHomePage && activeSection === item.href ? "page" : undefined}
            >
              {isHomePage && activeSection === item.href && (
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

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.045] text-slate-100 shadow-[0_0_22px_rgba(125,211,252,0.1)] transition hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] lg:hidden"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileMenuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                <Menu className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <span className="hidden w-9 lg:block" aria-hidden="true" />
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            className="glass-panel mx-auto mt-2 max-w-6xl overflow-hidden rounded-[1.5rem] p-2 shadow-[0_26px_70px_rgba(0,0,0,0.42)] lg:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item, index) => {
                const isActive = isHomePage && activeSection === item.href;

                return (
                  <motion.a
                    key={item.href}
                    href={getHref(item.href)}
                    className={[
                      "relative overflow-hidden rounded-2xl border px-3 py-3 text-sm font-semibold transition",
                      isActive
                        ? "border-cyan-100/28 bg-cyan-100/[0.105] text-cyan-50 shadow-[0_0_22px_rgba(125,211,252,0.14)]"
                        : "border-white/[0.075] bg-white/[0.035] text-slate-300 hover:border-cyan-200/24 hover:bg-cyan-100/[0.075] hover:text-white"
                    ].join(" ")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.025, duration: 0.22 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/80 to-transparent" />
                    )}
                    {item.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
