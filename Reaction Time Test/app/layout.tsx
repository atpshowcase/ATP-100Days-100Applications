import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reaction Time Test',
  description: 'Test your reaction speed',
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
