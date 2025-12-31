import { getVedicChartData } from './src/utils/vedicAstro.js';

const date = new Date(); // now
// Delhi Lat/Long
const lat = 28.6139;
const lng = 77.2090;

console.log("Testing Vedic Calc for:", date.toISOString());
try {
    const data = getVedicChartData(date, lat, lng);
    console.log(JSON.stringify(data, null, 2));
} catch (e) {
    console.error(e);
}
