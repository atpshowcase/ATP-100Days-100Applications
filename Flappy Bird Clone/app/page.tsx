// Minimalist Flappy Bird Clone
import Game from "@/components/Game";

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#0a0a0a'
    }}>
      <Game />
    </main>
  );
}
