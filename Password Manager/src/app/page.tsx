import PasswordManager from "@/components/PasswordManager";

export default function Home() {
  return (
    <main className="container">
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1 className="title" style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-0.05em" }}>PassVault</h1>
        <p className="subtitle" style={{ fontSize: "1.1rem" }}>Minimalist. Secure. Local.</p>
      </header>

      <PasswordManager />

      <footer style={{ marginTop: "4rem", textAlign: "center", color: "var(--muted)", fontSize: "0.875rem" }}>
        <p>© 2024 Password Manager. All data is stored locally in your browser.</p>
      </footer>
    </main>
  );
}
