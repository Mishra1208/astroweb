import { NextResponse } from 'next/server';

// Switch to require to ensure compatibility with CJS library as verified by test-astro.js
const Astronomy = require('astronomy-engine');
// v2.0 Fix applied: MakeTime.ut returns days since J2000

// Vedic Rashi (Moon Sign) Names
const RASHI_NAMES = [
    { en: "Aries", hi: "मेष", icon: "/zodiac/aries.png" },       // 0
    { en: "Taurus", hi: "वृषभ", icon: "/zodiac/taurus.png" },     // 1
    { en: "Gemini", hi: "मिथुन", icon: "/zodiac/gemini.png" },    // 2
    { en: "Cancer", hi: "कर्क", icon: "/zodiac/cancer.png" },     // 3
    { en: "Leo", hi: "सिंह", icon: "/zodiac/leo.png" },           // 4
    { en: "Virgo", hi: "कन्या", icon: "/zodiac/virgo.png" },      // 5
    { en: "Libra", hi: "तुला", icon: "/zodiac/libra.png" },       // 6
    { en: "Scorpio", hi: "वृश्चिक", icon: "/zodiac/scorpio.png" }, // 7
    { en: "Sagittarius", hi: "धनु", icon: "/zodiac/sagittarius.png" }, // 8
    { en: "Capricorn", hi: "मकर", icon: "/zodiac/capricorn.png" }, // 9
    { en: "Aquarius", hi: "कुंभ", icon: "/zodiac/aquarius.png" }, // 10
    { en: "Pisces", hi: "मीन", icon: "/zodiac/pisces.png" }       // 11
];

/**
 * Calculates True Lahiri Ayanamsa using precise High-Precision Precession Model.
 * Approximation of Swiss Ephemeris logic for Chitrapaksha.
 */
function getTrueLahiriAyanamsa(date) {
    // 1. Get J2000.0 offset for Spica (Lahiri Frame)
    // Precise: 23.8543055 degrees
    const AYANAMSA_J2000 = 23.8543055;

    // 2. Calculate Precession since J2000
    // Astronomy.MakeTime(date).ut returns "Days since J2000.0", NOT full Julian Day.
    const daysSinceJ2000 = Astronomy.MakeTime(date).ut;
    const t = daysSinceJ2000 / 36525.0; // Julian Centuries since J2000

    // General Precession in Longitude
    const precessionArcSec = (5028.796195 * t) + (1.11113 * t * t);
    const precessionDeg = precessionArcSec / 3600;

    // True Ayanamsa = Base + Precession
    return AYANAMSA_J2000 + precessionDeg;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const dob = searchParams.get('dob');
    const time = searchParams.get('time');
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const tzOffset = parseFloat(searchParams.get('tz') || "5.5");

    console.log("Vedic API Request:", { dob, time, lat, lon, tzOffset });

    if (!dob || !time || isNaN(lat) || isNaN(lon)) {
        return NextResponse.json({ error: 'Missing parameters: dob, time, lat, lon' }, { status: 400 });
    }

    try {
        // 1. Construct Date Object (Local Time -> UTC)
        // Note: This expects Input Time to be Local Time at Birth
        const [year, month, day] = dob.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);

        const totalMinutes = (hours * 60) + minutes - (tzOffset * 60);
        const utcDate = new Date(Date.UTC(year, month - 1, day, 0, totalMinutes, 0));

        console.log("Calculated UTC Date:", utcDate.toISOString());

        // 2. Calculate Tropical Position (Geocentric Ecliptic Longitude)
        // True = Corrections for Nutation and Aberration included (Essential for precision)
        const moonPos = Astronomy.GeoVector(Astronomy.Body.Moon, utcDate, true);
        const ecliptic = Astronomy.Ecliptic(moonPos);

        // 3. Calculate Sidereal Position
        const tropicalLong = ecliptic.elon; // Tropical Longitude
        const ayamansa = getTrueLahiriAyanamsa(utcDate);

        let siderealLong = tropicalLong - ayamansa;
        // Normalize to 0-360
        siderealLong = ((siderealLong % 360) + 360) % 360;

        // 4. Determine Rashi
        const rashiIndex = Math.floor(siderealLong / 30);
        const degreesInSign = siderealLong % 30; // 0-30

        // Format Degrees/Minutes (D° M')
        const deg = Math.floor(degreesInSign);
        const min = Math.floor((degreesInSign - deg) * 60);

        const rashi = RASHI_NAMES[rashiIndex] || RASHI_NAMES[0];

        if (!RASHI_NAMES[rashiIndex]) {
            console.error(`Calculation Error: Invalid Rashi Index ${rashiIndex} for Sidereal ${siderealLong}`);
        }

        console.log(`Success: ${rashi.en} (${deg}° ${min}')`);

        return NextResponse.json({
            sign: rashi.en,
            hindiName: rashi.hi,
            icon: rashi.icon,
            details: {
                moon_sign_en: rashi.en,
                moon_sign_hi: rashi.hi,
                degrees: `${deg}° ${min}'`, // Professional Format
                ayanamsa: ayamansa.toFixed(4),
                tropical: tropicalLong.toFixed(4)
            }
        });

    } catch (error) {
        console.error("Vedic Calculation Error:", error);
        return NextResponse.json({ error: 'Calculation failed: ' + error.message }, { status: 500 });
    }
}
