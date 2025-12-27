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
                        alt="Acharya Pandit Raj Kumar"
                        fill
                        className={styles.profileImage}
                    />
                </motion.div>

                <motion.h1 className={styles.name} variants={itemVariants}>
                    Acharya Pandit Raj Kumar
                </motion.h1>

                <motion.p className={styles.title} variants={itemVariants}>
                    Vedic Astrologer & Ritual Specialist
                </motion.p>

                <motion.div className={styles.location} variants={itemVariants}>
                    <MapPin size={18} color="#fbbf24" />
                    <span>Pratapgarh, Uttar Pradesh, India</span>
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
                        "Sanatan Dharma is not just a religion, it is a way of life that connects us to the cosmos."
                    </p>
                    <br />
                    <p>
                        Based in the historic land of Pratapgarh, Acharya Pandit Raj Kumar has dedicated his life to the preservation and practice of Vedic traditions. With deep knowledge of Astrology (Jyotish Shastra) and Vedic Rituals (Karmakand), he guides individuals towards spiritual growth and worldly prosperity. His approach combines ancient wisdom with practical solutions for modern life challenges.
                    </p>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className={styles.section}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>Spiritual Services</h2>
                </div>

                <div className={styles.grid}>
                    {[
                        { title: "Janampatri & Kundli", icon: "📜", desc: "Detailed birth chart analysis and future predictions based on Vedic principles." },
                        { title: "Vivah Sanskar", icon: "🔥", desc: "Traditional marriage ceremonies focusing on Gun Milan and Mangal Dosha Nivaran." },
                        { title: "Grah Shanti Puja", icon: "✨", desc: "Rituals to appease planetary influences and bring peace to your home." },
                        { title: "Vastu Consultation", icon: "🏠", desc: "Harmonizing your living and work spaces with universal energies." },
                        { title: "Rudrabhishek", icon: "🕉️", desc: "Sacred bathing ceremony of Lord Shiva for health, wealth, and prosperity." },
                        { title: "Maha Mrityunjaya", icon: "🙌", desc: "Powerful chanting rituals for longevity and overcoming dire health issues." }
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
                    <h2 className={styles.sectionTitle}>Glimpses of Ceremonies</h2>
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
                    <h2 className={styles.sectionTitle}>Connect with Acharya Ji</h2>
                </div>

                <div className={styles.contactContainer}>
                    <div className={styles.contactCard}>
                        <div className={styles.contactLabel}>For Appointments</div>
                        <div className={styles.contactValue}>
                            <Phone size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} color="#fbbf24" />
                            +91 98765 43210
                        </div>
                        <p style={{ color: '#a8a29e', marginTop: '1rem', fontSize: '0.9rem' }}>
                            Available Daily: 9:00 AM - 7:00 PM <br />
                            (Please WhatsApp for bookings)
                        </p>
                    </div>

                    <div className={styles.contactCard}>
                        <div className={styles.contactLabel}>Location</div>
                        <div className={styles.contactValue}>
                            <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} color="#fbbf24" />
                            Pratapgarh, UP
                        </div>
                        <p style={{ color: '#a8a29e', marginTop: '1rem', fontSize: '0.9rem' }}>
                            Near Main Temple, Civil Lines <br />
                            Uttar Pradesh, India
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
