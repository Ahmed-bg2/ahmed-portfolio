import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { navItems, profile } from "@/lib/portfolio";

const footerSocials = [
  {
    label: "GitHub",
    href: "https://github.com/Ahmed-bg2",
    icon: Github
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-ben-elghali-6aaaa729b/",
    icon: Linkedin
  },
  {
    label: "Email",
    href: "mailto:AhmedBenelghali@protonmail.com",
    icon: Mail
  }
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-ink/95 text-white">
      <div className="section-shell py-7 sm:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/#home"
              className="inline-flex items-center gap-3 text-sm font-semibold text-slate-100 transition hover:text-cyan-100"
              aria-label="Back to home"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-sky-200/25 bg-gradient-to-br from-sky-200/22 via-emerald-200/14 to-pink-300/14 text-xs font-bold text-sky-50 shadow-glow">
                AB
              </span>
              {profile.name}
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Full-stack developer and computer engineering student focused on clean,
              reliable digital products.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-2">
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  className="text-sm text-slate-400 transition hover:text-cyan-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex gap-2">
              {footerSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-slate-300 transition hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] hover:text-cyan-50"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
