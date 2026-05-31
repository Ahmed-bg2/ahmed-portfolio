import type { Metadata, Viewport } from "next";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Ben Elghali | Full-Stack Developer",
  description:
    "Premium developer portfolio for Ahmed Ben Elghali, a full-stack developer and computer engineering student building scalable software systems.",
  keywords: [
    "Ahmed Ben Elghali",
    "Full-Stack Developer",
    "Computer Engineering",
    "Next.js",
    "React",
    "Django",
    "Portfolio"
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#030511"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
