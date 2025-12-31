import { NextResponse } from 'next/server';
import { getVedicChartData } from '@/utils/vedicAstro';

export async function GET() {
    // Test Date: User's current time (Dec 31, 2025)
    // Test Location: New Delhi (Lat: 28.6139, Lng: 77.2090)
    const date = new Date().toISOString();
    const lat = 28.6139;
    const lng = 77.2090;

    try {
        const data = getVedicChartData(
            new Date(), // Use current time
            lat,
            lng
        );
        return NextResponse.json({
            status: 'success',
            testParams: { date, lat, lng },
            data
        });
    } catch (e) {
        return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 });
    }
}
