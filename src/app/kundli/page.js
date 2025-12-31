'use client';

import { useState, useEffect, Suspense } from 'react';
import { getVedicChartData } from '@/utils/vedicAstro';
import LaganChart from '@/components/LaganChart';
import styles from './kundli.module.css';
import CitySearch from '@/components/CitySearch';

import { useSearchParams } from 'next/navigation';

// Helper to convert IANA Timezone (e.g. "Asia/Kolkata") to Offset (e.g. 5.5)
const getOffsetFromTimezone = (timeZone) => {
    try {
        const now = new Date();
        const tzString = now.toLocaleString('en-US', { timeZone });
        const localDate = new Date(tzString);
        const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        return (localDate - utcDate) / 3600000;
    } catch (e) {
        console.error("Timezone Parse Error:", e);
        return 5.5; // Default IST
    }
};

function KundliContent() {
    // Default: Prayagraj
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        lat: 25.4358,
        lng: 81.8463,
        city: "Prayagraj",
        timezoneOffset: 5.5,
        country: "India"
    });

    // For reading query parameters
    const searchParams = useSearchParams();

    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for Query Params (Redirect from FindMySign)
        const qDate = searchParams.get('date');
        const qTime = searchParams.get('time');
        const qLat = searchParams.get('lat');
        const qLng = searchParams.get('lng');
        const qCity = searchParams.get('city');
        const qTz = searchParams.get('tz');

        if (qDate && qTime && qLat && qLng) {
            console.log("Auto-calculating from Query Params...");
            const newData = {
                date: qDate,
                time: qTime,
                lat: parseFloat(qLat),
                lng: parseFloat(qLng),
                city: qCity || "Selected Location",
                timezoneOffset: qTz ? parseFloat(qTz) : 5.5,
                country: "India" // Default or could be passed
            };
            setFormData(newData);

            // Trigger calculation immediately with this new data
            // We need to pass the data directly because state update is async
            calculateChart(newData);
        } else {
            // Default load behavior (current time/place)
            calculateChart(formData);
        }
    }, [searchParams]); // Re-run if params change

    // Modified calculateChart to accept optional overrides (for immediate effect)
    const calculateChart = (overrideData = null) => {
        const dataToUse = overrideData || formData;

        try {
            // Manual Timezone Construction to ensure accuracy regardless of Browser Locale
            const [year, month, day] = dataToUse.date.split('-').map(Number);
            const [hours, minutes] = dataToUse.time.split(':').map(Number);

            // Create UTC Date
            const dateUTC = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

            // Adjust for Timezone
            const offsetMs = dataToUse.timezoneOffset * 60 * 60 * 1000;
            const trueDateCheck = new Date(dateUTC.getTime() - offsetMs);

            console.log(`Calculating for: ${dataToUse.city} (TZ: ${dataToUse.timezoneOffset})`);

            const data = getVedicChartData(trueDateCheck.toISOString(), dataToUse.lat, dataToUse.lng);
            setChartData(data);
            setError(null);
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler for Dynamic City Search
    const handleCitySelect = (cityData) => {
        const offset = getOffsetFromTimezone(cityData.timezone);
        setFormData({
            ...formData,
            city: cityData.name,
            lat: cityData.lat,
            lng: cityData.lng,
            timezoneOffset: offset,
            country: cityData.country
        });
    };

    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f0804 0%, #1a1005 100%)',
            color: '#EFE6D8',
            padding: '12rem 2rem 8rem 2rem', // Increased top padding for fixed navbar
            fontFamily: 'serif',
            position: 'relative',
            zIndex: 1 // Ensure it sits under footer's high z-index elements if needed
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#fbbf24', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
                    वैदिक लग्न कुंडली
                </h1>

                {/* --- Input Form --- */}
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '2rem',
                    borderRadius: '16px',
                    marginBottom: '3rem',
                    border: '1px solid #332211',
                    maxWidth: '800px',
                    margin: '0 auto 3rem auto' // Keep form centered and reasonable width
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.8rem', color: '#fbbf24', fontSize: '1.1rem' }}>जन्म तिथि</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', background: '#221100', border: '1px solid #553311', color: '#fff', borderRadius: '8px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.8rem', color: '#fbbf24', fontSize: '1.1rem' }}>जन्म समय</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', background: '#221100', border: '1px solid #553311', color: '#fff', borderRadius: '8px' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', color: '#fbbf24', fontSize: '1.1rem' }}>स्थान</label>
                        {/* Dynamic City Search Component */}
                        <CitySearch
                            onCitySelect={handleCitySelect}
                            defaultCity={formData.city}
                        />

                        <div style={{ marginTop: '0.8rem', fontSize: '0.9rem', opacity: 0.7 }}>
                            {formData.city}, {formData.country}: {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)} (TZ: {formData.timezoneOffset >= 0 ? '+' : ''}{formData.timezoneOffset})
                        </div>
                    </div>

                    <button
                        onClick={calculateChart}
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: 'linear-gradient(to right, #fbbf24, #d97706)',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1.3rem',
                            transition: 'transform 0.2s'
                        }}
                    >
                        कुंडली बनाएं
                    </button>
                </div>

                {/* --- Error Message --- */}
                {error && (
                    <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)' }}>
                        त्रुटि: {error}
                    </div>
                )}

                {/* --- Results --- */}
                {chartData && !error && (
                    <div style={{ animation: 'fadeIn 0.5s ease' }}>
                        <LaganChart
                            ascendantSign={chartData.ascendant.rashi.id}
                            planets={chartData.planets}
                        />

                        <div style={{
                            marginTop: '3rem',
                            background: 'rgba(0,0,0,0.4)',
                            padding: '2rem',
                            borderRadius: '16px',
                            textAlign: 'center',
                            border: '1px solid #443322'
                        }}>
                            <h3 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '2rem' }}>गणना विवरण</h3>
                            {/* --- New Date Confirmation --- */}
                            <p style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#d1fae5', borderBottom: '1px solid #332211', paddingBottom: '1rem' }}>
                                कुंडली गणना समय: <br />
                                <strong>{new Date(chartData.dateInput).toLocaleString()}</strong>
                            </p>
                            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                                अक्षांश/देशांतर: {chartData.lat.toFixed(4)} N, {chartData.lng.toFixed(4)} E
                            </p>

                            <p style={{ fontSize: '1.5rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
                                <strong>लग्न:</strong> {chartData.ascendant.rashi.hi} ({chartData.ascendant.vedic.toFixed(2)}°)
                            </p>
                            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}><strong>अयनांश (लाहिड़ी):</strong> {chartData.ayanamsa.toFixed(4)}°</p>

                            {/* Swipe Hint */}
                            <p className={styles.swipeHint}>
                                ← स्वाइप करें →
                            </p>

                            {/* Updated Planet Grid: Flexbox for Single Line */}
                            <div className={styles.planetContainer}>
                                {chartData.planets.map(p => (
                                    <div key={p.name} style={{
                                        border: '1px solid #553311',
                                        background: 'rgba(20, 10, 5, 0.6)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        minWidth: '100px',
                                        flex: '1'
                                    }}>
                                        <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.3rem' }}>{p.hi}</div>
                                        <div style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{p.rashi.hi}</div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{p.vedic.toFixed(2)}°</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </main>
    );
}

export default function VedicDemoPage() {
    return (
        <Suspense fallback={<div style={{color: '#fbbf24', textAlign: 'center', padding: '10rem'}}>Loading Kundli...</div>}>
            <KundliContent />
        </Suspense>
    );
}
