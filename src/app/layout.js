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

export const metadata = {
  title: "Astroweb | Aligning the Cosmos",
  description: "Premium Vedic Astrology & Horoscope",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${tiro.variable} ${hind.variable} ${mukta.variable}`}>
        {/* Marigold Garland Decoration - Vertical Sides (Ladi) */}

        {/* Left Side: 2 Strings */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: '10px',
          width: '80px', // Width to show approx 2 strings from the image
          height: '60vh', // Hang down significantly
          zIndex: 9998,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <img
            src="/marigold-top.png"
            alt="Garland Left"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Fill vertical height
              objectPosition: 'left center', // Show left part of image
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
            }}
          />
        </div>

        {/* Right Side: 2 Strings */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: '10px',
          width: '80px',
          height: '60vh',
          zIndex: 9998,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <img
            src="/marigold-top.png"
            alt="Garland Right"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'right center', // Show right part of image (or mirror)
              filter: 'drop-shadow(-2px 2px 4px rgba(0,0,0,0.2))'
            }}
          />
        </div>

        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
