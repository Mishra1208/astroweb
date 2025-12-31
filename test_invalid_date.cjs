const { MakeTime, SiderealTime } = require('astronomy-engine');

console.log("Testing Invalid Date:");
const invalidDate = new Date("foo");
console.log("Date object:", invalidDate.toString());

try {
    const time = MakeTime(invalidDate);
    console.log("MakeTime result:", time);
    SiderealTime(time);
} catch (e) {
    console.log("Error caught:", e.message);
    if (e.stack) console.log(e.stack);
}
