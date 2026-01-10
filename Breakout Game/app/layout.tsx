import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEON BREAKOUT',
  description: 'Retro-futuristic breakout game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  )
}
