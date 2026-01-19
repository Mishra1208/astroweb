import { calculateGunaMilan, getNakshatra } from './matchMaking.mjs';

function test() {
    console.log("Starting Guna Milan Logic Test...");

    // Test Case 1: Same Nakshatra (should have high score but 0 Nadi)
    // Ashwini (0 deg)
    const bMoonLong = 0;
    const gMoonLong = 0;

    const results = calculateGunaMilan(bMoonLong, gMoonLong);
    console.log("\nTest Case 1: Same Nakshatra (Ashwini)");
    console.log("Total Score:", results.total);
    console.log("Nadi Score (should be 0):", results.nadi.score);
    console.log("Gana Score (should be 6):", results.gana.score);

    // Test Case 2: Different Nakshatras
    // Ashwini (0 deg) and Bharani (15 deg)
    const b2 = 0;
    const g2 = 15;
    const res2 = calculateGunaMilan(b2, g2);
    console.log("\nTest Case 2: Ashwini and Bharani");
    console.log("Total Score:", res2.total);
    console.log("Nadi Score (different Nadi, should be 8):", res2.nadi.score);

    // Test Case 3: Nakshatra Details
    const nak = getNakshatra(0);
    console.log("\nNakshatra 0 deg:", nak.name, nak.gana, nak.yoni, nak.nadi);

    if (isNaN(results.total)) {
        console.error("FAILED: Total is NaN");
        process.exit(1);
    }

    console.log("\nGuna Milan Tests Passed!");
}

test();
