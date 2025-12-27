"use client";

import styles from "./Tarot.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TarotCard from "./TarotCard";
import { tarotDeck } from "@/data/tarot";

export default function TarotReading() {
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null); // index of selected card

    useEffect(() => {
        shuffleDeck();
    }, []);

    const shuffleDeck = () => {
        const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
        setCards(shuffled.slice(0, 3));
        setSelectedCard(null);
    };

    const handleCardClick = (index) => {
        if (selectedCard !== null) return;
        setSelectedCard(index);
    };

    return (
        <section className={styles.section} id="tarot">
            <motion.h2
                className={styles.heading}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                दैनिक टैरो कार्ड
            </motion.h2>

            <div className={styles.deck}>
                {cards.map((card, index) => (
                    <TarotCard
                        key={index}
                        data={card}
                        isFlipped={selectedCard === index}
                        onClick={() => handleCardClick(index)}
                        disabled={selectedCard !== null}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedCard !== null && (
                    <motion.div
                        className={styles.reading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <h3>{cards[selectedCard].name}</h3>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                            <em>{cards[selectedCard].meaning}</em>
                        </p>
                        <p style={{ lineHeight: '1.6', color: '#ccc', fontSize: '1.1rem' }}>
                            {cards[selectedCard].description}
                        </p>

                        <button className={styles.resetButton} onClick={shuffleDeck}>
                            दूसरा कार्ड चुनें
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
