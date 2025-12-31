const { MakeTime, SiderealTime } = require('astronomy-engine');

const date = new Date();
const time = MakeTime(date);

console.log("Testing SiderealTime with 'time' object:");
try {
    const result = SiderealTime(time);
    console.log("Success with time object:", result);
} catch (e) {
    console.log("Failed with time object:", e.message);
}

console.log("\nTesting SiderealTime with 'date' object:");
try {
    const result = SiderealTime(date);
    console.log("Success with date object:", result);
} catch (e) {
    console.log("Failed with date object:", e.message);
}
