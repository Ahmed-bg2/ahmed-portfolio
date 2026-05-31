"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Building2,
  CalendarCheck,
  Camera,
  FileScan,
  LayoutDashboard,
  MonitorCog,
  PhoneCall,
  ShieldCheck,
  UploadCloud,
  UserRound,
  X
} from "lucide-react";

type ScreenshotItem = {
  title: string;
  description?: string;
  src?: string;
  secondarySrc?: string;
  frame?: "wide" | "square" | "portrait" | "confirmation";
};

type WorkflowItem = {
  title: string;
  description: string;
  icon: typeof Building2;
};

const workflowItems: WorkflowItem[] = [
  {
    title: "Agency Selection",
    description: "Customers choose the nearest KIA Tunisia service center.",
    icon: Building2
  },
  {
    title: "OCR Document Upload",
    description: "Vehicle and identity documents are uploaded for extraction.",
    icon: UploadCloud
  },
  {
    title: "Appointment Creation",
    description: "Extracted data feeds the maintenance appointment request.",
    icon: CalendarCheck
  },
  {
    title: "Client Portal",
    description: "Customers confirm and follow their booking status.",
    icon: UserRound
  },
  {
    title: "Front Office",
    description: "Reception teams handle daily appointments and quick search.",
    icon: PhoneCall
  },
  {
    title: "Back Office",
    description: "Administrators manage slots, agencies, and operations.",
    icon: MonitorCog
  }
];

const featureItems: WorkflowItem[] = [
  {
    title: "OCR Processing",
    description: "Extracts maintenance data from uploaded vehicle documents.",
    icon: FileScan
  },
  {
    title: "OTP Verification",
    description: "Validates appointments using SMS confirmation.",
    icon: ShieldCheck
  },
  {
    title: "Client Dashboard",
    description: "Allows customers to track appointments.",
    icon: UserRound
  },
  {
    title: "Operational Dashboard",
    description: "Used by reception and back-office teams.",
    icon: LayoutDashboard
  }
];

export function KiaJourneyShowcase({ screenshots }: { screenshots: ScreenshotItem[] }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const visibleScreenshots = screenshots.filter((item) => item.src);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isGalleryOpen]);

  return (
    <>
      <section id="kia-workflow" className="mt-12" aria-labelledby="kia-workflow-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
              Workflow Overview
            </p>
            <h2 id="kia-workflow-title" className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Maintenance journey in one view
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-cyan-100/20 bg-cyan-100/[0.07] px-5 text-sm font-semibold text-cyan-50 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-100/35 hover:bg-cyan-100/[0.12]"
          >
            <Camera className="mr-2 h-4 w-4" aria-hidden="true" />
            View Screenshots
          </button>
        </div>

        <ol className="relative mt-6 grid gap-3 lg:grid-cols-6">
          <div className="pointer-events-none absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-cyan-200/0 via-cyan-200/22 to-cyan-200/0 lg:block" />
          {workflowItems.map((item, index) => (
            <li
              key={item.title}
              className="group relative rounded-2xl border border-white/[0.08] bg-slate-950/44 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-100/24 hover:bg-cyan-100/[0.045]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-100/18 bg-cyan-100/[0.075] text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.1)]">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="kia-features" className="mt-10" aria-labelledby="kia-features-title">
        <div className="mb-5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
            Feature Highlights
          </p>
          <h2 id="kia-features-title" className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Core platform capabilities
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureItems.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-white/[0.08] bg-slate-950/46 p-5 shadow-[0_0_46px_rgba(34,211,238,0.06),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-100/25 hover:bg-cyan-100/[0.045]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-100/18 bg-cyan-100/[0.075] text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.1)] transition duration-300 group-hover:scale-105">
                <item.icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/82 px-4 py-6 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="kia-gallery-title"
          onMouseDown={() => setIsGalleryOpen(false)}
        >
          <section
            className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-cyan-100/16 bg-slate-950/86 shadow-[0_0_100px_rgba(34,211,238,0.16)]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/70">
                  Product Screens
                </p>
                <h2 id="kia-gallery-title" className="mt-1 text-xl font-semibold text-white">
                  KIA Appointment Booking System
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.05] text-slate-200 transition hover:border-cyan-100/30 hover:text-cyan-50"
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[calc(90vh-5.25rem)] overflow-y-auto p-4 [scrollbar-color:rgba(103,232,249,0.35)_transparent] sm:p-5">
              <div className="grid gap-4 md:grid-cols-2">
                {visibleScreenshots.map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-2"
                  >
                    {item.frame === "confirmation" && item.secondarySrc ? (
                      <div className="grid min-h-72 gap-3 rounded-xl bg-slate-900/80 p-3 sm:grid-cols-[0.82fr_1.18fr] sm:items-center">
                        <Image
                          src={item.src!}
                          alt={`${item.title} app screen`}
                          width={720}
                          height={960}
                          className="mx-auto max-h-80 w-auto rounded-xl object-contain"
                        />
                        <Image
                          src={item.secondarySrc}
                          alt={`${item.title} SMS message`}
                          width={562}
                          height={252}
                          className="mx-auto w-full max-w-sm rounded-xl object-contain"
                        />
                      </div>
                    ) : (
                      <Image
                        src={item.src!}
                        alt={item.title}
                        width={1700}
                        height={1050}
                        className="aspect-[16/9] w-full rounded-xl object-contain object-left-top brightness-110 contrast-[1.04]"
                      />
                    )}
                    <div className="px-2 py-3">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      {item.description && <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
