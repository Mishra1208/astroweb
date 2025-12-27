import { NextResponse } from 'next/server';

const API_KEY = process.env.VEDIC_API_KEY;
const BASE_URL = "https://api.vedicastroapi.com/v3-json/prediction/daily-sun";

const zodiacMap = {
    "Aries": 1,
    "Taurus": 2,
    "Gemini": 3,
    "Cancer": 4,
    "Leo": 5,
    "Virgo": 6,
    "Libra": 7,
    "Scorpio": 8,
    "Sagittarius": 9,
    "Capricorn": 10,
    "Aquarius": 11,
    "Pisces": 12
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sign = searchParams.get('sign');
    const zodiacNumber = zodiacMap[sign];

    if (!zodiacNumber) {
        return NextResponse.json({ error: 'Invalid Zodiac Sign' }, { status: 400 });
    }

    try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const dateStr = `${dd}/${mm}/${yyyy}`;

        const url = `${BASE_URL}?zodiac=${zodiacNumber}&show_same=true&api_key=${API_KEY}&lang=hi&split=true&type=big&date=${dateStr}`;

        // Server-side fetch (no CORS issues)
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === 200 && data.response) {
            const resp = data.response;
            const predictionText = resp.bot_response?.total_score?.split_response ||
                resp.bot_response?.status?.split_response ||
                "आज के लिए कोई भविष्यवाणी उपलब्ध नहीं है।";

            return NextResponse.json({
                text: predictionText,
                mood: resp.lucky_color ? `शुभ रंग: ${resp.lucky_color}` : "शुभ",
                color: resp.lucky_color_code || "gold",
                chakra: resp.lucky_number ? `लकी नंबर: ${resp.lucky_number.join(", ")}` : "",
                isLive: true
            });
        } else {
            throw new Error("External API Error");
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
