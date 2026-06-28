import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Jumuiya Development Foundation",
    template: "%s | Jumuiya Development Foundation",
  },
  description: "Jumuiya Development Foundation (JDF) - Empowering communities through ethical leadership, sustainable livelihoods, and rights-based development.",
  keywords: ["Jumuiya", "Foundation", "Community Development", "Uganda", "NGO", "Education", "Human Rights"],
  openGraph: {
    title: "Jumuiya Development Foundation",
    description: "Empowering communities through ethical leadership, sustainable livelihoods, and rights-based development.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    images: ["/images/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumuiya Development Foundation",
    description: "Empowering communities through ethical leadership, sustainable livelihoods, and rights-based development.",
    images: ["/images/og-image.jpg"],
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
    <html lang="en">
      <body className={`${poppins.variable} font-sans bg-paper text-navy min-h-screen flex flex-col`} suppressHydrationWarning>
        <AnalyticsProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
        </AnalyticsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
