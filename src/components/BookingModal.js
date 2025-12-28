'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, MessageCircle } from 'lucide-react';
import styles from './BookingModal.module.css';

export default function BookingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        service: 'Kundli',
        time: 'Morning'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct WhatsApp Message
        const message = `Namaste Acharya Ji 🙏, I want to book an appointment.\n\n👤 Name: ${formData.name}\n🔮 Service: ${formData.service}\n⏰ Preferred Time: ${formData.time}`;

        // Encode URL
        const whatsappUrl = `https://wa.me/918601042988?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Book Button */}
            <motion.button
                className={styles.floatingBtn}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Calendar size={20} />
                Book Appointment
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                        <motion.div
                            className={styles.modal}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                                <X size={24} />
                            </button>

                            <h2 className={styles.title}>Book Appointment</h2>

                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className={styles.input}
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Select Service</label>
                                    <select
                                        name="service"
                                        className={styles.select}
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="Kundli">Kundli Analysis (कुंडली)</option>
                                        <option value="Dosh Nivaran">Dosh Nivaran (दोष निवारण)</option>
                                        <option value="Mahayagya">Mahayagya (महायज्ञ)</option>
                                        <option value="Vivah Sanskar">Vivah Sanskar (विवाह)</option>
                                        <option value="Vastu">Vastu Consultation (वास्तु)</option>
                                        <option value="Other">Other (अन्य)</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Preferred Time</label>
                                    <select
                                        name="time"
                                        className={styles.select}
                                        value={formData.time}
                                        onChange={handleChange}
                                    >
                                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                                        <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                                    </select>
                                </div>

                                <button type="submit" className={styles.submitBtn}>
                                    <MessageCircle size={18} style={{ marginRight: '8px', verticalAlign: '-3px' }} />
                                    Book via WhatsApp
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
