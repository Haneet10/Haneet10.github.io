import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/content/profile";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} · Mechanical Engineering, University of Waterloo`,
    template: `%s · ${profile.name}`,
  },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.site }],
  keywords: ["Haneet Singh", "Mechanical Engineering", "University of Waterloo", "portfolio", "engineering projects", "Waterloo Rocketry"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: profile.site,
    title: `${profile.name} · Mechanical Engineering`,
    description: profile.description,
    siteName: profile.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, Mechanical Engineering, University of Waterloo` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1012" },
  ],
};

// Runs before paint so the saved or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.site,
  email: `mailto:${profile.email}`,
  affiliation: { "@type": "CollegeOrUniversity", name: profile.school },
  knowsAbout: ["Mechanical engineering", "Python", "C++", "MATLAB", "SolidWorks", "Structural analysis"],
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="label fixed left-4 top-3 z-[60] -translate-y-16 bg-ink px-3 py-2 !text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
