'use client';

import React from 'react';
import styles from './legal.module.css';

export default function LegalPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Legal & Policies</h1>
                <h2 className={styles.subtitle}>कानूनी जानकारी और नीतियां</h2>
                <div className={styles.goldLine}></div>
            </div>

            <div className={styles.content}>

                {/* PRIVACY POLICY */}
                <section id="privacy" className={styles.section}>
                    <div className={styles.english}>
                        <h3>1. Privacy Policy</h3>
                        <p><strong>Effective Date:</strong> January 1, 2025</p>
                        <p>
                            At <strong>Acharya Pandit Raj Kumar Tiwari</strong>, we hold the sanctity of your personal and spiritual journey in the highest regard. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
                        </p>
                        <h4>Data Collection</h4>
                        <p>
                            We collect only the information necessary to provide accurate astrological readings and services. This includes your name, date of birth, time of birth, place of birth, and contact information. We do not sell, trade, or rent your personal identification information to others.
                        </p>
                        <h4>Data Security</h4>
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal information. Your data is treated with the same reverence as a confession; it is kept strictly confidential and used solely for the purpose of your consultation.
                        </p>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.hindi}>
                        <h3>1. गोपनीयता नीति (Privacy Policy)</h3>
                        <p><strong>प्रभावी तिथि:</strong> 1 जनवरी, 2025</p>
                        <p>
                            <strong>आचार्य पंडित राज कुमार तिवारी</strong> में, हम आपकी व्यक्तिगत और आध्यात्मिक यात्रा की पवित्रता का सर्वोच्च सम्मान करते हैं। हम आपकी गोपनीयता की रक्षा करने और यह सुनिश्चित करने के लिए प्रतिबद्ध हैं कि आपकी व्यक्तिगत जानकारी को सुरक्षित और जिम्मेदारी से संभाला जाए।
                        </p>
                        <h4>डेटा संग्रह</h4>
                        <p>
                            हम केवल सटीक ज्योतिषीय गणना और सेवाओं के लिए आवश्यक जानकारी ही एकत्र करते हैं। इसमें आपका नाम, जन्म तिथि, जन्म समय, जन्म स्थान और संपर्क जानकारी शामिल है। हम आपकी व्यक्तिगत पहचान की जानकारी किसी और को नहीं बेचते, व्यापार नहीं करते, या किराए पर नहीं देते।
                        </p>
                        <h4>डेटा सुरक्षा</h4>
                        <p>
                            हम आपकी व्यक्तिगत जानकारी की सुरक्षा बनाए रखने के लिए विभिन्न सुरक्षा उपाय लागू करते हैं। आपके डेटा को पूर्ण गोपनीयता के साथ रखा जाता है और इसका उपयोग केवल आपके परामर्श के उद्देश्य से किया जाता है।
                        </p>
                    </div>
                </section>

                {/* TERMS OF SERVICE */}
                <section id="terms" className={styles.section}>
                    <div className={styles.english}>
                        <h3>2. Terms of Service</h3>
                        <p>
                            By accessing specific consultative services from Acharya Pandit Raj Kumar Tiwari, you agree to the following terms. Our services are based on the ancient wisdom of Vedic Astrology.
                        </p>
                        <h4>Consultation Nature</h4>
                        <p>
                            Astrology is an interpretative science. While we strive for accuracy based on the details provided, readings are subject to interpretation. You agree that you are at least 18 years of age and understand that our services are for guidance and educational purposes.
                        </p>
                        <h4>User Responsibility</h4>
                        <p>
                            The guidance provided is intended to help you make informed decisions. However, the ultimate responsibility for your choices and actions remains solely with you. We are not liable for any direct or indirect consequences arising from the use of our services.
                        </p>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.hindi}>
                        <h3>2. सेवा की शर्तें (Terms of Service)</h3>
                        <p>
                            आचार्य पंडित राज कुमार तिवारी से विशिष्ट परामर्श सेवाओं का उपयोग करके, आप निम्नलिखित शर्तों से सहमत हैं। हमारी सेवाएं वैदिक ज्योतिष के प्राचीन ज्ञान पर आधारित हैं।
                        </p>
                        <h4>परामर्श की प्रकृति</h4>
                        <p>
                            ज्योतिष एक व्याख्यात्मक विज्ञान है। यद्यपि हम प्रदान किए गए विवरणों के आधार पर सटीकता का प्रयास करते हैं, फिर भी भविष्यवाणियां व्याख्या का विषय हैं। आप सहमत हैं कि आपकी आयु कम से कम 18 वर्ष है और आप समझते हैं कि हमारी सेवाएं मार्गदर्शन और शैक्षिक उद्देश्यों के लिए हैं।
                        </p>
                        <h4>उपयोगकर्ता की जिम्मेदारी</h4>
                        <p>
                            प्रदान किया गया मार्गदर्शन आपको सूचित निर्णय लेने में मदद करने के लिए है। हालांकि, आपके विकल्पों और कार्यों के लिए अंतिम जिम्मेदारी पूरी तरह से आपकी है। हम अपनी सेवाओं के उपयोग से उत्पन्न होने वाले किसी भी प्रत्यक्ष या अप्रत्यक्ष परिणाम के लिए उत्तरदायी नहीं हैं।
                        </p>
                    </div>
                </section>

                {/* DISCLAIMER */}
                <section id="disclaimer" className={styles.section}>
                    <div className={styles.english}>
                        <h3>3. Disclaimer</h3>
                        <p>
                            Astrology acts as a guide to the possibilities in one's life. It does not guarantee outcomes. The remedies, mantras, and pujas suggested are based on faith and ancient scriptures.
                        </p>
                        <h4>Not a Substitute for Professional Advice</h4>
                        <p>
                            Our consultations do not replace professional advice, including but not limited to medical, legal, or financial advice. We strongly encourage you to seek professional help for such matters. Treating astrology as a complementary guidance system rather than an absolute directive yields the best results.
                        </p>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.hindi}>
                        <h3>3. अस्वीकरण (Disclaimer)</h3>
                        <p>
                            ज्योतिष किसी के जीवन में संभावनाओं के लिए एक मार्गदर्शक के रूप में कार्य करता है। यह परिणामों की गारंटी नहीं देता है। सुझाए गए उपाय, मंत्र और पूजा आस्था और प्राचीन शास्त्रों पर आधारित हैं।
                        </p>
                        <h4>पेशेवर सलाह का विकल्प नहीं</h4>
                        <p>
                            हमारा परामर्श चिकित्सा, कानूनी या वित्तीय सलाह सहित (लेकिन इन तक सीमित नहीं) पेशेवर सलाह का स्थान नहीं लेता है। हम आपको ऐसे मामलों के लिए पेशेवर मदद लेने के लिए दृढ़ता से प्रोत्साहित करते हैं। ज्योतिष को एक पूर्ण निर्देश के बजाय एक पूरक मार्गदर्शन प्रणाली के रूप में मानना सर्वोत्तम परिणाम देता है।
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
