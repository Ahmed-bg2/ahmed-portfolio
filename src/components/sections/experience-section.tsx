"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/portfolio";
import { Section } from "@/components/ui/section";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-cyan-200/60 via-fuchsia-300/20 to-transparent md:left-1/2" />

        {experiences.map((experience, index) => (
          <motion.article
            key={experience.title}
            className="relative grid gap-6 pb-8 md:grid-cols-2"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65 }}
          >
            <div className={index % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12"}>
              <div className="glow-card rounded-2xl p-[1px]">
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/45 p-6 backdrop-blur-xl sm:p-7">
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={[
                        "relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/[0.08] shadow-[0_0_24px_rgba(255,255,255,0.08)]",
                        experience.logoFit === "cover" ? "bg-transparent p-0" : "bg-white p-2"
                      ].join(" ")}
                    >
                      {experience.logoSrc && (
                        <span
                          className={
                            experience.logoFit === "cover"
                              ? "absolute inset-0 bg-cover bg-center bg-no-repeat"
                              : "h-full w-full bg-contain bg-center bg-no-repeat"
                          }
                          style={{ backgroundImage: `url(${experience.logoSrc})` }}
                          role="img"
                          aria-label={`${experience.company} logo`}
                        />
                      )}
                      {!experience.logoSrc && (
                        <span className={`relative z-0 bg-gradient-to-r ${experience.accent} bg-clip-text text-xl font-black tracking-tight text-transparent`}>
                          {experience.company}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl font-semibold tracking-tight text-white">
                        {experience.company}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold italic text-slate-500">
                        <span className="text-cyan-300">[{experience.role}]</span>
                        <span className="text-slate-600">{"\u2022"}</span>
                        <span className="whitespace-nowrap">{experience.period}</span>
                      </p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{experience.title}</h3>
                  <p className="mt-5 leading-7 text-slate-400">{experience.description}</p>
                  <div className="mt-6 space-y-3">
                    {experience.highlights.map((highlight) => (
                      <div key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${experience.accent} shadow-[0_0_12px_rgba(103,232,249,0.85)]`} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-200/25 hover:text-white"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`absolute left-4 top-7 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-r ${experience.accent} shadow-[0_0_20px_rgba(103,232,249,1)] md:left-1/2`} />
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
