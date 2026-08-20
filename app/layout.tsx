/* biome-ignore-all lint/security/noDangerouslySetInnerHtml: Static JSON-LD is escaped before rendering. */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const publicSans = localFont({
  src: [
    {
      path: "../public/webfonts/PublicSans-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/webfonts/PublicSans-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/webfonts/PublicSans-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chand1012.dev"),
  title: "Chandler L — Senior Startup Product Engineer",
  description:
    "Senior full-stack engineer building AI products, backend systems, infrastructure, and web applications for startups.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Chandler L", url: "https://chand1012.dev" }],
  keywords: [
    "Senior Full Stack Engineer",
    "Go Engineer",
    "Node.js Engineer",
    "AI Product Engineer",
    "DevOps",
    "Next.js",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Chandler L — Senior Startup Product Engineer",
    description:
      "Senior full-stack engineer building AI products, backend systems, infrastructure, and web applications for startups.",
    url: "https://chand1012.dev",
    siteName: "Chandler L — Portfolio",
    images: [
      {
        url: "https://chand1012.dev/api/og/hero?theme=dark",
        width: 1200,
        height: 630,
        alt: "Chandler L — Senior Startup Product Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandler L — Senior Startup Product Engineer",
    description:
      "Senior full-stack engineer building AI products, backend systems, infrastructure, and web applications for startups.",
    images: ["https://chand1012.dev/api/og/hero?theme=dark"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chandler L",
  url: "https://chand1012.dev",
  image: "https://chand1012.dev/me.jpeg",
  jobTitle: "Senior Full Stack Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "The University of Akron",
  },
  sameAs: [
    "https://github.com/chand1012",
    "https://www.linkedin.com/in/chandlerl2000/",
    "https://dev.to/chand1012",
  ],
  knowsAbout: [
    "Full-stack software engineering",
    "Artificial intelligence",
    "Go",
    "Node.js",
    "React",
    "Cloud infrastructure",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${publicSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
