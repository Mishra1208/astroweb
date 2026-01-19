'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';
import { Send, CheckCircle } from 'lucide-react';

export default function Newsletter() {
    const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.target);

        // --- FREE SERVICE CONFIGURATION ---
        // We use Web3Forms for a free, no-login backend.
        // It sends the form data directly to the owner's email.
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // User needs to replace this later

        try {
            // Simulating a request for now since we don't have the key yet
            // In production: const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });

            await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
            setStatus('success');
            e.target.reset();
        } catch (error) {
            console.error("Submission Error", error);
            setStatus('error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <h3 className={styles.heading}>🔔 अपडेट्स प्राप्त करें (Subscribe)</h3>
                    <p className={styles.subtext}>
                        नई सेवाओं, दैनिक राशिफल और विशेष ज्योतिषीय उपायों की जानकारी सबसे पहले पाने के लिए हमसे जुड़ें।
                    </p>
                </div>

                {status === 'success' ? (
                    <div className={styles.successMessage}>
                        <CheckCircle size={24} color="#10b981" />
                        <span>धन्यवाद! आप सफलतापूर्वक जुड़ गए हैं।</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="आपका नाम (Name)"
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="contact"
                                placeholder="Email / WhatsApp Number"
                                required
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'जुड़ रहे हैं...' : 'सब्सक्राइब करें'}
                            {!status && <Send size={18} />}
                        </button>
                    </form>
                )}

                {status === 'error' && <p className={styles.error}>कुछ गलत हुआ। कृपया पुनः प्रयास करें।</p>}
            </div>

            {/* Disclaimer for Free Service */}
            <p className={styles.note}>
                हम स्पैम नहीं भेजते। आपकी जानकारी सुरक्षित है।
            </p>
        </div>
    );
}
