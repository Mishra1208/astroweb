'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function CitySearch({ onCitySelect, defaultCity = "Prayagraj" }) {
    const [query, setQuery] = useState(defaultCity);
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    // Convert Country Code to Flag Emoji
    const getFlagEmoji = (countryCode) => {
        if (!countryCode) return "🌍";
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    };

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length >= 2 && isOpen) {
                fetchCities(query);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query, isOpen]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchCities = async (searchText) => {
        setLoading(true);
        try {
            // Using Open-Meteo Geocoding API (Free, No Key)
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${searchText}&count=5&language=en&format=json`
            );
            const data = await response.json();

            if (data.results) {
                setResults(data.results);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("City fetch failed:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (city) => {
        setQuery(city.name);
        setIsOpen(false);

        // Construct standard object for parent
        onCitySelect({
            name: city.name,
            lat: city.latitude,
            lng: city.longitude,
            timezone: city.timezone || "Asia/Kolkata", // Fallback if missing
            country: city.country,
            admin1: city.admin1
        });
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="शहर खोजें (Search City)..."
                    style={{
                        width: '100%',
                        padding: '0.8rem 1rem 0.8rem 2.5rem',
                        background: '#221100',
                        border: '1px solid #553311',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '1rem'
                    }}
                />
                <Search
                    size={18}
                    color="#fbbf24"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
            </div>

            {isOpen && query.length >= 2 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#1a1005',
                    border: '1px solid #553311',
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                    zIndex: 1000,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    {loading ? (
                        <div style={{ padding: '1rem', textAlign: 'center', opacity: 0.7 }}>
                            खोज रहा है... ⏳
                        </div>
                    ) : results.length > 0 ? (
                        results.map((city) => (
                            <div
                                key={city.id}
                                onClick={() => handleSelect(city)}
                                style={{
                                    padding: '0.8rem 1rem',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #332211',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#332211'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{getFlagEmoji(city.country_code)}</span>
                                <div>
                                    <div style={{ color: '#EFE6D8', fontWeight: '500' }}>{city.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#fbbf24', opacity: 0.8 }}>
                                        {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '1rem', textAlign: 'center', opacity: 0.5 }}>
                            कोई शहर नहीं मिला (No results)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
