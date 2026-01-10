import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Magic 8 Ball',
  description: 'Ask a question, seek an answer',
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
