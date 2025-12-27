import styles from "./Footer.module.css";
import { Star, ShieldCheck, Mail, Phone, MapPin, Instagram, Twitter, Youtube } from "lucide-react";
// Removed external dependency to prevent build errors. Using emojis for now.
// Safest bet matches current stack: text/svgs.

export default function Footer() {
    return (
        <footer className={styles.footer}>
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

            <div className={styles.content}>
                {/* Column 1: Brand */}
                <div className={styles.column}>
                    <h2 className={styles.brandTitle}>AstroWeb</h2>
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
                        <li><a href="#">Kundli Generation (Janampatri)</a></li>
                        <li><a href="#">Match Making (Gun Milan)</a></li>
                        <li><a href="#">Daily Horoscope</a></li>
                        <li><a href="#">Tarot Reading</a></li>
                        <li><a href="#">Vedic Panchang</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact (moved to 3rd position) */}
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>Contact Us</h3>
                    <ul className={styles.contactList}>
                        <li><MapPin size={18} color="#fbbf24" /> New Delhi, India</li>
                        <li><Mail size={18} color="#fbbf24" /> support@astroweb.com</li>
                        <li><Phone size={18} color="#fbbf24" /> +91 98765 43210</li>
                    </ul>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
                        <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
                        <a href="#" className={styles.socialIcon}><Youtube size={20} /></a>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} AstroWeb AI. All Rights Reserved.</p>
                <div className={styles.legalLinks}>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Disclaimer</a>
                </div>
            </div>
        </footer>
    );
}
