import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Firomsa Assefa Roba | Software Engineer",
  description: "Interactive developer portfolio showcasing software engineering experience, projects, and skills. Built with Next.js and Tailwind CSS.",
  keywords: ["Firomsa Assefa Roba", "Software Engineer", "Full Stack Developer", "Portfolio", "Next.js", "React", "TypeScript", "Ethiopia", "firo1919"],
  authors: [{ name: "Firomsa Assefa Roba", url: "https://github.com/firo1919" }],
  creator: "Firomsa Assefa Roba",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Firomsa Assefa Roba | Software Engineer",
    description: "Interactive developer portfolio showcasing software engineering experience, projects, and skills.",
    siteName: "Firomsa Assefa Roba Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firomsa Assefa Roba | Software Engineer",
    description: "Interactive developer portfolio showcasing software engineering experience, projects, and skills.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-FOUC Inline Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Firomsa Assefa Roba",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://firomsa.dev",
              jobTitle: "Software Engineer",
              sameAs: [
                "https://github.com/firo1919",
                "https://www.linkedin.com/in/firomsa-assefa-roba"
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans bg-bg-base text-text-body antialiased selection:bg-mint-primary/20 selection:text-mint-light">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
