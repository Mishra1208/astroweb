'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, CheckCircle, AlertCircle, Info, ChevronRight, Calculator, HeartCrack } from 'lucide-react';

import CitySearch from '@/components/CitySearch';
import { getVedicChartData } from '@/utils/vedicAstro';
import { calculateGunaMilan } from '@/utils/matchMaking';
import styles from './matching.module.css';

const KUTA_DESCRIPTIONS = {
    varna: "दंपति की कार्य क्षमता और आध्यात्मिक अनुकूलता।",
    vasya: "आपसी आकर्षण, वशीकरण और नियंत्रण शक्ति।",
    tara: "जन्म नक्षत्र अनुकूलता, भाग्य और स्वास्थ्य।",
    yoni: "शारीरिक आकर्षण, अंतरंगता और यौन अनुकूलता।",
    maitri: "राशियों के स्वामी ग्रहों के बीच मित्रता और मानसिक स्नेह।",
    gana: "स्वभाव, व्यवहार और चरित्र का मिलान (देव, मनुष्य, राक्षस)।",
    bhakoot: "रिश्ते में भावनात्मक जुड़ाव, समृद्धि और सुख-शांति।",
    nadi: "स्वास्थ्य, आनुवंशिकी और वंश वृद्धि की अनुकूलता (अतीव महत्वपूर्ण)।"
};

const RingsHeartIcon = ({ size = 48, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Rings */}
        <circle cx="35" cy="65" r="22" stroke="#fbbf24" strokeWidth="6" />
        <circle cx="65" cy="65" r="22" stroke="#fbbf24" strokeWidth="6" />

        {/* Heart */}
        <path
            d="M50 20 C62 8 80 15 80 32 C80 48 50 65 50 65 C50 65 20 48 20 32 C20 15 38 8 50 20 Z"
            fill="#ec4899"
            stroke="#ec4899"
            strokeWidth="2"
        />
    </svg>
);

const KUTA_NAMES = {
    varna: "वर्ण",
    vasya: "वश्य",
    tara: "तारा",
    yoni: "योनि",
    maitri: "गृह मैत्री",
    gana: "गण",
    bhakoot: "भकूट",
    nadi: "नाड़ी"
};

export default function MatchMakingPage() {
    const [boyData, setBoyData] = useState({
        name: '',
        date: '',
        time: '',
        city: { name: 'Prayagraj', lat: 25.4358, lng: 81.8463 }
    });

    const [girlData, setGirlData] = useState({
        name: '',
        date: '',
        time: '',
        city: { name: 'Varanasi', lat: 25.3176, lng: 82.9739 }
    });

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        if (!boyData.date || !boyData.time || !girlData.date || !girlData.time) {
            alert("कृपया दोनों का जन्म विवरण भरें (Please fill all birth details)");
            return;
        }

        setLoading(true);
        try {
            // Calculate chart for both
            const bChart = getVedicChartData(`${boyData.date}T${boyData.time}`, boyData.city.lat, boyData.city.lng);
            const gChart = getVedicChartData(`${girlData.date}T${girlData.time}`, girlData.city.lat, girlData.city.lng);

            // Get Moon longitudes
            const bMoon = bChart.planets.find(p => p.name === 'Moon').vedic;
            const gMoon = gChart.planets.find(p => p.name === 'Moon').vedic;

            // Calculate Guna Milan
            const gunaResults = calculateGunaMilan(bMoon, gMoon);
            setResults(gunaResults);
        } catch (err) {
            console.error(err);
            alert("गणना में त्रुटि (Error in calculation)");
        } finally {
            setLoading(false);
        }
    };

    const getRecommendation = (total) => {
        if (total >= 18) return { text: total >= 25 ? "श्रेष्ठ मिलान (Excellent Match)" : "उत्तम मिलान (Good Match)", color: "#10b981", icon: RingsHeartIcon };
        return { text: "अधम मिलान (Low Compatibility)", color: "#ef4444", icon: HeartCrack };
    };

    return (
        <div className={styles.mainContainer}>


            <div className={styles.heroSection}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.title}
                >
                    अष्टकूट गुण मिलान
                </motion.h1>
                <p className={styles.subtitle}>Vedic Match Making for Divine Unions</p>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.inputGrid}>
                    {/* BOY INPUT */}
                    <div className={styles.inputCard}>
                        <div className={styles.cardHeader}>
                            <User size={24} color="#fbbf24" />
                            <h3>वर का विवरण (Boy's Details)</h3>
                        </div>
                        <div className={styles.formGroup}>
                            <label>नाम (Full Name)</label>
                            <input type="text" placeholder="Rahul..." value={boyData.name} onChange={e => setBoyData({ ...boyData, name: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>जन्म तिथि (Birth Date)</label>
                            <input type="date" value={boyData.date} onChange={e => setBoyData({ ...boyData, date: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>जन्म समय (Birth Time)</label>
                            <input type="time" value={boyData.time} onChange={e => setBoyData({ ...boyData, time: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>जन्म स्थान (Birth Place)</label>
                            <CitySearch onCitySelect={city => setBoyData({ ...boyData, city })} defaultCity={boyData.city.name} />
                        </div>
                    </div>

                    {/* GIRL INPUT */}
                    <div className={styles.inputCard}>
                        <div className={styles.cardHeader}>
                            <User size={24} color="#ef4444" />
                            <h3>कन्या का विवरण (Girl's Details)</h3>
                        </div>
                        <div className={styles.formGroup}>
                            <label>नाम (Full Name)</label>
                            <input type="text" placeholder="Simran..." value={girlData.name} onChange={e => setGirlData({ ...girlData, name: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>जन्म तिथि (Birth Date)</label>
                            <input type="date" value={girlData.date} onChange={e => setGirlData({ ...girlData, date: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>जन्म समय (Birth Time)</label>
                            <input type="time" value={girlData.time} onChange={e => setGirlData({ ...girlData, time: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>जन्म स्थान (Birth Place)</label>
                            <CitySearch onCitySelect={city => setGirlData({ ...girlData, city })} defaultCity={girlData.city.name} />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.calculateBtn}
                        onClick={handleCalculate}
                        disabled={loading}
                    >
                        {loading ? "गणना हो रही है..." : "मिलान जाँचें (Check Compatibility)"}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={styles.resultsSection}
                        >
                            <div className={styles.totalScoreCard}>
                                <div className={styles.scoreRing}>
                                    <svg viewBox="0 0 36 36">
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#332211" strokeWidth="2" strokeDasharray="100, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray={`${(results.total / 36) * 100}, 100`} strokeLinecap="round" />
                                    </svg>
                                    <div className={styles.scoreText}>
                                        <span className={styles.scoreNum}>{results.total}</span>
                                        <span className={styles.scoreDenom}>/ 36</span>
                                    </div>
                                </div>
                                <div className={styles.recommendation}>
                                    {(() => {
                                        const rec = getRecommendation(results.total);
                                        const Icon = rec.icon;
                                        return (
                                            <>
                                                <Icon size={32} color={rec.color} />
                                                <h2 style={{ color: rec.color }}>{rec.text}</h2>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className={styles.kutaGrid}>
                                {Object.entries(results).filter(([k]) => k !== 'total').map(([key, data]) => (
                                    <div key={key} className={styles.kutaCard}>
                                        <div className={styles.kutaLine}>
                                            <span className={styles.kutaLabel}>{KUTA_NAMES[key] || data.name}</span>
                                            <span className={styles.kutaPoints}>{data.score} / {data.max}</span>
                                        </div>
                                        <div className={styles.kutaBar}>
                                            <div className={styles.kutaProgress} style={{ width: `${(data.score / data.max) * 100}%`, background: data.score === data.max ? '#10b981' : (data.score === 0 ? '#ef4444' : '#fbbf24') }}></div>
                                        </div>
                                        <p className={styles.kutaDesc}>{KUTA_DESCRIPTIONS[key]}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


        </div>
    );
}
