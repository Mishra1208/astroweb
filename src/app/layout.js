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

        {/* Left Side: Hanging from top - Pulled negative to flush edge */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: '-30px', // Pull aggressively to remove gap
          height: '65vh',
          width: '240px', // Compensate for negative margin
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}>
          <img
            src="/marigold-top.png"
            alt="Garland Left"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              objectPosition: 'top left',
              filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.15))'
            }}
          />
        </div>

        {/* Right Side: Hanging from top - Pulled negative to flush edge */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: '-30px', // Pull aggressively to remove gap
          height: '65vh',
          width: '240px',
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end'
        }}>
          <img
            src="/marigold-top.png"
            alt="Garland Right"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              objectPosition: 'top right',
              transform: 'scaleX(-1)', // Mirror for symmetry
              filter: 'drop-shadow(-2px 2px 3px rgba(0,0,0,0.15))'
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
