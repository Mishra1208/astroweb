import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer} id="about">
            <div className={styles.content}>
                <div className={styles.brand}>ASTROWEB</div>
                <ul className={styles.links}>
                    <li><a href="#">गोपनीयता नीति</a></li>
                    <li><a href="#">सेवा की शर्तें</a></li>
                    <li><a href="#">संपर्क करें</a></li>
                </ul>
                <p className={styles.copyright}>© {new Date().getFullYear()} Astro Web. सर्वाधिकार सुरक्षित।</p>
            </div>
        </footer>
    );
}
