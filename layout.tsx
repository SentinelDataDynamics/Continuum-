import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Continuum — A registry for what you've built",
  description:
    "Continuum indexes your bank accounts, fintech vaults, property, and digital access — encrypted on your device — and hands it to your family only if something happens to you.",
  keywords: [
    "digital estate planning Nigeria",
    "dead man's switch",
    "asset registry",
    "next of kin vault",
    "encrypted emergency kit",
  ],
  openGraph: {
    title: "Continuum — A registry for what you've built",
    description:
      "If something happened to you this week, would your family know where to look? Continuum organizes your assets in minutes and releases them only when it's genuinely needed.",
    url: siteUrl,
    siteName: "Continuum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Continuum — A registry for what you've built",
    description:
      "Your accounts, property, and directives — encrypted, indexed, and handed to your family only when it's genuinely needed.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1A2B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,340;9..144,440;9..144,560;9..144,660&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
