'use client';

import { motion } from 'framer-motion';
import styles from './acharya.module.css';
import { MapPin, Phone, Calendar, Star, Sun, Moon, Heart } from 'lucide-react';
import Image from 'next/image';
import Gallery3D from '@/components/Gallery3D';

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
                    आचार्य पंडित राज कुमार तिवारी
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
                    <div className={styles.chaupaiContainer}>
                        <div className={styles.chaupaiWrapper}>
                            <div className={styles.hanumanImageContainer}>
                                <Image
                                    src="/toadd.png"
                                    alt="Lord Hanuman"
                                    width={120}
                                    height={120}
                                    className={styles.hanumanImage}
                                />
                            </div>
                            <div className={styles.chaupaiText}>
                                <p className={styles.chaupai}>
                                    "कवन सो काज कठिन जग माहीं।<br />
                                    जो नहिं होइ तात तुम्ह पाहीं॥"
                                </p>
                                <span className={styles.chaupaiSource}>– रामचरितमानस (किष्किंधा कांड)</span>
                            </div>
                            <div className={styles.hanumanImageContainer}>
                                <Image
                                    src="/ram.png"
                                    alt="Lord Ram"
                                    width={120}
                                    height={120}
                                    className={styles.hanumanImage}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <p>
                        प्रतापगढ़ की ऐतिहासिक भूमि में स्थित, आचार्य पंडित राज कुमार तिवारी ने अपना जीवन वैदिक परंपराओं के संरक्षण और अभ्यास के लिए समर्पित कर दिया है। ज्योतिष शास्त्र और वैदिक अनुष्ठानों (कर्मकांड) के गहरे ज्ञान के साथ, वे व्यक्तियों को आध्यात्मिक और सांसारिक समृद्धि की ओर मार्गदर्शन करते हैं।
                    </p>
                    <div className={styles.expertTags}>
                        <span>कर्मकांड</span> • <span>महायज्ञ</span> • <span>ग्रह शांति</span> • <span>वास्तु</span> • <span>तंत्र निवारण</span> • <span>विवाह संस्कार</span>
                    </div>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className={styles.section}>
                <div style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>आध्यात्मिक सेवाएँ</h2>
                </div>

                <div className={styles.grid}>
                    {[
                        { title: "कुंडली और ज्योतिष", icon: "🔮", desc: "विस्तृत जन्म चार्ट विश्लेषण, भविष्यवाणियां और ग्रह नक्षत्र शांति समाधान।" },
                        { title: "दोष निवारण पूजा", icon: "🔥", desc: "कालसर्प दोष, पितृ दोष, और मांगलिक दोष का वैदिक विधि से पूर्ण निवारण।" },
                        { title: "विशिष्ट महायज्ञ", icon: "✨", desc: "विष्णु महायज्ञ, सतचंडी और नौचंडी महायज्ञ द्वारा दैवीय कृपा प्राप्ति।" },
                        { title: "विवाह संस्कार", icon: "💍", desc: "पारंपरिक शादी विवाह, शिव विवाह, और गुण मिलान की उत्तम व्यवस्था।" },
                        { title: "वास्तु और गृह प्रवेश", icon: "🏠", desc: "नया घर, प्रॉपर्टी, और वास्तु पूजन से घर में सकारात्मक ऊर्जा का संचार।" },
                        { title: "जप और अनुष्ठान", icon: "🕉️", desc: "महामृत्युंजय, लघु मृत्युंजय जाप, और रुद्राभिषेक द्वारा स्वास्थ्य लाभ।" },
                        { title: "व्यापार और राजनीति", icon: "📈", desc: "बिजनेस में सफलता और राजनीति क्षेत्र में विजय हेतु विशेष पूजन।" },
                        { title: "बाधा निवारण", icon: "🛡️", desc: "सभी प्रकार की तंत्र क्रियाओं और जीवन की बाधाओं से सुरक्षा और शांति।" }
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

                <div className={styles.galleryWrapper}>
                    <Gallery3D />
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
                            <Phone size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} color="#7A1E1E" />
                            +91 86010 42988
                        </div>
                        <p className={styles.contactDetails}>
                            उपलब्ध: सुबह 9:00 - शाम 7:00 <br />
                            (कृपया बुकिंग के लिए व्हाट्सएप करें)
                        </p>
                    </div>

                    <div className={styles.contactCard}>
                        <div className={styles.contactLabel}>स्थान</div>
                        <div className={styles.contactValue}>
                            <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} color="#7A1E1E" />
                            प्रतापगढ़, उत्तर प्रदेश
                        </div>
                        <p className={styles.contactDetails}>
                            मुख्य मंदिर के पास, सिविल लाइन्स <br />
                            उत्तर प्रदेश, भारत
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}
