
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sign = searchParams.get('sign')?.toLowerCase();
    const time = searchParams.get('time')?.toLowerCase() || 'today';

    if (!sign) {
        return NextResponse.json({ error: 'Sign is required' }, { status: 400 });
    }

    const signMap = {
        aries: { slug: 'aries', field: 'rashiAries' },
        taurus: { slug: 'taurus', field: 'rashiTaurus' },
        gemini: { slug: 'gemini', field: 'rashiGemini' },
        cancer: { slug: 'cancer', field: 'rashiCancer' },
        leo: { slug: 'leo', field: 'rashiLeo' },
        virgo: { slug: 'virgo', field: 'rashiVirgo' },
        libra: { slug: 'libra', field: 'rashiLibra' },
        scorpio: { slug: 'scorpio', field: 'rashiScorpio' },
        sagittarius: { slug: 'sagittarius', field: 'rashiSagittarius' },
        capricorn: { slug: 'capricorn', field: 'rashiCapricorn' },
        aquarius: { slug: 'aquarius', field: 'rashiAquarius' },
        pisces: { slug: 'pisces', field: 'rashiPisces' }
    };

    const config = signMap[sign];
    if (!config) {
        return NextResponse.json({ error: 'Invalid sign' }, { status: 400 });
    }

    try {
        let prediction = '';

        if (time === 'tomorrow') {
            // Tomorrow is special: use the background API for instant accurate data
            const apiUrl = `https://api.livehindustan.com/api/astrology/horoscope?zodiac=${config.slug}&dayType=tomorrow`;
            const apiRes = await fetch(apiUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                next: { revalidate: 3600 }
            });
            const apiData = await apiRes.json();
            // The API returns an array, usually first element or direct object
            const dataObj = Array.isArray(apiData) ? apiData[0] : apiData;
            prediction = dataObj[config.field] || 'Prediction not found in API';
        } else {
            let url;
            if (time === 'weekly') {
                url = `https://www.livehindustan.com/astrology/rashifal/saptahik/${config.slug}`;
            } else if (time === 'monthly') {
                url = `https://www.livehindustan.com/astrology/rashifal/masik/${config.slug}`;
            } else {
                url = `https://www.livehindustan.com/astrology/rashifal/${config.slug}`;
            }

            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                next: { revalidate: 3600 }
            });

            if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

            const html = await response.text();
            const $ = cheerio.load(html);
            // First paragraph in the tab panel is the main prediction
            prediction = $('.astro_tabPanelItem p').first().text().trim();
        }

        if (!prediction) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        return NextResponse.json({
            sign: sign,
            text: prediction,
            time: time,
            source: 'LiveHindustan',
            readMoreUrl: `https://www.livehindustan.com/tags/${config.slug}-zodiac`,
            isLive: true,
            date: new Date().toLocaleDateString('hi-IN')
        });

    } catch (error) {
        console.error('Scraping Error:', error);
        return NextResponse.json({ error: 'Failed to fetch prediction' }, { status: 500 });
    }
}
