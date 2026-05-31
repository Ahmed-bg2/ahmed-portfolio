import type { Metadata } from "next";
import { CustomCursor } from "@/components/ui/custom-cursor";
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
  ]
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
      </body>
    </html>
  );
}
