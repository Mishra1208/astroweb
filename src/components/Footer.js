'use client';

import styles from "./Footer.module.css";
import { Star, ShieldCheck, Mail, Phone, MapPin, Instagram } from "lucide-react";
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
                    <h2 className={styles.brandTitle} style={{ fontSize: '1.8rem', whiteSpace: 'nowrap', letterSpacing: '2px', paddingRight: '10px', width: 'fit-content' }}>आचार्य पंडित राज कुमार तिवारी</h2>
                    <p className={styles.brandDesc}>
                        आपकी हर समस्या का समाधान अब एक क्लिक दूर। आचार्य पंडित राज कुमार तिवारी जी के वर्षों के अनुभव और वैदिक ज्ञान से अपने जीवन को खुशहाल बनाएं। ज्योतिष, वास्तु और पूजा-पाठ के लिए सबसे विश्वसनीय स्थान।
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
                    <h3 className={styles.colTitle}>सेवाएं (शीघ्र उपलब्ध...)</h3>
                    <ul className={styles.links}>
                        <li><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>कुंडली निर्माण (जन्मपत्री)</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>गुण मिलान</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>दैनिक राशिफल</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>टैरो रीडिंग</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>वैदिक पंचांग</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact (moved to 3rd position) */}
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>संपर्क करें</h3>
                    <ul className={styles.contactList}>
                        <li><MapPin size={18} color="#fbbf24" /> प्रयागराज, उत्तर प्रदेश, भारत</li>
                        <li><Mail size={18} color="#fbbf24" /> tiwarirajkumar659@gmail.com</li>
                        <li><Phone size={18} color="#fbbf24" /> +91 86010 42988</li>
                    </ul>
                    <div className={styles.socials}>
                        <a href="https://www.instagram.com/karmkandirajkumartiwari?igsh=MXV6b3B0b2x3Z25lOA==" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Instagram size={24} />
                        </a>
                        <a href="tel:+918601042988" className={styles.socialIcon}>
                            <Phone size={24} />
                        </a>
                        <a href="mailto:tiwarirajkumar659@gmail.com" className={styles.socialIcon}>
                            <Mail size={24} />
                        </a>
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
                    <a href="/legal#privacy">Privacy Policy</a>
                    <a href="/legal#terms">Terms of Service</a>
                    <a href="/legal#disclaimer">Disclaimer</a>
                </div>
            </div>
        </footer>
    );
}
