/**
 * Match Making (Guna Milan) Utility
 * Implements the traditional Vedic Ashta Kuta matching system (36 Gunas).
 */

// --- Constants & Lookup Tables ---

export const NAKSHATRAS = [
    { name: "Ashwini", lord: "Ketu", gana: "Deva", yoni: "Horse", nadi: "Aadi", varna: "Brahman", vasya: "Quadruped" },
    { name: "Bharani", lord: "Venus", gana: "Manushya", yoni: "Elephant", nadi: "Madhya", varna: "Brahman", vasya: "Quadruped" },
    { name: "Krittika", lord: "Sun", gana: "Rakshasa", yoni: "Sheep", nadi: "Antya", varna: "Brahman", vasya: "Quadruped" },
    { name: "Rohini", lord: "Moon", gana: "Manushya", yoni: "Serpent", nadi: "Antya", varna: "Brahman", vasya: "Quadruped" },
    { name: "Mrigashira", lord: "Mars", gana: "Deva", yoni: "Serpent", nadi: "Madhya", varna: "Brahman", vasya: "Quadruped" },
    { name: "Ardra", lord: "Rahu", gana: "Manushya", yoni: "Dog", nadi: "Aadi", varna: "Brahman", vasya: "Human" },
    { name: "Punarvasu", lord: "Jupiter", gana: "Deva", yoni: "Cat", nadi: "Aadi", varna: "Brahman", vasya: "Human" },
    { name: "Pushya", lord: "Saturn", gana: "Deva", yoni: "Sheep", nadi: "Madhya", varna: "Brahman", vasya: "Quadruped" },
    { name: "Ashlesha", lord: "Mercury", gana: "Rakshasa", yoni: "Cat", nadi: "Antya", varna: "Brahman", vasya: "Insect" },
    { name: "Magha", lord: "Ketu", gana: "Rakshasa", yoni: "Rat", nadi: "Antya", varna: "Kshatriya", vasya: "Quadruped" },
    { name: "Purva Phalguni", lord: "Venus", gana: "Manushya", yoni: "Rat", nadi: "Madhya", varna: "Kshatriya", vasya: "Quadruped" },
    { name: "Uttara Phalguni", lord: "Sun", gana: "Manushya", yoni: "Cow", nadi: "Aadi", varna: "Kshatriya", vasya: "Quadruped" },
    { name: "Hasta", lord: "Moon", gana: "Deva", yoni: "Buffalo", nadi: "Aadi", varna: "Vaishya", vasya: "Human" },
    { name: "Chitra", lord: "Mars", gana: "Rakshasa", yoni: "Tiger", nadi: "Madhya", varna: "Vaishya", vasya: "Human" },
    { name: "Svati", lord: "Rahu", gana: "Deva", yoni: "Buffalo", nadi: "Antya", varna: "Vaishya", vasya: "Human" },
    { name: "Vishakha", lord: "Jupiter", gana: "Rakshasa", yoni: "Tiger", nadi: "Antya", varna: "Vaishya", vasya: "Human" },
    { name: "Anuradha", lord: "Saturn", gana: "Deva", yoni: "Deer", nadi: "Madhya", varna: "Shudra", vasya: "Insect" },
    { name: "Jyeshtha", lord: "Mercury", gana: "Rakshasa", yoni: "Deer", nadi: "Aadi", varna: "Shudra", vasya: "Insect" },
    { name: "Mula", lord: "Ketu", gana: "Rakshasa", yoni: "Dog", nadi: "Aadi", varna: "Shudra", vasya: "Quadruped" },
    { name: "Purva Ashadha", lord: "Venus", gana: "Manushya", yoni: "Monkey", nadi: "Madhya", varna: "Shudra", vasya: "Human" },
    { name: "Uttara Ashadha", lord: "Sun", gana: "Manushya", yoni: "Mongoose", nadi: "Antya", varna: "Shudra", vasya: "Human" },
    { name: "Shravana", lord: "Moon", gana: "Deva", yoni: "Monkey", nadi: "Antya", varna: "Shudra", vasya: "Human" },
    { name: "Dhanishta", lord: "Mars", gana: "Rakshasa", yoni: "Lion", nadi: "Madhya", varna: "Shudra", vasya: "Quadruped" },
    { name: "Shatabhisha", lord: "Rahu", gana: "Rakshasa", yoni: "Horse", nadi: "Aadi", varna: "Shudra", vasya: "Human" },
    { name: "Purva Bhadrapada", lord: "Jupiter", gana: "Manushya", yoni: "Lion", nadi: "Aadi", varna: "Shudra", vasya: "Human" },
    { name: "Uttara Bhadrapada", lord: "Saturn", gana: "Manushya", yoni: "Cow", nadi: "Madhya", varna: "Shudra", vasya: "Quadruped" },
    { name: "Revati", lord: "Mercury", gana: "Deva", yoni: "Elephant", nadi: "Antya", varna: "Shudra", vasya: "Water" }
];

const RASHI_INFO = {
    "Aries": { vashya: "Quadruped", lord: "Mars", varna: "Kshatriya" },
    "Taurus": { vashya: "Quadruped", lord: "Venus", varna: "Vaishya" },
    "Gemini": { vashya: "Human", lord: "Mercury", varna: "Shudra" },
    "Cancer": { vashya: "Water", lord: "Moon", varna: "Brahman" },
    "Leo": { vashya: "Wild", lord: "Sun", varna: "Kshatriya" },
    "Virgo": { vashya: "Human", lord: "Mercury", varna: "Vaishya" },
    "Libra": { vashya: "Human", lord: "Venus", varna: "Shudra" },
    "Scorpio": { vashya: "Insect", lord: "Mars", varna: "Brahman" },
    "Sagittarius": { vashya: "Human", lord: "Jupiter", varna: "Kshatriya" },
    "Capricorn": { vashya: "Quadruped", lord: "Saturn", varna: "Vaishya" },
    "Aquarius": { vashya: "Human", lord: "Saturn", varna: "Shudra" },
    "Pisces": { vashya: "Water", lord: "Jupiter", varna: "Brahman" }
};

const YONI_COMPATIBILITY = {
    "Horse": { "Horse": 4, "Elephant": 2, "Sheep": 2, "Serpent": 1, "Dog": 0, "Cat": 2, "Rat": 1, "Cow": 3, "Buffalo": 3, "Tiger": 2, "Deer": 2, "Monkey": 3, "Mongoose": 2, "Lion": 1 },
    "Elephant": { "Horse": 2, "Elephant": 4, "Sheep": 3, "Serpent": 3, "Dog": 2, "Cat": 2, "Rat": 0, "Cow": 2, "Buffalo": 3, "Tiger": 1, "Deer": 2, "Monkey": 3, "Mongoose": 2, "Lion": 1 },
    "Sheep": { "Horse": 2, "Elephant": 3, "Sheep": 4, "Serpent": 2, "Dog": 1, "Cat": 3, "Rat": 1, "Cow": 3, "Buffalo": 3, "Tiger": 0, "Deer": 3, "Monkey": 1, "Mongoose": 2, "Lion": 1 },
    "Serpent": { "Horse": 1, "Elephant": 3, "Sheep": 2, "Serpent": 4, "Dog": 2, "Cat": 1, "Rat": 1, "Cow": 1, "Buffalo": 1, "Tiger": 2, "Deer": 2, "Monkey": 2, "Mongoose": 0, "Lion": 2 },
    "Dog": { "Horse": 0, "Elephant": 2, "Sheep": 1, "Serpent": 2, "Dog": 4, "Cat": 2, "Rat": 1, "Cow": 2, "Buffalo": 2, "Tiger": 1, "Deer": 1, "Monkey": 2, "Mongoose": 1, "Lion": 3 },
    "Cat": { "Horse": 2, "Elephant": 2, "Sheep": 3, "Serpent": 1, "Dog": 2, "Cat": 4, "Rat": 0, "Cow": 2, "Buffalo": 2, "Tiger": 1, "Deer": 3, "Monkey": 2, "Mongoose": 1, "Lion": 2 },
    "Rat": { "Horse": 1, "Elephant": 0, "Sheep": 1, "Serpent": 1, "Dog": 1, "Cat": 0, "Rat": 4, "Cow": 2, "Buffalo": 2, "Tiger": 1, "Deer": 2, "Monkey": 2, "Mongoose": 1, "Lion": 1 },
    "Cow": { "Horse": 3, "Elephant": 2, "Sheep": 3, "Serpent": 1, "Dog": 2, "Cat": 2, "Rat": 2, "Cow": 4, "Buffalo": 3, "Tiger": 0, "Deer": 3, "Monkey": 2, "Mongoose": 2, "Lion": 1 },
    "Buffalo": { "Horse": 3, "Elephant": 3, "Sheep": 3, "Serpent": 1, "Dog": 2, "Cat": 2, "Rat": 2, "Cow": 3, "Buffalo": 4, "Tiger": 1, "Deer": 2, "Monkey": 2, "Mongoose": 1, "Lion": 0 },
    "Tiger": { "Horse": 2, "Elephant": 1, "Sheep": 0, "Serpent": 2, "Dog": 1, "Cat": 1, "Rat": 1, "Cow": 0, "Buffalo": 1, "Tiger": 4, "Deer": 1, "Monkey": 1, "Mongoose": 2, "Lion": 1 },
    "Deer": { "Horse": 2, "Elephant": 2, "Sheep": 3, "Serpent": 2, "Dog": 1, "Cat": 3, "Rat": 2, "Cow": 3, "Buffalo": 2, "Tiger": 1, "Deer": 4, "Monkey": 2, "Mongoose": 2, "Lion": 1 },
    "Monkey": { "Horse": 3, "Elephant": 3, "Sheep": 1, "Serpent": 2, "Dog": 2, "Cat": 2, "Rat": 2, "Cow": 2, "Buffalo": 2, "Tiger": 1, "Deer": 2, "Monkey": 4, "Mongoose": 1, "Lion": 2 },
    "Mongoose": { "Horse": 2, "Elephant": 2, "Sheep": 2, "Serpent": 0, "Dog": 1, "Cat": 1, "Rat": 1, "Cow": 2, "Buffalo": 1, "Tiger": 2, "Deer": 2, "Monkey": 1, "Mongoose": 4, "Lion": 2 },
    "Lion": { "Horse": 1, "Elephant": 1, "Sheep": 1, "Serpent": 2, "Dog": 3, "Cat": 2, "Rat": 1, "Cow": 1, "Buffalo": 0, "Tiger": 1, "Deer": 1, "Monkey": 2, "Mongoose": 2, "Lion": 4 }
};

// Vasya Compatibility Matrix (Scores / 2)
// Types: Human, Quadruped, Water, Wild, Insect
const VASYA_SCORES = {
    "Human": { "Human": 2, "Quadruped": 1, "Water": 0.5, "Wild": 0, "Insect": 1 },
    "Quadruped": { "Human": 1, "Quadruped": 2, "Water": 1, "Wild": 0, "Insect": 1 }, // Wild eats Quadruped usually 0
    "Water": { "Human": 0.5, "Quadruped": 1, "Water": 2, "Wild": 1, "Insect": 1 },
    "Wild": { "Human": 0, "Quadruped": 0, "Water": 1, "Wild": 2, "Insect": 0 },
    "Insect": { "Human": 1, "Quadruped": 1, "Water": 1, "Wild": 0, "Insect": 2 }
};

// Friendship Table (5=Friend, 4=Neutral?, 0.5/0=Enemy?)
// Standard: Friend, Neutral, Enemy.
// Maitri calc: 
// Both Friend: 5
// Friend + Neutral: 4
// Both Neutral: 3
// Friend + Enemy: 1.5 (or 2) -> Let's stick to standard map
// Neutral + Enemy: 0.5 (or 1)
// Both Enemy: 0
const PLANET_FRIENDSHIP = {
    "Sun": { "Sun": "N", "Moon": "F", "Mars": "F", "Mercury": "N", "Jupiter": "F", "Venus": "E", "Saturn": "E" },
    "Moon": { "Sun": "F", "Moon": "N", "Mars": "N", "Mercury": "F", "Jupiter": "N", "Venus": "N", "Saturn": "N" }, // Moon has no enemies
    "Mars": { "Sun": "F", "Moon": "F", "Mars": "N", "Mercury": "E", "Jupiter": "F", "Venus": "N", "Saturn": "N" },
    "Mercury": { "Sun": "F", "Moon": "E", "Mars": "N", "Mercury": "N", "Jupiter": "N", "Venus": "F", "Saturn": "N" }, // Mercury dislikes Moon? Standard: Moon treats Merc as friend, Merc treats Moon as Enemy.
    "Jupiter": { "Sun": "F", "Moon": "F", "Mars": "F", "Mercury": "E", "Jupiter": "N", "Venus": "E", "Saturn": "N" },
    "Venus": { "Sun": "E", "Moon": "E", "Mars": "N", "Mercury": "F", "Jupiter": "N", "Venus": "N", "Saturn": "F" },
    "Saturn": { "Sun": "E", "Moon": "E", "Mars": "E", "Mercury": "F", "Jupiter": "N", "Venus": "F", "Saturn": "N" }
};

// Maitri Scoring 
const getMaitriScore = (lord1, lord2) => {
    const rel1 = PLANET_FRIENDSHIP[lord1][lord2];
    const rel2 = PLANET_FRIENDSHIP[lord2][lord1];

    // F=Friend, N=Neutral, E=Enemy
    if (rel1 === 'F' && rel2 === 'F') return 5;
    if ((rel1 === 'F' && rel2 === 'N') || (rel1 === 'N' && rel2 === 'F')) return 4;
    if (rel1 === 'N' && rel2 === 'N') return 3;
    if ((rel1 === 'F' && rel2 === 'E') || (rel1 === 'E' && rel2 === 'F')) return 1; // Or 1.5
    if ((rel1 === 'N' && rel2 === 'E') || (rel1 === 'E' && rel2 === 'N')) return 0.5;
    if (rel1 === 'E' && rel2 === 'E') return 0;
    return 0; // Fallback
};

const RASHI_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury", "Cancer": "Moon",
    "Leo": "Sun", "Virgo": "Mercury", "Libra": "Venus", "Scorpio": "Mars",
    "Sagittarius": "Jupiter", "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
};

const RASHIS_ORDER = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

// --- Core Helper Functions ---

export function getNakshatra(longitude) {
    const deg = (longitude % 360 + 360) % 360;
    const nakIndex = Math.floor(deg / (360 / 27));
    const rem = deg % (360 / 27);
    const pada = Math.floor(rem / (360 / 27 / 4)) + 1;

    return {
        ...NAKSHATRAS[nakIndex],
        index: nakIndex,
        pada: pada
    };
}

/**
 * Main Guna Milan Calculation engine
 */
export function calculateGunaMilan(bMoonLong, gMoonLong) {
    const bNak = getNakshatra(bMoonLong);
    const gNak = getNakshatra(gMoonLong);

    const bRashiIndex = Math.floor(bMoonLong / 30);
    const gRashiIndex = Math.floor(gMoonLong / 30);
    const bRashi = RASHIS_ORDER[bRashiIndex];
    const gRashi = RASHIS_ORDER[gRashiIndex];

    const results = {
        varna: { name: "Varna", max: 1, score: 0, b: bNak.varna, g: gNak.varna },
        vasya: { name: "Vasya", max: 2, score: 0, b: RASHI_INFO[bRashi].vashya, g: RASHI_INFO[gRashi].vashya },
        tara: { name: "Tara", max: 3, score: 0 },
        yoni: { name: "Yoni", max: 4, score: 0, b: bNak.yoni, g: gNak.yoni },
        maitri: { name: "Graha Maitri", max: 5, score: 0 },
        gana: { name: "Gana", max: 6, score: 0, b: bNak.gana, g: gNak.gana },
        bhakoot: { name: "Bhakoot", max: 7, score: 0 },
        nadi: { name: "Nadi", max: 8, score: 0, b: bNak.nadi, g: gNak.nadi },
        total: 0
    };

    // 1. Varna (1 Point) - RASHI BASED
    const bVarna = RASHI_INFO[bRashi].varna;
    const gVarna = RASHI_INFO[gRashi].varna;

    // Replace result objects to reflect correct Varna
    results.varna.b = bVarna;
    results.varna.g = gVarna;

    const varnaOrder = ["Shudra", "Vaishya", "Kshatriya", "Brahman"];
    if (varnaOrder.indexOf(bVarna) >= varnaOrder.indexOf(gVarna)) {
        results.varna.score = 1;
    }

    // 2. Vasya (2 Points) - NOW RASHI BASED
    const bVasya = RASHI_INFO[bRashi].vashya;
    const gVasya = RASHI_INFO[gRashi].vashya;
    results.vasya.score = VASYA_SCORES[bVasya] && VASYA_SCORES[bVasya][gVasya] !== undefined ? VASYA_SCORES[bVasya][gVasya] : 0;

    // 3. Tara (3 Points)
    const bTaraIdx = (gNak.index - bNak.index + 27) % 9;
    const gTaraIdx = (bNak.index - gNak.index + 27) % 9;
    const badTara = [2, 4, 6]; // 3rd, 5th, 7th (index 2, 4, 6)
    const isBTaraBad = badTara.includes(bTaraIdx);
    const isGTaraBad = badTara.includes(gTaraIdx);

    if (!isBTaraBad && !isGTaraBad) results.tara.score = 3;
    else if (isBTaraBad && isGTaraBad) results.tara.score = 0; // Both bad usually 0? Or 1.5? Standard: 1.5 if one valid. If both bad, probably 0 or 1.5? Actually often if one is bad logic applies. Let's keep 1.5 if one is okay. 
    else results.tara.score = 1.5;

    // 4. Yoni (4 Points)
    results.yoni.score = YONI_COMPATIBILITY[bNak.yoni][gNak.yoni] || 0;

    // 5. Graha Maitri (5 Points)
    const bLord = RASHI_LORDS[bRashi];
    const gLord = RASHI_LORDS[gRashi];
    results.maitri.score = getMaitriScore(bLord, gLord);

    // 6. Gana (6 Points)
    if (bNak.gana === gNak.gana) results.gana.score = 6;
    else if (bNak.gana === "Deva" && gNak.gana === "Manushya") results.gana.score = 6; // D-M is good? No, usually 6 or 5.
    else if (bNak.gana === "Manushya" && gNak.gana === "Deva") results.gana.score = 5; // M-D is 5.
    else if (bNak.gana === "Rakshasa" && gNak.gana === "Deva") results.gana.score = 1; // R-D is 1 (Astrotalk might have specific)
    else if (bNak.gana === "Deva" && gNak.gana === "Rakshasa") results.gana.score = 0; // D-R
    else if (bNak.gana === "Rakshasa" && gNak.gana === "Manushya") results.gana.score = 0; // R-M
    else if (bNak.gana === "Manushya" && gNak.gana === "Rakshasa") results.gana.score = 0; // M-R

    // Gana Corrections/Exceptions?
    // If Maitri is high, Gana dosha might be ignored. 
    // Standard Gana:
    // Same: 6
    // D-M: 6
    // M-D: 5
    // R-D: 1
    // D-R: 1 or 0
    // R-M: 0
    // M-R: 0

    // 7. Bhakoot (7 Points)
    // Distance (count from Boy to Girl? No, mutual count)
    // 1/1, 1/7, 2/12, 3/11, 4/10, 5/9, 6/8
    // Good: 1/1, 1/7 (Sama Saptaka), 3/11, 4/10
    // Bad: 2/12 (Dwidwadash), 5/9 (Navpancham), 6/8 (Shadashtak)

    // Dist calculation:
    // Count from Sign1 to Sign2 and Sign2 to Sign1.
    // e.g. Aries (1) to Virgo (6): 1->6 is 6. 6->1 is 8. -> 6/8 Shadashtak. (Bad)
    // Aries to Taurus: 1->2 is 2. 2->1 is 12. -> 2/12. (Bad)
    // Aries to Gemini: 1->3 is 3. 3->1 is 11. -> 3/11. (Good)

    let dist = (gRashiIndex - bRashiIndex + 12) % 12 + 1;
    // Normalize to the small-large pair e.g., 6/8 or 2/12
    let otherDist = (12 - dist + 2); // if dist 2, other is 12. If dist 6, other is 8.
    // Actually simpler:
    // Good distances: 1, 7, 3, 11, 4, 10
    // Bad distances: 2, 12, 5, 9, 6, 8

    const goodDist = [1, 7, 3, 11, 4, 10];
    const isBhakootGood = goodDist.includes(dist);

    if (isBhakootGood) {
        results.bhakoot.score = 7;
    } else {
        // Exceptions
        // 1. Same Lord (e.g. Aries-Scorpio is 6/8 but both Mars) -> Exception (7 points)
        // 2. Friendly Lords -> REMOVED for Strict Mode to match DrikPanchang
        if (bLord === gLord) {
            results.bhakoot.score = 7; // Exception applied for Same Lord only
        } else {
            results.bhakoot.score = 0;
        }
    }

    // 8. Nadi (8 Points)
    if (bNak.nadi !== gNak.nadi) {
        results.nadi.score = 8;
    } else {
        // Nadi Dosha Exception:
        // If Nakshatras same but Padas different? sometimes.
        // If Rashi same but Nakshatra different? 
        // If Lords same?
        // Basic: 0.
        results.nadi.score = 0;
    }

    // Edit Gana logic with explicit lookup if needed or stick to basic
    // Let's refine Gana D-M specifically:
    if (bNak.gana === "Deva" && gNak.gana === "Manushya") results.gana.score = 6;

    // Final Total
    results.total = results.varna.score + results.vasya.score + results.tara.score + results.yoni.score + results.maitri.score + results.gana.score + results.bhakoot.score + results.nadi.score;

    return results;
}

export function getManglikStatus(planets) {
    const mars = planets.find(p => p.name === "Mars");
    // Placeholder - Basic check needs house logic
    return { status: "Check manually", severity: 0 };
}
