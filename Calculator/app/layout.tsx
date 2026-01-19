import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Modern Calculator | Professional Calculator App',
    description: 'A beautiful, modern calculator built with Next.js featuring a stunning UI and smooth animations.',
    keywords: ['calculator', 'modern calculator', 'web calculator', 'next.js calculator'],
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
