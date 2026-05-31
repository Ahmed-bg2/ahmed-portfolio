import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, ExternalLink, FileImage } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { certifications, getCertificationBySlug } from "@/lib/certifications";

type CertificationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return certifications.map((certification) => ({
    slug: certification.slug
  }));
}

export async function generateMetadata({ params }: CertificationPageProps) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    return {
      title: "Certification not found"
    };
  }

  return {
    title: `${certification.title} | Ahmed Ben Elghali`,
    description: certification.description
  };
}

export default async function CertificationPage({ params }: CertificationPageProps) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <AnimatedBackground />
      <section className="section-shell relative z-10 py-10 sm:py-14">
        <Link
          href="/#certifications"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-200/35 hover:text-cyan-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to certifications
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <section className="rounded-3xl border border-white/[0.08] bg-slate-950/50 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-200/[0.16] bg-cyan-200/[0.07] px-3 py-1 text-xs font-semibold text-cyan-100">
                {certification.provider}
              </span>
              <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                Issued {certification.issued}
              </span>
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              {certification.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              {certification.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {certification.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-cyan-200/[0.14] bg-cyan-200/[0.06] px-3 py-1.5 text-xs font-medium text-cyan-50/90"
                >
                  {skill}
                </span>
              ))}
            </div>

            {certification.credentialUrl && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-200 via-sky-300 to-fuchsia-300 px-5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Open official credential
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </section>

          <section className="rounded-3xl border border-cyan-200/[0.14] bg-slate-950/50 p-4 shadow-[0_0_70px_rgba(34,211,238,0.1)] backdrop-blur-xl sm:p-5">
            {certification.certificateImage ? (
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-2">
                <Image
                  src={certification.certificateImage}
                  alt={`${certification.title} certificate`}
                  width={1600}
                  height={1100}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
            ) : (
              <div className="grid min-h-[28rem] place-items-center rounded-2xl border border-dashed border-cyan-200/[0.22] bg-cyan-200/[0.035] p-8 text-center">
                <div className="max-w-md">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
                    <FileImage className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-white">Credential page ready</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    Add the certificate screenshot or credential image later, then connect it
                    to this page from the certification data.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs text-slate-300">
                    <Award className="h-4 w-4 text-cyan-100" aria-hidden="true" />
                    No certificate image added yet
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
