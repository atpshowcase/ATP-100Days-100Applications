import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Gather Insights<br/>With Style</h1>
          <p className="hero-subtitle">
            Create stunning surveys in seconds. Analyze results in real-time.
            The most intuitive way to collect feedback.
          </p>
          <div className="flex-center gap-2">
            <Link href="/create" className="btn btn-primary">
              Create Survey
            </Link>
            <Link href="/surveys" className="btn btn-secondary">
              Browse Surveys
            </Link>
          </div>
        </div>
      </section>

      <section className="container mb-8">
        <div className="card">
          <div className="flex-between">
            <h3>Recent Activity</h3>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>View All</button>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            No surveys created yet. Start your first survey today!
          </p>
        </div>
      </section>
      
      {/* Feature Grid */}
      <section className="container mb-8">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <h4>🚀 Fast Creation</h4>
            <p style={{ color: 'var(--text-muted)' }}> intuitive builder to draft questions quickly.</p>
          </div>
          <div className="card">
            <h4>🎨 Custom Design</h4>
            <p style={{ color: 'var(--text-muted)' }}>Surveys that look great on every device.</p>
          </div>
          <div className="card">
            <h4>📊 Instant Analytics</h4>
            <p style={{ color: 'var(--text-muted)' }}>Real-time data visualization for your responses.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
