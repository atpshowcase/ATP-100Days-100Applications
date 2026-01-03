import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Nokia Snake Game',
    description: 'Classic Nokia Snake game with modern design',
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
