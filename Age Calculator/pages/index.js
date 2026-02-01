import Head from 'next/head'
import AgeCalculator from '../components/AgeCalculator'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Age Calculator</title>
        <meta name="description" content="Simple Age Calculator built with Next.js" />
      </Head>

      <main>
        <h1>Age Calculator</h1>
        <p>Enter your birth date to calculate your age in years, months, and days.</p>
        <AgeCalculator />
      </main>

      <footer>
        <p>Built with Next.js</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        }
        main {
          width: 100%;
          max-width: 600px;
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        h1 { margin: 0 0 0.25rem 0 }
        footer { margin-top: 1rem; color: #666 }
      `}</style>
    </div>
  )
}
