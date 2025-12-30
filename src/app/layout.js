import { Inter, Tiro_Devanagari_Hindi, Hind, Mukta } from "next/font/google"; // Standardizing Temple Fonts
import "./globals.css";

// 1. Numbers (Panchang/Dates)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-numbers",
  display: "swap",
});

// 2. Headings & Hero (Sacred/Traditional)
const tiro = Tiro_Devanagari_Hindi({
  weight: ["400"], // Tiro usually has regular/italic, 400 is standard
  subsets: ["latin", "devanagari"],
  variable: "--font-heading",
  display: "swap",
});

// 3. Body Text (Clean/Readable)
const hind = Hind({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "devanagari"],
  variable: "--font-body",
  display: "swap",
});

// 4. UI Elements (Buttons/Labels)
const mukta = Mukta({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-ui",
  display: "swap",
});

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Garland from "@/components/Garland";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingAvatar from "@/components/FloatingAvatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Acharya Rajkumar | Aligning the Cosmos",
  description: "Premium Vedic Astrology & Horoscope",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${tiro.variable} ${hind.variable} ${mukta.variable}`}>
        {/* Loading Screen - Global Once-per-session */}
        <LoadingScreen />

        {/* Marigold Garland Decoration - Animated & Interactive */}
        <Garland side="left" />
        <Garland side="right" />

        {/* Persistent Floating Goddess Avatar */}
        <FloatingAvatar />

        <Navbar />

        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
