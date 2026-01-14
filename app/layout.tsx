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
  title: "Chandler L - Full Stack Engineer",
  description:
    "Full Stack Engineer with a passion for building products from the ground up that scale and make a difference.",
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
    title: "Chandler L - Full Stack Engineer",
    description:
      "Full Stack Engineer with a passion for building products from the ground up that scale and make a difference.",
    images: [
      {
        url: "/api/og/hero?theme=dark",
        width: 1200,
        height: 630,
        alt: "Chandler L - Full Stack Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandler L - Full Stack Engineer",
    description:
      "Full Stack Engineer with a passion for building products from the ground up that scale and make a difference.",
    images: ["/api/og/hero?theme=dark"],
  },
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
