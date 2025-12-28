"use client";

import styles from "./BookingModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react"; // Using lucide icon instead of FontAwesome

export default function BookingModal({ isOpen, onClose }) {
    const [name, setName] = useState("");
    // FIXED: Initial state matches the full value of the first option
    const [service, setService] = useState("Kundli Reading");
    const [time, setTime] = useState("Morning (9 AM - 12 PM)");

    const handleBooking = () => {
        // Construct the WhatsApp message using standard Javascript strings
        // Using single * for WhatsApp bold formatting (e.g. *Text*)
        const text = `Namaste Acharya Ji,\n\nMy name is *${name}*.\nI am interested in *${service}*.\nPreferred time: *${time}*.\n\nPlease let me know the availability.`;

        // Encode the message properly for URL
        const encodedMessage = encodeURIComponent(text);

        // Open WhatsApp
        const phoneNumber = "919958363629";
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

        onClose(); // Close modal after clicking
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <DivWrapper onClick={(e) => e.stopPropagation()}>
                    <motion.div
                        className={styles.modal}
                        initial={{ scale: 0.8, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    >
                        <button className={styles.closeButton} onClick={onClose}>×</button>

                        <h2 className={styles.title}>Book Appointment</h2>
                        <p className={styles.subtitle}>Connect directly on WhatsApp</p>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Your Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Select Service</label>
                            <select
                                className={styles.select}
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            >
                                <option value="Kundli Reading">Kundli Reading (जन्म कुंडली)</option>
                                <option value="Dosh Nivaran">Dosh Nivaran (दोष निवारण)</option>
                                <option value="Mahayagya">Mahayagya (महायज्ञ)</option>
                                <option value="Vastu Consultation">Vastu (वास्तु)</option>
                                <option value="Marriage Matching">Marriage (विवाह)</option>
                                <option value="Business/Career">Business/Career (व्यापार)</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Preferred Time</label>
                            <select
                                className={styles.select}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                                <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                            </select>
                        </div>

                        <button
                            className={styles.submitButton}
                            onClick={handleBooking}
                            disabled={!name} // Disable if name is empty
                            style={{ opacity: !name ? 0.7 : 1, cursor: !name ? 'not-allowed' : 'pointer' }}
                        >
                            <MessageCircle size={20} />
                            Book on WhatsApp
                        </button>
                    </motion.div>
                </DivWrapper>
            </motion.div>
        </AnimatePresence>
    );
}

// Wrapper to avoid motion prop issues on plain divs if needed, 
// though standard motion.div is usually fine. Using a simple fragment-like structure here.
const DivWrapper = ({ children, onClick }) => (
    <div onClick={onClick} style={{ display: 'contents' }}>{children}</div>
);
