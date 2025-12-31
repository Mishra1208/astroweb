const {
    MakeTime,
    GeoVector,
    Ecliptic,
    Body,
    Observer,
    SiderealTime,
    e_tilt
} = require('astronomy-engine');

// ... (Previous imports and functions)

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

const RASHIS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

// Date: Aug 12 2003 18:00 UTC
const date = new Date("2003-08-12T18:00:00.000Z");
const ayanamsa = calculateLahiriAyanamsa(date);

// Rahu Calculation
const J2000_JD = 2451545.0;
const jd = date.getTime() / 86400000.0 + 2440587.5;
const T = (jd - J2000_JD) / 36525.0;

let nodeMean = 125.04452 - 1934.136261 * T;
nodeMean = normalizeDegree(nodeMean);
const rahuVedic = normalizeDegree(nodeMean - ayanamsa);
const rahuSignIndex = Math.floor(rahuVedic / 30);
const rahuSign = RASHIS[rahuSignIndex];

// Ketu
const ketuVedic = normalizeDegree(rahuVedic + 180);
const ketuSignIndex = Math.floor(ketuVedic / 30);
const ketuSign = RASHIS[ketuSignIndex];

console.log(`Rahu: ${rahuSign} (${rahuVedic.toFixed(2)})`);
console.log(`Ketu: ${ketuSign} (${ketuVedic.toFixed(2)})`);
