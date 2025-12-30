'use client';

import styles from "./Footer.module.css";
import { Star, ShieldCheck, Mail, Phone, MapPin, Instagram, Twitter, Youtube } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === '/services';

    return (
        <footer className={`${styles.footer} ${isHome ? styles.homeFooter : ''}`}>
            {/* Golden Top Border Effect */}
            <div className={styles.goldLine}></div>

            {/* Static Footer Garlands */}
            <img
                src="/NEW/MARIGOLD-footer.png"
                alt="Decorative Garland"
                className={`${styles.footerGarland} ${styles.left}`}
            />
            <img
                src="/NEW/MARIGOLD-footer.png"
                alt="Decorative Garland"
                className={`${styles.footerGarland} ${styles.right}`}
            />
            {/* Center Decorative Image */}
            <div className={styles.centerDecoration}>
                <img src="/newimg.png" alt="Sacred Scymbol" className={styles.centerImage} />
            </div>


            <div className={styles.content}>
                {/* Column 1: Brand */}
                <div className={styles.column}>
                    <h2 className={styles.brandTitle} style={{ fontSize: '1.8rem' }}>आचार्य पंडित राज कुमार तिवारी</h2>
                    <p className={styles.brandDesc}>
                        Bridging ancient Vedic wisdom with modern technology.
                        Your trusted guide for cosmic insights, birth charts, and spiritual growth.
                    </p>
                    <div className={styles.badgeContainer}>
                        {/* Trust Badges */}
                        <div className={styles.trustBadge}>
                            <Star size={16} color="#fbbf24" fill="#fbbf24" /> 100% Vedic
                        </div>
                        <div className={styles.trustBadge}>
                            <ShieldCheck size={16} color="#fbbf24" /> Secure Data
                        </div>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>Services</h3>
                    <ul className={styles.links}>
                        <li><a href="/services#kundli">Kundli Generation (Janampatri)</a></li>
                        <li><a href="/services#matchmaking">Match Making (Gun Milan)</a></li>
                        <li><a href="/services#horoscope">Daily Horoscope</a></li>
                        <li><a href="/services#tarot">Tarot Reading</a></li>
                        <li><a href="/services#panchang">Vedic Panchang</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact (moved to 3rd position) */}
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>Contact Us</h3>
                    <ul className={styles.contactList}>
                        <li><MapPin size={18} color="#fbbf24" /> Prayagraj, Uttar Pradesh, India</li>
                        <li><Mail size={18} color="#fbbf24" /> mishranarendra1208@gmail.com</li>
                        <li><Phone size={18} color="#fbbf24" /> +91 86010 42988</li>
                    </ul>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
                        <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
                        <a href="#" className={styles.socialIcon}><Youtube size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Developer Credits Section */}
            <div className={styles.developerCredits}>
                <p className={styles.devText}>
                    Designed and Developed with Spiritual Precision by <strong>Narendra Mishra</strong>
                </p>
                <div className={styles.devContact}>
                    <span>For technical guidance or inquiries</span>
                    <span className={styles.devSeparator}>•</span>
                    <a href="mailto:mishranarendra1208@gmail.com">mishranarendra1208@gmail.com</a>
                    <span className={styles.devSeparator}>•</span>
                    <a href="tel:+918375981566">+91 8375981566</a>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} आचार्य पंडित राज कुमार तिवारी. All Rights Reserved.</p>
                <div className={styles.legalLinks}>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Disclaimer</a>
                </div>
            </div>
        </footer>
    );
}
