const { MakeTime, e_tilt } = require('astronomy-engine');

const date = new Date();
const time = MakeTime(date);
const tilt = e_tilt(time);

console.log("e_tilt result:", tilt);
