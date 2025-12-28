'use client';

import { motion } from 'framer-motion';
import styles from './acharya.module.css';
import { MapPin, Phone, Calendar, Star, Sun, Moon, Heart } from 'lucide-react';
import Image from 'next/image';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export default function AcharyaPage() {
    return (
        <main className={styles.container}>
            {/* Hero Section */}
            <motion.section
                className={styles.hero}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className={styles.profileFrame} variants={itemVariants}>
                    {/* Using the renamed profile image */}
                    <Image
                        src="/aacharya/profile.jpg"
                        alt="आचार्य पंडित राज कुमार"
                        fill
                        className={styles.profileImage}
                    />
                </motion.div>

                <motion.h1 className={styles.name} variants={itemVariants}>
                    आचार्य पंडित राज कुमार
                </motion.h1>

                <motion.p className={styles.title} variants={itemVariants}>
                    वैदिक ज्योतिषी और अनुष्ठान विशेषज्ञ
                </motion.p>

                <motion.div className={styles.location} variants={itemVariants}>
                    <MapPin size={18} color="#fbbf24" />
                    <span>प्रतापगढ़, उत्तर प्रदेश, भारत</span>
                </motion.div>
            </motion.section>

            {/* Biography Section */}
            <section className={styles.section}>
                <motion.div
                    className={styles.bioContainer}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p>
                        "सनातन धर्म केवल एक धर्म नहीं है, यह जीवन जीने की एक कला है जो हमें ब्रह्मांड से जोड़ती है।"
                    </p>
                    <br />
                    <p>
                        प्रतापगढ़ की ऐतिहासिक भूमि में स्थित, आचार्य पंडित राज कुमार ने अपना जीवन वैदिक परंपराओं के संरक्षण और अभ्यास के लिए समर्पित कर दिया है। ज्योतिष शास्त्र और वैदिक अनुष्ठानों (कर्मकांड) के गहरे ज्ञान के साथ, वे व्यक्तियों को आध्यात्मिक और सांसारिक समृद्धि की ओर मार्गदर्शन करते हैं। उनका दृष्टिकोण आधुनिक जीवन की चुनौतियों के लिए प्राचीन ज्ञान को व्यावहारिक समाधानों के साथ जोड़ता है।
                    </p>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className={styles.section}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>आध्यात्मिक सेवाएँ</h2>
                </div>

                <div className={styles.grid}>
                    {[
                        { title: "जन्मपत्री और कुंडली", icon: "📜", desc: "वैदिक सिद्धांतों पर आधारित विस्तृत जन्म चार्ट विश्लेषण और भविष्य की भविष्यवाणियां।" },
                        { title: "विवाह संस्कार", icon: "🔥", desc: "गुण मिलान और मांगलिक दोष निवारण पर केंद्रित पारंपरिक विवाह समारोह।" },
                        { title: "ग्रह शांति पूजा", icon: "✨", desc: "ग्रहों के प्रभाव को शांत करने और आपके घर में शांति लाने के लिए अनुष्ठान।" },
                        { title: "वास्तु परामर्श", icon: "🏠", desc: "ब्रह्मांडीय ऊर्जाओं के साथ आपके रहने और कार्य करने के स्थानों को संतुलित करना।" },
                        { title: "रुद्राभिषेक", icon: "🕉️", desc: "स्वास्थ्य, धन और समृद्धि के लिए भगवान शिव का पवित्र अभिषेक समारोह।" },
                        { title: "महा मृत्युंजय", icon: "🙌", desc: "दीर्घायु और गंभीर स्वास्थ्य समस्याओं पर विजय पाने के लिए शक्तिशाली मंत्र जप।" }
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <span className={styles.cardIcon}>{service.icon}</span>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Past Works Gallery */}
            <section className={styles.section}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>समारोहों की झलकियां</h2>
                </div>

                <div className={styles.galleryGrid}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <motion.div
                            key={num}
                            className={styles.galleryItem}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: num * 0.1 }}
                        >
                            <Image
                                src={`/aacharya/work-${num}.jpg`}
                                alt={`Ceremony ${num}`}
                                width={400}
                                height={300}
                                className={styles.galleryImage}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.section}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>आचार्य जी से संपर्क करें</h2>
                </div>

                <div className={styles.contactContainer}>
                    <div className={styles.contactCard}>
                        <div className={styles.contactLabel}>नियुक्ति (Appointment) के लिए</div>
                        <div className={styles.contactValue}>
                            <Phone size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} color="#fbbf24" />
                            +91 98765 43210
                        </div>
                        <p style={{ color: '#d6d3d1', marginTop: '1rem', fontSize: '0.9rem' }}>
                            उपलब्ध: सुबह 9:00 - शाम 7:00 <br />
                            (कृपया बुकिंग के लिए व्हाट्सएप करें)
                        </p>
                    </div>

                    <div className={styles.contactCard}>
                        <div className={styles.contactLabel}>स्थान</div>
                        <div className={styles.contactValue}>
                            <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} color="#fbbf24" />
                            प्रतापगढ़, उत्तर प्रदेश
                        </div>
                        <p style={{ color: '#d6d3d1', marginTop: '1rem', fontSize: '0.9rem' }}>
                            मुख्य मंदिर के पास, सिविल लाइन्स <br />
                            उत्तर प्रदेश, भारत
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
