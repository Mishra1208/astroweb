const {
    MakeTime,
    GeoVector,
    Ecliptic,
    Body,
    Observer,
    SiderealTime,
    e_tilt
} = require('astronomy-engine');

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
    const initialAyanamsa = 23.853083;
    const precessionRate = 50.2388475 / 3600;
    return initialAyanamsa + (yearsSinceJ2000 * precessionRate);
}

function normalizeDegree(deg) {
    let result = deg % 360;
    if (result < 0) result += 360;
    return result;
}

function getRashiFromLongitude(long) {
    const normalized = normalizeDegree(long);
    const signIndex = Math.floor(normalized / 30);
    return { ...RASHIS[signIndex], id: signIndex + 1, degrees: normalized % 30 };
}

// SIMULATE THE BUG
const dateInput = "2003-08-12T18:00:00.000Z"; // The calculated UTC from verify_aug12
const date = new Date(dateInput);

console.log("Debug Calculcation for:", date.toISOString());
const ayanamsa = calculateLahiriAyanamsa(date);
const time = MakeTime(date);

for (const [name, body] of Object.entries(PLANETS)) {
    const geoVector = GeoVector(body, time, true);
    const ecliptic = Ecliptic(geoVector);
    const tropicalLong = ecliptic.elon;

    const vedicLong = normalizeDegree(tropicalLong - ayanamsa);
    const rashi = getRashiFromLongitude(vedicLong);

    console.log(`${name}: Tropical ${tropicalLong.toFixed(2)} -> Vedic ${vedicLong.toFixed(2)} -> Rashi ${rashi.id} (${rashi.en})`);
}
