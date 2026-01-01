import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Rock Paper Scissors',
    description: 'A minimalist Rock Paper Scissors game built with Next.js',
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
