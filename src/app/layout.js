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
        {/* Marigold Garland Decoration - Vertical Strings (Ladi) */}

        {/* Left Side */}
        <div style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: '10px',
          width: '70px',
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {/* String 1 */}
          <div style={{
            width: '30px',
            height: '100%',
            backgroundImage: "url('/garland.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            opacity: 0.95,
            filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))'
          }}></div>
          {/* String 2 (Offset for natural look) */}
          <div style={{
            width: '30px',
            height: '100%',
            backgroundImage: "url('/garland.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            backgroundPosition: '0 -40px',
            opacity: 0.9,
            filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))'
          }}></div>
        </div>

        {/* Right Side */}
        <div style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: '10px',
          width: '70px',
          zIndex: 9998,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {/* String 1 */}
          <div style={{
            width: '30px',
            height: '100%',
            backgroundImage: "url('/garland.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            opacity: 0.95,
            filter: 'drop-shadow(-2px 2px 2px rgba(0,0,0,0.3))'
          }}></div>
          {/* String 2 (Offset) */}
          <div style={{
            width: '30px',
            height: '100%',
            backgroundImage: "url('/garland.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            backgroundPosition: '0 -40px',
            opacity: 0.9,
            filter: 'drop-shadow(-2px 2px 2px rgba(0,0,0,0.3))'
          }}></div>
        </div>

        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
