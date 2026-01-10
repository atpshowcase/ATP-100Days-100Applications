import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Superhero Name Generator',
  description: 'Discover your superhero identity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
