const {
    MakeTime,
    GeoVector,
    Ecliptic,
    Body,
    Observer,
    SiderealTime,
    e_tilt
} = require('astronomy-engine');

// Correct manual port of the logic
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

function getRashi(long) {
    const normalized = normalizeDegree(long);
    const signIndex = Math.floor(normalized / 30);
    return { ...RASHIS[signIndex], deg: normalized % 30 };
}

// USER INPUT: Aug 12, 2003, 23:30 IST, Prayagraj
// Lat: 25.4358, Lng: 81.8463
// Date Construction Logic from page.js:
const year = 2003, month = 8, day = 12;
const hours = 23, minutes = 30;
// Create UTC date
const dateUTC = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
console.log("Base UTC:", dateUTC.toISOString());

// Subtract 5.5 hours (IST offset)
const offsetMs = 5.5 * 60 * 60 * 1000;
const trueDate = new Date(dateUTC.getTime() - offsetMs);
console.log("Adjusted UTC Moment (for Astronomy Engine):", trueDate.toISOString());

const ayanamsa = calculateLahiriAyanamsa(trueDate);
const time = MakeTime(trueDate);
const lat = 25.4358;
const lng = 81.8463;

// Ascendant
const gmst = SiderealTime(time);
const lstHours = gmst + (lng / 15.0);
const lstRad = (lstHours * 15.0) * (Math.PI / 180);
const tilt = e_tilt(time);
const obq = tilt.tobl * (Math.PI / 180); // using true obliquity
const latRad = lat * (Math.PI / 180);
const y = -Math.cos(lstRad);
const x = (Math.sin(lstRad) * Math.cos(obq)) + (Math.tan(latRad) * Math.sin(obq));
let ascRad = Math.atan2(y, x);
let ascDeg = normalizeDegree(ascRad * (180 / Math.PI));
let vedicAsc = normalizeDegree(ascDeg - ayanamsa);
let ascRashi = getRashi(vedicAsc);

console.log(`Lagan: ${ascRashi.en} (${ascRashi.deg.toFixed(2)})`);

// Planets
for (const [name, body] of Object.entries(PLANETS)) {
    const geoVector = GeoVector(body, time, true);
    const ecliptic = Ecliptic(geoVector);
    const tropicalLong = ecliptic.elon;
    const vedicLong = normalizeDegree(tropicalLong - ayanamsa);
    const rashi = getRashi(vedicLong);
    console.log(`${name}: ${rashi.en} (${rashi.deg.toFixed(2)})`);
}
