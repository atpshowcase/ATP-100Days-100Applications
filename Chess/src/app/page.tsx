import Game from "@/components/Game";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.background}></div>

            <div className={styles.container}>
                <h1 className={styles.title}>
                    Grandmaster Chess
                </h1>
                <Game />
            </div>

            <div className={styles.glow}></div>
        </main>
    );
}
