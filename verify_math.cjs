const {
    MakeTime,
    GeoVector,
    Ecliptic,
    Body,
    Observer
} = require('astronomy-engine');

// --- Constants ---
const PLANETS = {
    Sun: Body.Sun,
    Moon: Body.Moon,
    Mars: Body.Mars,
    Mercury: Body.Mercury,
    Jupiter: Body.Jupiter,
    Venus: Body.Venus,
    Saturn: Body.Saturn,
};

const RASHIS = [
    { id: 1, en: "Aries" },
    { id: 2, en: "Taurus" },
    { id: 3, en: "Gemini" },
    { id: 4, en: "Cancer" },
    { id: 5, en: "Leo" },
    { id: 6, en: "Virgo" },
    { id: 7, en: "Libra" },
    { id: 8, en: "Scorpio" },
    { id: 9, en: "Sagittarius" },
    { id: 10, en: "Capricorn" },
    { id: 11, en: "Aquarius" },
    { id: 12, en: "Pisces" }
];

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

function getRashi(long) {
    const normalized = normalizeDegree(long);
    const signIndex = Math.floor(normalized / 30);
    return {
        ...RASHIS[signIndex],
        deg: (normalized % 30).toFixed(2)
    };
}

// MAIN TEST
const date = new Date(); // now
// Delhi Lat/Long
const lat = 28.6139;
const lng = 77.2090;

console.log("=== VEDIC ASTRO VERIFICATION ===");
console.log("Date:", date.toISOString());

const ayanamsa = calculateLahiriAyanamsa(date);
console.log("Lahiri Ayanamsa:", ayanamsa.toFixed(4));

const observer = new Observer(lat, lng, 0);
const time = MakeTime(date);

console.log("\nPlanetary Positions:");
for (const [name, body] of Object.entries(PLANETS)) {
    const geoVector = GeoVector(body, time, true);
    const ecliptic = Ecliptic(geoVector);
    const tropicalLong = ecliptic.elon;
    const vedicLong = normalizeDegree(tropicalLong - ayanamsa);
    const rashi = getRashi(vedicLong);

    console.log(`${name}: Tropical=${tropicalLong.toFixed(2)} -> Vedic=${vedicLong.toFixed(2)} (${rashi.en} ${rashi.deg}°)`);
}
