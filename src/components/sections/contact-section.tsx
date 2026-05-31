"use client";

import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { getSocialStyle } from "@/lib/social-styles";
import { SectionTitle } from "@/components/ui/section";

const contactCards = [
  {
    label: "Email",
    value: "AhmedBenelghali@protonmail.com",
    href: "mailto:AhmedBenelghali@protonmail.com",
    icon: Mail
  },
  {
    label: "GitHub",
    value: "github.com/Ahmed-bg2",
    href: "https://github.com/Ahmed-bg2",
    icon: Github
  },
  {
    label: "LinkedIn",
    value: "Ahmed Ben Elghali",
    href: "https://www.linkedin.com/in/ahmed-ben-elghali-6aaaa729b/",
    icon: Linkedin
  }
];

export function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, "", message].join("\n")
    );

    window.location.href = `mailto:AhmedBenelghali@protonmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-shell scroll-mt-28 py-20 sm:py-28">
      <motion.div
        className="glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-300/[0.14] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-fuchsia-300/[0.1] blur-3xl" />
        <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-violet-200/35 to-transparent" />
        <SectionTitle title="Contact" className="mb-10 sm:mb-12" />
        <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <div className="grid gap-3">
              {contactCards.map((card, index) => {
                const style = getSocialStyle(card.label);

                return (
                  <motion.a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={[
                      "group flex items-center justify-between gap-4 rounded-2xl border p-4 transition",
                      style.contactCardClassName
                    ].join(" ")}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span
                        className={[
                          "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition",
                          style.contactIconWrapClassName
                        ].join(" ")}
                      >
                        <card.icon className="h-4 w-4 transition-colors" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                          {card.label}
                        </p>
                        <p className="truncate text-sm font-medium text-slate-100">
                          {card.value}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={[
                        "h-4 w-4 shrink-0 transition-colors",
                        style.contactArrowClassName
                      ].join(" ")}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <form
            className="rounded-3xl border border-violet-200/[0.12] bg-slate-950/45 p-5 shadow-[0_0_54px_rgba(168,85,247,0.08)] backdrop-blur-xl sm:p-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm text-slate-400">Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-violet-200/40 focus:bg-violet-100/[0.045]"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm text-slate-400">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-violet-200/40 focus:bg-violet-100/[0.045]"
                />
              </label>
            </div>
            <label className="mt-4 block space-y-2">
              <span className="text-sm text-slate-400">Message</span>
              <textarea
                name="message"
                rows={6}
                placeholder="Tell me about your project or opportunity..."
                required
                className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-violet-200/40 focus:bg-violet-100/[0.045]"
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-200 via-fuchsia-300 to-cyan-200 px-6 text-sm font-semibold text-slate-950 shadow-[0_0_38px_rgba(168,85,247,0.25)] transition hover:brightness-110"
            >
              Send Message
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Sends through your email client with the message already prepared.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
