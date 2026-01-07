import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Color Matching Game',
    description: 'A minimalist color matching game built with Next.js',
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
