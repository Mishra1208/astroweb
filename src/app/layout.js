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
        {/* Marigold Garland Decoration - Top Horizontal (Two strings side by side) */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start' // Ensure it hugs the top
        }}>
          {/* Left Half */}
          <div style={{
            width: '50%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'flex-end', // Align inward to touch seam
            overflow: 'hidden'
          }}>
            <img
              src="/marigold-top.png"
              alt="Garland Left"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '140px', // Slightly larger for impact
                objectFit: 'cover', // Use cover to fill width
                objectPosition: 'top',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
              }}
            />
          </div>

          {/* Right Half */}
          <div style={{
            width: '50%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'flex-start', // Align inward
            overflow: 'hidden'
          }}>
            <img
              src="/marigold-top.png"
              alt="Garland Right"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '140px',
                objectFit: 'cover',
                objectPosition: 'top', // Mirror logic not needed if image is symmetric, otherwise scaleX(-1)
                transform: 'scaleX(-1)', // Mirror it for symmetry
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
              }}
            />
          </div>
        </div>

        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
