import {
    MakeTime,
    HelioVector,
    GeoVector,
    Ecliptic,
    Body,
    Observer,
    Equator,
    Horizon,
    SiderealTime,
    e_tilt
} from 'astronomy-engine';

// --- Constants ---
export const PLANETS = {
    Sun: Body.Sun,
    Moon: Body.Moon,
    Mars: Body.Mars,
    Mercury: Body.Mercury,
    Jupiter: Body.Jupiter,
    Venus: Body.Venus,
    Saturn: Body.Saturn,
    // Rahu/Ketu added manually
};

const PLANET_META = {
    Sun: { hi: 'सूर्य', short: 'सू' },
    Moon: { hi: 'चन्द्र', short: 'चं' },
    Mars: { hi: 'मंगल', short: 'मं' },
    Mercury: { hi: 'बुध', short: 'बु' },
    Jupiter: { hi: 'गुरु', short: 'गु' },
    Venus: { hi: 'शुक्र', short: 'शु' },
    Saturn: { hi: 'शनि', short: 'श' },
    Rahu: { hi: 'राहु', short: 'रा' },
    Ketu: { hi: 'केतु', short: 'के' }
};

export const RASHIS = [
    { id: 1, en: "Aries", hi: "मेष", short: "Me" },
    { id: 2, en: "Taurus", hi: "वृषभ", short: "Vr" },
    { id: 3, en: "Gemini", hi: "मिथुन", short: "Mi" },
    { id: 4, en: "Cancer", hi: "कर्क", short: "Ka" },
    { id: 5, en: "Leo", hi: "सिंह", short: "Si" },
    { id: 6, en: "Virgo", hi: "कन्या", short: "Kn" },
    { id: 7, en: "Libra", hi: "तुला", short: "Tu" },
    { id: 8, en: "Scorpio", hi: "वृश्चिक", short: "Vi" },
    { id: 9, en: "Sagittarius", hi: "धनु", short: "Dh" },
    { id: 10, en: "Capricorn", hi: "मकर", short: "Ma" },
    { id: 11, en: "Aquarius", hi: "कुंभ", short: "Ku" },
    { id: 12, en: "Pisces", hi: "मीन", short: "Mn" }
];

// --- Ayanamsa Calculation (Lahiri) ---
function calculateLahiriAyanamsa(date) {
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / msPerDay;
    const yearsSinceJ2000 = daysSinceJ2000 / 365.25;

    // Ayanamsa at J2000.0
    const initialAyanamsa = 23.853083;
    const precessionRate = 50.2388475 / 3600; // degrees per year

    return initialAyanamsa + (yearsSinceJ2000 * precessionRate);
}

function normalizeDegree(deg) {
    let result = deg % 360;
    if (result < 0) result += 360;
    return result;
}

export function getRashiFromLongitude(long) {
    const normalized = normalizeDegree(long);
    const signIndex = Math.floor(normalized / 30); // 0-11
    return {
        ...RASHIS[signIndex],
        degrees: normalized % 30
    };
}

// --- Main Calculation Function ---
export function getVedicChartData(dateInput, lat, lng) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
        throw new Error("[VedicAstro] Invalid Date passed: " + dateInput);
    }

    // 1. Calculate Ayanamsa
    const ayanamsa = calculateLahiriAyanamsa(date);

    // 2. Prepare Astronomy Engine Observer
    const observer = new Observer(lat, lng, 0);
    const time = MakeTime(date);

    // 3. Calculate Ascendant (Lagan)
    const gmst = SiderealTime(time);

    // Local Sidereal Time (LST)
    const lstHours = gmst + (lng / 15.0);
    const lstRad = (lstHours * 15.0) * (Math.PI / 180);

    // Obliquity
    const tilt = e_tilt(time);
    const obq = tilt.tobl * (Math.PI / 180);

    const latRad = lat * (Math.PI / 180);

    // Asc Logic
    const y = -Math.cos(lstRad);
    const x = (Math.sin(lstRad) * Math.cos(obq)) + (Math.tan(latRad) * Math.sin(obq));

    let ascRad = Math.atan2(y, x);
    let ascDeg = ascRad * (180 / Math.PI);

    // +180 Fix
    ascDeg = normalizeDegree(ascDeg + 180);

    const vedicAscendant = normalizeDegree(ascDeg - ayanamsa);
    const ascSign = getRashiFromLongitude(vedicAscendant);

    // 4. Calculate Planets
    const planets = [];

    // Standard Planets
    for (const [name, body] of Object.entries(PLANETS)) {
        const geoVector = GeoVector(body, time, true);
        const ecliptic = Ecliptic(geoVector);
        const tropicalLong = ecliptic.elon;

        const vedicLong = normalizeDegree(tropicalLong - ayanamsa);
        const rashi = getRashiFromLongitude(vedicLong);

        planets.push({
            name,
            ...PLANET_META[name], // Add Hindi Metadata
            tropical: tropicalLong,
            vedic: vedicLong,
            rashi: rashi
        });
    }

    // --- Rahu & Ketu ---
    const J2000_JD = 2451545.0;
    const jd = date.getTime() / 86400000.0 + 2440587.5;
    const T = (jd - J2000_JD) / 36525.0;

    let nodeMean = 125.04452 - 1934.136261 * T;
    nodeMean = normalizeDegree(nodeMean);

    const rahuVedic = normalizeDegree(nodeMean - ayanamsa);
    const rahuRashi = getRashiFromLongitude(rahuVedic);

    planets.push({
        name: "Rahu",
        ...PLANET_META["Rahu"],
        tropical: nodeMean,
        vedic: rahuVedic,
        rashi: rahuRashi
    });

    const ketuVedic = normalizeDegree(rahuVedic + 180);
    const ketuRashi = getRashiFromLongitude(ketuVedic);

    planets.push({
        name: "Ketu",
        ...PLANET_META["Ketu"],
        tropical: normalizeDegree(nodeMean + 180),
        vedic: ketuVedic,
        rashi: ketuRashi
    });

    return {
        dateInput: date.toISOString(),
        lat,
        lng,
        ayanamsa,
        ascendant: {
            tropical: ascDeg,
            vedic: vedicAscendant,
            rashi: ascSign
        },
        planets
    };
}
