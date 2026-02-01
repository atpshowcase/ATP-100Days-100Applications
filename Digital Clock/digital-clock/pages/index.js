import Head from 'next/head'
import Clock from '../components/Clock'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Digital Clock</title>
        <meta name="description" content="A simple digital clock built with Next.js" />
      </Head>

      <main>
        <Clock />
      </main>
    </div>
  )
}
