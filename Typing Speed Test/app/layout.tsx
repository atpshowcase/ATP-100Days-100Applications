import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Typing Speed Test - Test Your Typing Speed',
    description: 'Measure your typing speed and accuracy with our minimalist typing speed test application.',
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
