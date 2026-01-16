import { BingoBoard } from '@/components/BingoBoard';

export default function Home() {
    return (
        <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BingoBoard />

            <footer style={{ marginTop: '2rem', opacity: 0.6, fontSize: '0.875rem' }}>
                <p>ATP 100 Days - Bingo Card</p>
            </footer>
        </main>
    );
}
