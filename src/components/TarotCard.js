"use client";

import styles from "./Tarot.module.css";
import { motion } from "framer-motion";

export default function TarotCard({ data, isFlipped, onClick, disabled }) {
    return (
        <div
            className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`}
            onClick={!disabled ? onClick : undefined}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardBack}></div>
                <div className={styles.cardFront}>
                    <div className={styles.cardIcon}>{data.icon}</div>
                    <h4 className={styles.cardName}>{data.number}. {data.name}</h4>
                </div>
            </div>
        </div>
    );
}
